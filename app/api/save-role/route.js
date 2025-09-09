import { NextResponse } from 'next/server';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { readFileSync } from 'fs';
import path from 'path';

// Avoid re-initializing Firebase Admin if already initialized
if (!getApps().length) {
  const serviceAccount = JSON.parse(
    readFileSync(path.resolve(process.cwd(), 'lib/firebaseServiceAccount.json'), 'utf-8')
 
  );

initializeApp({ credential: cert(serviceAccount) });
}
const db = getFirestore();

export async function POST(req) {
  const { id, role } = await req.json();
  if (!id || !role) return NextResponse.json({ error: 'Missing' }, { status: 400 });
  await db.collection('users').doc(id).set({ role }, { merge: true });
  return NextResponse.json({ success: true });
}