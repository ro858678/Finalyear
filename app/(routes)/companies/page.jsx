'use client';

import { useEffect, useState } from 'react';

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(false);

  // 1. Fetch all companies & jobs
  useEffect(() => {
    async function fetchCompanies() {
      try {
        const res = await fetch('/api/companies-with-jobs');
        const data = await res.json();
        setCompanies(data);

        // Once companies are fetched, ask AI for recommendations
        if (data.length > 0) {
          fetchRecommendations(data);
        }
      } catch (error) {
        console.error('Failed to fetch companies:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCompanies();
  }, []);

  // 2. Call AI API for recommendations
  async function fetchRecommendations(companiesData) {
    setLoadingRecs(true);
    try {
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'recommend',
          companies: companiesData,
          // optionally add seeker profile here if available
          // seekerProfile: { skills, yearsExp, field }
        }),
      });
      const data = await res.json();
      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
    } finally {
      setLoadingRecs(false);
    }
  }

  if (loading) {
    return (
      <main className="flex items-center justify-center h-[60vh]">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900 mx-auto" />
          <p className="text-gray-700 text-lg">Fetching the latest company listings…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Companies & Their Job Openings</h1>

     {/* === Personalized Recommendations Section === */}
{loadingRecs ? (
  <div className="mb-10 p-6 bg-gray-50 rounded-lg shadow text-center">
    <p className="text-gray-700">🔎 Finding the best jobs for you...</p>
  </div>
) : recommendations.length > 0 ? (
  <div className="mb-10 p-6 bg-gray-50 rounded-lg shadow">
    <h2 className="text-2xl font-semibold mb-4">Recommended Jobs for You</h2>
    <ul className="space-y-3">
      {recommendations.map((job, idx) => (
        <li key={idx} className="p-4 bg-white shadow rounded-lg">
          <p className="font-bold">{job.jobTitle}</p>
          <p className="text-sm text-gray-600">
            {job.companyName} — {job.location}
          </p>
          {job.reason && (
            <p className="text-xs text-gray-500 mt-2">💡 {job.reason}</p>
          )}
        </li>
      ))}
    </ul>
  </div>
) : (
  <div className="mb-10 p-6 bg-gray-50 rounded-lg shadow text-center">
    <p className="text-gray-700 mb-3">⚠️ No recommendations available right now.</p>
    <button
      onClick={fetchRecommendations}
      disabled={loadingRecs}
      className={`px-4 py-2 rounded-lg shadow text-white flex items-center justify-center gap-2
        ${loadingRecs ? "bg-slate-400 cursor-not-allowed" : "bg-slate-900 hover:bg-slate-700"}`}
    >
      {loadingRecs ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span>Trying again...</span>
        </>
      ) : (
        <>🔄 Try Again</>
      )}
    </button>
  </div>
)}


      {/* === Company Listings Section === */}
      {companies.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg">🚧 No companies have been registered yet.</p>
          <p className="text-sm mt-2">
            Please check back later as companies begin to post new job opportunities.
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {companies.map((company) => (
            <div key={company.id} className="bg-white shadow p-6 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                {company.logo && (
                  <img
                    src={company.logo}
                    alt={company.companyName}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                )}
                <div>
                  <h2 className="text-xl font-semibold">{company.companyName}</h2>
                  {company.website && (
                    <a
                      href={company.website}
                      className="text-blue-600 text-sm"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {company.website}
                    </a>
                  )}
                </div>
              </div>

              {company.jobs.length > 0 ? (
                <ul className="list-disc ml-6 space-y-2">
                  {company.jobs.map((job) => (
                    <li key={job.id}>
                      <strong>{job.jobTitle}</strong> — {job.location}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No jobs posted yet.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
