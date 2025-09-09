import { NextResponse } from 'next/server';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import serviceAccount from '@/lib/firebaseServiceAccount.json';

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
  }

  const doc = await db.collection('users').doc(id).get();
  if (!doc.exists) {
    return NextResponse.json(null);
  }

  return NextResponse.json(doc.data());
}
