import { db } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing recruiter ID' }, { status: 400 });

  const snapshot = await db
    .collection('jobs')
    .where('postedBy', '==', id)
    .orderBy('createdAt', 'desc')
    .get();

  const jobs = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return NextResponse.json(jobs);
}