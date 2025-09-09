import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from '@/lib/firebaseServiceAccount.json';

// Firebase Admin initialization
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}
const db = getFirestore();

export async function GET(req) {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession();
    const user = await getUser();
    const auth = await isAuthenticated();

    if (!auth || !user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userDoc = await db.collection('users').doc(user.id).get();
    const role = userDoc?.data()?.role;

    if (role !== 'recruiter') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Extract query params
    const { searchParams } = new URL(req.url);
    const field = searchParams.get('field');
    const minYears = parseInt(searchParams.get('years') || '0', 10);
    const keyword = searchParams.get('q')?.toLowerCase();

    // Base query: jobseekers only
    let query = db.collection('users').where('role', '==', 'jobseeker');

    if (field) {
      query = query.where('field', '==', field);
    }

    if (minYears > 0) {
      query = query.where('years', '>=', minYears);
    }

    const snapshot = await query.get();

    let candidates = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Apply keyword search (client-side filtering)
    if (keyword) {
      candidates = candidates.filter(c =>
        c.field?.toLowerCase().includes(keyword) ||
        c.cvUrl?.toLowerCase().includes(keyword)
      );
    }

    return NextResponse.json({ candidates });
  } catch (error) {
    console.error('Error fetching candidates:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
