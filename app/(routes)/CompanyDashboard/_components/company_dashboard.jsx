'use client';

import { useEffect, useState } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useRouter } from 'next/navigation';
import { Briefcase } from 'lucide-react'; 
export default function CompanyDashboard() {
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch(`/api/jobs-by-user?id=${user.id}`);
        const data = await res.json();

        if (res.ok) {
          setJobs(data);
        } else {
          console.error('Failed to fetch jobs:', data);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchJobs();
    }
  }, [user]);

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this job?');
    if (!confirmDelete) return;

    const res = await fetch(`/api/delete-job?id=${jobId}`, { method: 'DELETE' });

    if (res.ok) {
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
    } else {
      console.error('Failed to delete job');
    }
  };

  if (!user) {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <div className="text-center space-y-2">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
        <p className="text-gray-700">Loading user details…</p>
      </div>
    </div>
  );
}

if (loading) {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <div className="text-center space-y-2">
        <div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto" />
        <p className="text-gray-700">Loading job listings…</p>
      </div>
    </div>
  );
}

  
console.log("Kinde user:", user);


  return (
      <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Job Posts</h1>
        <button
          className="bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition"
          onClick={() => router.push('/post-job')}
        >
          Post New Job
        </button>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center text-gray-600 mt-20">
          <Briefcase className="mx-auto mb-4 w-10 h-10 text-gray-400" />
          <p className="text-lg">You haven't posted any jobs yet.</p>
          <p className="text-sm text-gray-500 mt-1">
            Start by clicking the "Post New Job" button above.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="border border-gray-200 bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {job.jobTitle}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{job.location}</p>
                </div>
                <div className="flex gap-3 mt-1">
                  <button
                    className="text-blue-600 hover:underline text-sm"
                    onClick={() => router.push(`/jobs/${job.id}`)}
                  >
                    View
                  </button>
                  <button
                    className="text-yellow-600 hover:underline text-sm"
                    onClick={() => router.push(`/edit-job/${job.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline text-sm"
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}