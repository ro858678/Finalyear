'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function JobPostForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    companyName: '',
    website: '',
    location: '',
    jobTitle: '',
    jobDescription: '',
    requirements: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/company', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      router.push('/CompanyDashboard');
    } else {
      alert('Failed to post job');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        className="w-full p-2 border rounded"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="website"
        placeholder="Website"
        className="w-full p-2 border rounded"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        className="w-full p-2 border rounded"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="jobTitle"
        placeholder="Job Title"
        className="w-full p-2 border rounded"
        onChange={handleChange}
        required
      />
      <textarea
        name="jobDescription"
        placeholder="Job Description"
        className="w-full p-2 border rounded"
        rows="4"
        onChange={handleChange}
        required
      />
      <textarea
        name="requirements"
        placeholder="Requirements"
        className="w-full p-2 border rounded"
        rows="3"
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Posting...' : 'Post Job'}
      </button>
    </form>
  );
}
