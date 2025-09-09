import JobPostForm from "../_components/JobPostForm";


export default function PostJobPage() {
  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>
      <JobPostForm/>
    </main>
  );
}
