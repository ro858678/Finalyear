import { db } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { id, companyName, website, location } = await req.json();

    if (!id || !companyName || !location) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await db.collection('users').doc(id).set(
      {
        companyName,
        website,
        location,
        updatedAt: Date.now(),
      },
      { merge: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating company profile:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
