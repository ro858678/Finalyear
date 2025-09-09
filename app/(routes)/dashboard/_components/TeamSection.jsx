export default function TeamSection() {
  const team = [
    { title: 'AI-HirePro Team', role: 'AI Specialist' },
    { title: 'AI Expert', role: 'AI Consultant' },
    { title: 'AI Recruiter', role: 'AI Talent' },
    { title: 'AI Developer', role: 'AI Programmer' },
  ]

  return (
    <div className="bg-gray-200 shadow  p-4 mr-12 ">
      <h2 className="font-semibold mb-4">AI-HirePro Team</h2>
      <div className="grid grid-cols-2 gap-4">
        {team.map((member, idx) => (
          <div key={idx} className="bg-white rounded p-4 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-gray-300 mb-2" />
            <strong>{member.title}</strong>
            <p className="text-sm text-gray-500">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
