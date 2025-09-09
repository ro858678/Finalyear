'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CompanyForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
    location: '',
    jobTitle: '',
    jobDescription: '',
    requirements: '',
    workerType: '',
    logo: null,
  });

  const [logoPreview, setLogoPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, logo: file });
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    const res = await fetch('/api/company', {
      method: 'POST',
      body: data,
    });

    if (res.ok) {
      alert('Company Registered!');
      setFormData({
        companyName: '',
        website: '',
        location: '',
        jobTitle: '',
        jobDescription: '',
        requirements: '',
        workerType: '',
        logo: null,
      });
      setLogoPreview(null);
      router.push('/CompanyDashboard');
    } else {
      alert('Failed to register.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto" encType="multipart/form-data">
      <input
        name="companyName"
        placeholder="Company Name"
        value={formData.companyName}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="website"
        placeholder="Company Website"
        value={formData.website}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="jobTitle"
        placeholder="Job Title"
        value={formData.jobTitle}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        name="jobDescription"
        placeholder="Job Description"
        value={formData.jobDescription}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        rows={4}
        required
      />
      <textarea
        name="requirements"
        placeholder="Requirements"
        value={formData.requirements}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        rows={3}
      />
      <select
        name="workerType"
        value={formData.workerType}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">Select Worker Type</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Intern">Intern</option>
        <option value="Remote">Remote</option>
      </select>

      <label className="block mb-2 text-sm font-medium text-gray-700">
  Upload your company logo (PNG, JPG, or JPEG)
</label>
<input
  type="file"
  accept="image/*"
  onChange={handleFileChange}
  className="mb-4"
/>
{logoPreview && (
  <img
    src={logoPreview}
    alt="Logo Preview"
    className="w-32 h-32 object-contain border rounded"
  />
)}
      <div className="flex justify-end">
  <button
    type="submit"
    className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-700"
  >
    Submit
  </button>
</div>
    </form>
  );
}
