'use client';

import { useEffect, useState } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useRouter } from 'next/navigation';

export default function CompanyProfile() {
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  const [profile, setProfile] = useState({
    companyName: '',
    website: '',
    location: '',
  });

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch(`/api/get-company-profile?id=${user?.id}`);
      const data = await res.json();
      if (res.ok) setProfile(data);
      setLoading(false);
    };

    if (user?.id) fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const res = await fetch('/api/update-company-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: user?.id, ...profile }),
    });

    if (res.ok) {
      setEditing(false);
    } else {
      alert('Update failed.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Company Profile</h1>

      {editing ? (
        <div className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Company Name</label>
            <input
              name="companyName"
              value={profile.companyName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="e.g., Acme Corp"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Website</label>
            <input
              name="website"
              value={profile.website}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Location</label>
            <input
              name="location"
              value={profile.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="e.g., New York"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 text-gray-700">
          <div>
            <p className="font-semibold">Company Name:</p>
            <p>{profile.companyName}</p>
          </div>

          <div>
            <p className="font-semibold">Website:</p>
            <p>
              <a href={profile.website} className="text-blue-600 hover:underline" target="_blank">
                {profile.website}
              </a>
            </p>
          </div>

          <div>
            <p className="font-semibold">Location:</p>
            <p>{profile.location}</p>
          </div>

          <div className="text-right">
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded"
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
