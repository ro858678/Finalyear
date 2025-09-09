// app/app-redirect/page.tsx
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/firebaseAdmin'; // using firebase-admin

export default async function AppRedirectPage() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isAuth = await isAuthenticated();
  const user = await getUser();

  if (!isAuth || !user || !user.id) {
    return redirect('/api/auth/login');
  }

  const userId = user.id;

  // Get user role from `users/{userId}`
  const userDoc = await db.collection('users').doc(userId).get();
  const userData = userDoc.data();

  if (!userData || !userData.role) {
    return redirect('/role-selection');
  }

  // Redirect based on role and profile completion
  if (userData.role === 'recruiter') {
    const companyDoc = await db.collection('companies').doc(userId).get();
    return redirect(companyDoc.exists ? '/companydashboard' : '/company');
  }

  if (userData.role === 'jobseeker') {
    const profileDoc = await db.collection('jobseekers').doc(userId).get();
    return redirect(profileDoc.exists ? '/dashboard' : '/profilesetup');
  }

  // Fallback if something's wrong
  return redirect('/unauthorized');
}
