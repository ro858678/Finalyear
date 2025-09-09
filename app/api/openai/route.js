import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/lib/firebaseAdmin"; // Firebase Admin SDK
import { v4 as uuidv4 } from "uuid"; // for generating session IDs

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    // ✅ Auth check
    const { getUser, isAuthenticated } = getKindeServerSession();
    const auth = await isAuthenticated();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await getUser();

    // ✅ Request body
    const { mode, jobDescription, resumeText, seekerProfile, sessionId } =
      await req.json();

    // 🔹 Ensure session exists (create if new)
    const sid = sessionId || uuidv4();
    const sessionRef = db
      .collection("aiChats")
      .doc(user.id)
      .collection("sessions")
      .doc(sid);

    const sessionSnap = await sessionRef.get();
    let history = sessionSnap.exists ? sessionSnap.data().messages || [] : [];

    // 🔹 Mode logic
    if (mode === "rank") {
      history.push({
        role: "system",
        content:
          "You are an AI recruiter assistant. Rank candidates based on how well their resume matches the job description. Respond with a score (0–100) and a short explanation.",
      });
      history.push({
        role: "user",
        content: `Job Description: ${jobDescription}\n\nCandidate Resume: ${resumeText}`,
      });
    } else if (mode === "recommend") {
      // 🔹 Fetch all jobs from DB
      const companiesSnapshot = await db.collection("users").get();
      const jobs = await Promise.all(
        companiesSnapshot.docs.map(async (doc) => {
          const userId = doc.id;
          const jobsSnap = await db
            .collection("jobs")
            .where("postedBy", "==", userId)
            .orderBy("createdAt", "desc")
            .get();
          return jobsSnap.docs.map((jobDoc) => ({
            id: jobDoc.id,
            ...jobDoc.data(),
            companyName: doc.data().companyName || "Unknown",
          }));
        })
      );
      // Flatten jobs array
      const jobList = jobs.flat();

      history.push({
        role: "system",
        content:
          "You are an AI career coach. Recommend the best jobs for this candidate based on their profile, experience, and skills. Suggest top 3 matches with reasons.",
      });
      history.push({
        role: "user",
        content: `Candidate Profile: ${seekerProfile}\n\nAvailable Jobs: ${JSON.stringify(
          jobList
        )}`,
      });
    } else {
      return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
    }

    // 🔹 Trim history (to save tokens)
    if (history.length > 25) {
      history = history.slice(-25);
    }

    // ✅ Call OpenAI
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: history,
    });

    const reply = completion.choices[0].message.content || "";

    // 🔹 Save assistant reply
    history.push({ role: "assistant", content: reply });
    await sessionRef.set({
      messages: history,
      updatedAt: new Date().toISOString(),
      mode,
    });

    // ✅ Return
    return NextResponse.json({ reply, messages: history, sessionId: sid });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
