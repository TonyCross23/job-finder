import { useTheme } from "next-themes"
import { JobCard } from "./JobCard"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const spotlightJobs = [
  { id: 101, title: "Lead Frontend Engineer", company: "Spotlight Inc", location: "Remote", type: "Full Time", logo: "https://via.placeholder.com/40" },
  { id: 102, title: "Product Designer", company: "Bright Labs", location: "Singapore", type: "Contract", logo: "https://via.placeholder.com/40" },
  { id: 103, title: "Senior Backend Engineer", company: "CloudCore", location: "Berlin, Germany", type: "Full Time", logo: "https://via.placeholder.com/40" },
  { id: 104, title: "Lead Frontend Engineer", company: "Spotlight Inc", location: "Remote", type: "Full Time", logo: "https://via.placeholder.com/40" },
  { id: 105, title: "Product Designer", company: "Bright Labs", location: "Singapore", type: "Contract", logo: "https://via.placeholder.com/40" },
  { id: 106, title: "Senior Backend Engineer", company: "CloudCore", location: "Berlin, Germany", type: "Full Time", logo: "https://via.placeholder.com/40" },
]

export function SpotlightJobs() {
  const { theme } = useTheme()

  const scrollLeft = () => {
    document.querySelector<HTMLDivElement>(".job-carousel")?.scrollBy({ left: -320, behavior: "smooth" })
  }

  const scrollRight = () => {
    document.querySelector<HTMLDivElement>(".job-carousel")?.scrollBy({ left: 320, behavior: "smooth" })
  }

  return (
    <section className="max-w-6xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Spotlight Jobs</h2>

      <div className="flex items-center gap-2">
        {/* Left Arrow */}
        <Button
          variant="outline"
          className={`p-2 flex-shrink-0 ${
            theme === "dark" ? "bg-white text-black" : "bg-black text-white"
          }`}
          onClick={scrollLeft}
        >
          <ChevronLeft size={24} />
        </Button>

        {/* Carousel */}
        <div className="job-carousel flex overflow-x-hidden gap-4 snap-x snap-mandatory flex-1">
          {spotlightJobs.map((job, index) => (
            <div key={index} className="min-w-[calc((100%/3)-1rem)] flex-shrink-0 snap-start">
              <JobCard job={job} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <Button
          variant="outline"
          className={`p-2 flex-shrink-0 ${
            theme === "dark" ? "bg-white text-black" : "bg-black text-white"
          }`}
          onClick={scrollRight}
        >
          <ChevronRight size={24} />
        </Button>
      </div>
    </section>
  )
}
