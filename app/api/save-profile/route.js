import { NextResponse } from 'next/server';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, cert } from 'firebase-admin/app';
import serviceAccount from '@/lib/firebaseServiceAccount.json';
// Initialize Firebase Admin only once
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

export async function POST(req) {
  try {
    const { id, cvUrl, avatarUrl, years, field,workerType } = await req.json();

    if (!id || !cvUrl || !avatarUrl || !years || !field || !workerType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await db.collection('users').doc(id).set(
      {
        role: 'jobseeker', // ✅ Set role explicitly
        cvUrl,
        avatarUrl,
        years,
        field,
        phone,
        workerType,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}