'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function EditJobPage({ params }) {
  const [form, setForm] = useState({ jobTitle: '', location: '', description: '' });
  const router = useRouter();

  useEffect(() => {
    const fetchJob = async () => {
      const res = await fetch(`/api/jobs/${params.id}`);
      const data = await res.json();
      if (res.ok) {
        setForm({ jobTitle: data.jobTitle, location: data.location, description: data.description });
      }
    };
    fetchJob();
  }, [params.id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/edit-job', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: params.id, ...form }),
    });
    if (res.ok) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="jobTitle"
          value={form.jobTitle}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Job Title"
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Location"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Description"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
}