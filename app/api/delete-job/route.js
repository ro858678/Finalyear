import { db } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'Missing job ID' }, { status: 400 });

  await db.collection('jobs').doc(id).delete();

  return NextResponse.json({ success: true });
}
