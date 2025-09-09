import { db } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const { id, jobTitle, location, description } = body;

  if (!id || !jobTitle || !location || !description) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  await db.collection('jobs').doc(id).update({
    jobTitle,
    location,
    description,
    updatedAt: Date.now(),
  });

  return NextResponse.json({ success: true });
}
