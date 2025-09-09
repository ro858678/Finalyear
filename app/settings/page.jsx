'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

export default function SettingsPage() {
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-slate-100 to-purple-100 flex justify-center items-start px-4 py-10">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-slate-800 text-center mb-8">
          Settings
        </h1>

        <div className="space-y-8">
          {/* Account Section */}
          <section>
            <h2 className="text-xl font-semibold text-slate-700 mb-4">Account</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={
                    user?.picture ||
                    `https://ui-avatars.com/api/?name=${
                      user?.given_name || 'U'
                    }&background=7e22ce&color=fff&size=128`
                  }
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">
                    {user?.given_name} {user?.family_name}
                  </p>
                  <p className="text-sm text-slate-500">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={() => router.push('/edit-profile')}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Edit Profile
              </button>
            </div>
          </section>

          <hr />

          {/* Preferences Section */}
          <section>
            <h2 className="text-xl font-semibold text-slate-700 mb-4">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-700">Dark Mode</span>
                <input type="checkbox" className="w-5 h-5 accent-purple-600 cursor-pointer" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-700">Email Notifications</span>
                <input type="checkbox" className="w-5 h-5 accent-purple-600 cursor-pointer" />
              </div>
              <div>
                <label className="block text-slate-700 mb-1">Language</label>
                <select className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500">
                  <option>English</option>
                  <option>French</option>
                  <option>Spanish</option>
                </select>
              </div>
            </div>
          </section>

          <hr />

          {/* Security Section */}
          <section>
            <h2 className="text-xl font-semibold text-slate-700 mb-4">Security</h2>
            <div className="space-y-4">
              <button className="w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-700 transition">
                Change Password
              </button>
              <button className="w-full bg-rose-600 text-white py-2 rounded-lg hover:bg-rose-700 transition">
                Logout
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full bg-red-700 text-white py-2 rounded-lg hover:bg-red-800 transition"
              >
                Delete Account
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Confirm Delete
            </h2>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete your account? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg border hover:bg-slate-100"
              >
                Cancel
              </button>
              <button className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
