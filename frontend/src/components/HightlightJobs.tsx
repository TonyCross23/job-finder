import { JobCard } from "./JobCard"

const highlightJobs = [
    { id: 1, title: "Senior React Developer", company: "TechNova", location: "Remote", type: "Full Time", logo: "hello" },
    { id: 2, title: "UI/UX Designer", company: "Designify", location: "New York, USA", type: "Contract", logo: "hello" },
    { id: 3, title: "Backend Engineer", company: "CloudCore", location: "Berlin, Germany", type: "Full Time", logo: "hello" },
]

export function HighlightJobs() {
    // Grid layout with responsive columns
    return (
        <section className="max-w-6xl mx-auto p-6 space-y-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Highlight Jobs</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {highlightJobs.map(job => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </section>
    )
}