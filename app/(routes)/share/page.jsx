'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
 // Your firebase client config
import { doc, getDoc } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import { db } from '@/lib/firebaseClient';

import { useRouter } from 'next/navigation';

export default function ShareJobPage() {
   const router = useRouter();
     const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Get job ID from URL
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobRef = doc(db, 'jobs', id);
        const docSnap = await getDoc(jobRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setJob({
            id: docSnap.id,
            title: data.title,
            description: data.description,
            companyName: data.companyName,
            location: data.location,
            type: data.type,
            createdAt: data.createdAt.toDate(),
          });
        } else {
          setJob(null);
        }
      } catch (error) {
        console.error('Error fetching job:', error);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        <p>Loading job...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-gray-600">
        <h1 className="text-2xl font-bold">Job Not Found</h1>
        <p className="mt-2">This job may have been removed or the link is incorrect.</p>
        <button
          onClick={() => router.push('/dashboard')}
          className="mt-4 text-blue-600 underline"
        >
          Go back home
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-50 px-4 py-10">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl p-8 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
          <p className="text-sm text-gray-500">
            Posted {formatDistanceToNow(job.createdAt)} ago
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-gray-700">
            <strong>Company:</strong> {job.companyName}
          </p>
          <p className="text-gray-700">
            <strong>Location:</strong> {job.location}
          </p>
          <p className="text-gray-700">
            <strong>Type:</strong> {job.type}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Apply Now
          </button>

          <div className="flex items-center gap-3 text-gray-500 text-sm">
            <span>🔗 Share this job:</span>
            <button
              className="underline hover:text-blue-600"
              onClick={() => navigator.clipboard.writeText(window.location.href)}
            >
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
