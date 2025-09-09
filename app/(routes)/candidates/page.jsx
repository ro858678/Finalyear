'use client';

import { useEffect, useState } from 'react';

export default function CandidatePage() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [field, setField] = useState('');
  const [years, setYears] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(false);

  // 🔹 Fetch candidates from DB with filter
  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (field) params.append('field', field);
      if (years) params.append('years', years);
      if (search) params.append('q', search);

      const res = await fetch(`/api/get-candidates?${params.toString()}`);
      const data = await res.json();

      if (res.ok) {
        const candidatesList = data.candidates || [];

        // 🔹 If no candidates, fallback to OpenAI recommendation
        if (!candidatesList.length) {
          fetchFallbackRecommendations();
        } else {
          setCandidates(candidatesList);
          fetchAIRecommendations(candidatesList);
        }
      } else {
        console.error(data.error);
        fetchFallbackRecommendations();
      }
    } catch (err) {
      console.error('Error fetching candidates:', err);
      fetchFallbackRecommendations();
    }
    setLoading(false);
  };

  // 🔹 AI-powered recommendations for candidate list
  const fetchAIRecommendations = async (candidatesList) => {
    if (!candidatesList.length) return;
    setLoadingRecs(true);
    try {
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'rank',
          jobDescription: 'General Job Matching',
          resumeText: JSON.stringify(candidatesList),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setRecommendations(data.reply ? JSON.parse(data.reply) : []);
      }
    } catch (err) {
      console.error('Error fetching AI recommendations:', err);
    }
    setLoadingRecs(false);
  };

  // 🔹 Fallback if filter returns no candidates
  const fetchFallbackRecommendations = async () => {
    setLoadingRecs(true);
    try {
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'recommend',
          seekerProfile: {
            name: 'Fallback Candidate',
            field,
            years,
            skills: [],
          },
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setRecommendations(data.reply ? JSON.parse(data.reply) : []);
      }
    } catch (err) {
      console.error('Error fetching fallback recommendations:', err);
    }
    setLoadingRecs(false);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchCandidates();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Find Jobseekers</h1>

      {/* Filter Form */}
      <form
        onSubmit={handleFilter}
        className="mb-10 flex flex-col md:flex-row gap-4 justify-center items-center"
      >
        <input
          type="text"
          placeholder="Keyword (e.g. developer)"
          className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Field (e.g. Engineering)"
          className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-56"
          value={field}
          onChange={(e) => setField(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Years"
          className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-32"
          value={years}
          onChange={(e) => setYears(e.target.value)}
        />
        <button
          type="submit"
          className="bg-slate-800 hover:bg-slate-600 text-white px-6 py-2 rounded-md transition"
        >
          Filter
        </button>
      </form>

{/* AI Recommendations */}
{loadingRecs ? (
  <div className="mb-10 p-6 bg-gray-50 rounded-lg shadow text-center">
    <p className="text-gray-700">  Generating recommendations…</p>
  </div>
) : recommendations.length > 0 ? (
  <div className="mb-10 p-6 bg-gray-50 rounded-lg shadow">
    <h2 className="text-2xl font-semibold mb-4">AI-Powered Recommendations</h2>
    <ul className="space-y-3">
      {recommendations.map((rec, idx) => (
        <li key={idx} className="p-4 bg-white shadow rounded-lg">
          <p className="font-bold">{rec.name}</p>
          <p className="text-sm text-gray-600">{rec.field} — {rec.years} years exp.</p>
          {rec.reason && <p className="text-xs text-gray-500 mt-2">💡 {rec.reason}</p>}
        </li>
      ))}
    </ul>
  </div>
) : candidates.length === 0 ? (
  <div className="mb-10 p-6 bg-gray-50 rounded-lg shadow text-center">
    <p className="text-gray-500">No candidates match your filters. Try adjusting your search criteria.</p>
  </div>
) : (
  <div className="mb-10 p-6 bg-gray-50 rounded-lg shadow text-center">
    <p className="text-gray-500">No recommendations available at the moment. Try adjusting your filters or check back later.</p>
  </div>
)}


      {/* Candidate List */}
      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <div className="text-center space-y-2">
            <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto" />
            <p className="text-gray-700">Loading candidates…</p>
          </div>
        </div>
      ) : candidates.length === 0 ? (
        <div className="flex justify-center items-center h-[50vh]">
          <div className="text-center space-y-2">
            <p className="text-gray-500">No candidates found.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  {candidate.avatarUrl ? (
                    <img
                      src={candidate.avatarUrl}
                      alt="Avatar"
                      className="w-14 h-14 rounded-full object-cover border"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                      ?
                    </div>
                  )}
                  <div>
                    <h2 className="text-lg font-semibold capitalize">{candidate.name || 'No Name'}</h2>
                    <p className="text-gray-600 text-sm">{candidate.field || 'N/A'}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm"
                    onClick={() => setSelected(candidate)}
                  >
                    View Details
                  </button>
                  <a
                    href={candidate.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm"
                  >
                    View CV
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Candidate */}
          {selected && (
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="flex flex-col items-center text-center">
                <img
                  src={selected.avatarUrl || '/default-avatar.png'}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full object-cover border mb-4"
                />
                <h3 className="text-xl font-semibold">{selected.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{selected.field}</p>

                <div className="text-left mt-4 w-full space-y-1">
                  <p><span className="font-semibold">Experience:</span> {selected.years} year(s)</p>
                  <p><span className="font-semibold">Availability:</span> {selected.availability || 'N/A'}</p>
                  <p><span className="font-semibold">Communication:</span> {selected.communication || 'N/A'}</p>
                  <p><span className="font-semibold">Skills:</span> {selected.skills || 'N/A'}</p>
                  <p><span className="font-semibold">Feedback:</span> {selected.feedback || 'N/A'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
