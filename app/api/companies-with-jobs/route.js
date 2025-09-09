import { db } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const companiesSnapshot = await db.collection('users').get();

    const companiesWithJobs = await Promise.all(
      companiesSnapshot.docs.map(async (doc) => {
        const companyData = doc.data();
        const userId = doc.id;

        const jobsSnapshot = await db
          .collection('jobs')
          .where('postedBy', '==', userId)
          .orderBy('createdAt', 'desc')
          .get();

        const jobs = jobsSnapshot.docs.map((jobDoc) => ({
          id: jobDoc.id,
          ...jobDoc.data(),
        }));

        return {
          ...companyData,
          id: userId,
          jobs,
        };
      })
    );

    return NextResponse.json(companiesWithJobs);
  } catch (error) {
    console.error('Error fetching companies and jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
