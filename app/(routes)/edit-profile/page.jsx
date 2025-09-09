'use client';

import { useEffect, useState } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useRouter } from 'next/navigation';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '@/config/FirebaseConfig';

export default function EditProfilePage() {
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  const [profile, setProfile] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [cv, setCV] = useState(null);
  const [field, setField] = useState('');
  const [years, setYears] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const res = await fetch(`/api/get-profile?id=${user.id}`);
      const data = await res.json();
      setProfile(data);
      setField(data?.field || '');
      setYears(data?.years || '');
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const handleSubmit = async () => {
    if (!user || !field || !years) return alert('Fill all fields');

    const storage = getStorage(app);
    let avatarUrl = profile?.avatarUrl;
    let cvUrl = profile?.cvUrl;

    if (avatar) {
      const avatarRef = ref(storage, `avatars/${user.id}/${avatar.name}`);
      await uploadBytes(avatarRef, avatar);
      avatarUrl = await getDownloadURL(avatarRef);
    }

    if (cv) {
      const cvRef = ref(storage, `cvs/${user.id}/${cv.name}`);
      await uploadBytes(cvRef, cv);
      cvUrl = await getDownloadURL(cvRef);
    }

    await fetch('/api/save-profile', {
      method: 'POST',
      body: JSON.stringify({
        id: user.id,
        avatarUrl,
        cvUrl,
        field,
        years,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    router.push('/profile');
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  const fullName = profile?.fullName || (user?.given_name + ' ' + user?.family_name) || 'User';
  const initial = fullName.charAt(0).toUpperCase();
  const hasAvatar = !!profile?.avatarUrl;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-lg overflow-hidden">
      
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-slate-400 to-blue-500"></div>
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          {hasAvatar || avatar ? (
            <img
              src={avatar ? URL.createObjectURL(avatar) : profile.avatarUrl}
              alt="Avatar"
              className="w-40 h-40 rounded-full object-cover shadow-lg ring-4 ring-white"
            />
          ) : (
            <div className="w-40 h-40 flex items-center justify-center rounded-full bg-gradient-to-r from-slate-300 to-blue-600 text-white text-5xl font-bold shadow-lg ring-4 ring-white">
              {initial}
            </div>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="mt-20 p-10">
        <h1 className="text-3xl font-bold text-center mb-8">Edit Profile</h1>

        <div className="space-y-6">
          {/* Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Field</label>
            <input
              type="text"
              value={field}
              onChange={(e) => setField(e.target.value)}
              className="w-full mt-1 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-slate-500"
            />
          </div>

          {/* Years */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full mt-1 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-slate-500"
            />
          </div>

          {/* Avatar Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Update Avatar</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files?.[0] || null)}
              className="mt-2 block w-full text-sm text-gray-600"
            />
          </div>

          {/* CV Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Update CV</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setCV(e.target.files?.[0] || null)}
              className="mt-2 block w-full text-sm text-gray-600"
            />
          </div>

          {/* Save */}
          <button
            onClick={handleSubmit}
            className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Save Changes
          </button>

          {/* Save + Cancel */}
       <div className="flex gap-4 mt-6">
        <button
          onClick={handleSubmit}
        className="flex-1 bg-blue-500 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition"
     >
      Save Changes
     </button>

    <button
      onClick={() => router.push('/profile')}
      className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg shadow hover:bg-gray-300 transition"
   >
      Cancel
    </button>
   </div>

        </div>
      </div>
    </div>
  );
}
