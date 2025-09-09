import CompanyForm from './_components/CompanyForm';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/firebaseAdmin';

export default async function RegisterCompanyPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    redirect('/api/auth/login');
  }

  const userDocRef = db.collection('users').doc(user.id);
  const userDoc = await userDocRef.get();

  if (!userDoc.exists) {
    redirect('/RoleSelection');
  }

  const data = userDoc.data();

if (!data || !data.role) {
  redirect('/RoleSelection');
}

if (data.role !== 'recruiter') {
  redirect('/dashboard'); // ✅ Only redirect if not allowed
}

console.log('User role:', data.role);
console.log('Current path: /company');
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/eric-prouzet-B3UFXwcVbc4-unsplash.jpg')" }} // Replace with your image path
      />

      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10" />

      {/* Content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center px-4 py-10">
        <main className="max-w-2xl w-full">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">
            Register Your Company
          </h1>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6">
            <CompanyForm />
          </div>
        </main>
      </div>
    </div>

  );
}
