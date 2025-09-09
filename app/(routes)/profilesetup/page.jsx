'use client';

import { useState } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useRouter } from 'next/navigation';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '@/config/FirebaseConfig';

export default function ProfileSetup() {
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  const [cv, setCV] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [years, setYears] = useState('');
  const [field, setField] = useState('');
  const [phone, setPhone] = useState('');
  const [workerType ,setWorkerType] = useState('');

  const uploadProfile = async () => {
    if (!cv || !avatar || !years || !field || !phone || workerType) return;

    const storage = getStorage(app);

    const isValidYears = Number(years) > 0;
    if (!isValidYears) {
      alert('Years of experience must be a positive number.');
      return;
    }

    const phoneRegex = /^[0-9]{7,15}$/; // basic validation for 7–15 digit numbers
    if (!phoneRegex.test(phone)) {
      alert('Please enter a valid phone number (digits only, 7–15 characters).');
      return;
    }

    if (cv.size > 5 * 1024 * 1024) {
      alert('CV too large. Max size is 5MB.');
      return;
    }
    if (avatar.size > 2 * 1024 * 1024) {
      alert('Avatar too large. Max size is 2MB.');
      return;
    }

    // Upload CV
    const cvRef = ref(storage, `cvs/${user?.id}/${cv.name}`);
    await uploadBytes(cvRef, cv);
    const cvUrl = await getDownloadURL(cvRef);

    // Upload Avatar
    const avatarRef = ref(storage, `avatars/${user?.id}/${avatar.name}`);
    await uploadBytes(avatarRef, avatar);
    const avatarUrl = await getDownloadURL(avatarRef);

    // Save data to Firestore
    await fetch('/api/save-profile', {
      method: 'POST',
      body: JSON.stringify({
        id: user?.id,
        cvUrl,
        avatarUrl,
        years,
        field,
        phone,
         workerType// send phone number too
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    router.push('/dashboard');
  };

  const isFormValid = cv && avatar && years && field && phone;
  
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/profile.jpg')" }}
      >
        <div className="w-full h-full backdrop-blur-md bg-black/30"></div>
      </div>

      {/* Foreground Form */}
      <div className="relative z-10 w-full max-w-3xl mx-auto mt-20 bg-white shadow-lg rounded-2xl p-10 space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">Profile Setup</h1>

        <div className="space-y-6">
          {/* Upload CV */}
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Upload CV</span>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setCV(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </label>

          {/* Upload Avatar */}
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Upload Profile Picture</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-purple-50 file:text-purple-700
                hover:file:bg-purple-100"
            />
          </label>

          {/* Years of Experience */}
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</span>
            <input
              type="number"
              placeholder="e.g. 3"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          {/* Field */}
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Field</span>
            <input
              type="text"
              placeholder="e.g. Software Engineering"
              value={field}
              onChange={(e) => setField(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          {/* Phone Number */}
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Phone Number</span>
            <input
              type="tel"
              placeholder="e.g. 0244123456"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>

        <select
          name="workerType"
           value={workerType}
            onChange={(e) => setWorkerType(e.target.value)}
            className="w-full border p-2 rounded"
             required
         >
           <option value="">Select worker type</option>
           <option value="fulltime">Full Time</option>
          <option value="parttime">Part Time</option>
          <option value="Intern">Intern</option>
          <option value= "Remote">Remote</option>
        </select>

        </div>

        {/* Submit Button */}
        <button
          onClick={uploadProfile}
          disabled={!isFormValid}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            isFormValid
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
