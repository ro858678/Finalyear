'use client';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RoleSelection() {
  const { user } = useKindeBrowserClient();
  const [role, setRole] = useState('');
  const router = useRouter();

const saveRole = async () => {
  if (!role) {
    alert('Please select a role first');
    return;
  }

  await fetch('/api/save-role', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: user?.id, role }),
  });

  if (role === 'recruiter') {
    router.push('/company');
  } else if (role === 'jobseeker') {
    router.push('/profilesetup');
  }
};

  return (
   <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center z-0"
    style={{ backgroundImage: "url('/role.jpg')" }}
  >
    <div className="w-full h-full backdrop-blur-sm bg-black/20"></div> {/* Optional dark overlay with blur */}
  </div>

  {/* Foreground Card */}
  <div className="relative z-10 max-w-md w-full mx-auto bg-white bg-opacity-90 p-8 rounded-2xl shadow-md space-y-6 text-center">
    <h1 className="text-4xl font-bold text-gray-800">AI HirePro</h1>
    <h1 className="text-3xl font-bold text-gray-800">Select Your Role</h1>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        onClick={() => setRole('jobseeker')}
        className={`px-6 py-3 rounded-lg text-black font-medium transition ${
          role === 'jobseeker' ? 'bg-blue-400' : 'bg-slate-100 hover:bg-slate-200'
        }`}
      >
        Job Seeker
      </button>
      <button
        onClick={() => setRole('recruiter')}
        className={`px-6 py-3 rounded-lg text-white font-medium transition ${
          role === 'recruiter'
            ? 'bg-amber-700'
            : 'bg-slate-900 hover:bg-slate-700 hover:text-slate-100'
        }`}
      >
        Recruiter
      </button>
    </div>

    <button
      onClick={saveRole}
      disabled={!role}
      className={`w-full py-3 rounded-lg font-semibold transition ${
        role
          ? 'bg-slate-600 text-white hover:bg-slate-500'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      }`}
    >
      Continue
    </button>
  </div>
</div>

  );
}