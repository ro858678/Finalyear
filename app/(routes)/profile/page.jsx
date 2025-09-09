'use client';

import { useEffect, useState } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const res = await fetch(`/api/get-profile?id=${user.id}`);
      const data = await res.json();
      setProfile(data);
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return <div className="text-center mt-20 text-gray-600">Loading profile...</div>;
  }

  if (!profile) {
    return (
      <div className="text-center mt-20">
        <p className="text-gray-700 text-lg">No profile found.</p>
        <button
          onClick={() => router.push('/setup')}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Complete Profile
        </button>
      </div>
    );
  }

  // Get fallback initial if avatar not set
  const fullName = profile.fullName || (user?.given_name + ' ' + user?.family_name) || 'User';
  const initial = fullName.charAt(0).toUpperCase();
  const hasAvatar = !!profile.avatarUrl;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Cover Banner */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-purple-500 to-blue-500"></div>
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          {hasAvatar ? (
            <img
              src={profile.avatarUrl}
              alt="Avatar"
              className="w-40 h-40 rounded-full object-cover shadow-lg ring-4 ring-white"
            />
          ) : (
            <div className="w-40 h-40 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-5xl font-bold shadow-lg ring-4 ring-white">
              {initial}
            </div>
          )}
        </div>
      </div>

      {/* Profile Content */}
      <div className="mt-20 p-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800">{fullName}</h1>
        <p className="text-gray-500">{profile.field}</p>
        <p className="text-gray-600 mt-2">Experience: {profile.years} years</p>

        {/* CV Link */}
        <div className="mt-4">
          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-600 hover:underline"
          >
            View CV
          </a>
        </div>

        {/* Edit Button */}
        <div className="mt-6">
          <button
            onClick={() => router.push('/edit-profile')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
