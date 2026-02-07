import CompanyCarousel from "@/components/CompanyCarousel"
import HeroSearch from "@/components/HeroSearch"
import { HighlightJobs } from "@/components/HightlightJobs"
import { SpotlightJobs } from "@/components/SpotlightJobs"

const HomePage = () => {
  return (
    <div>
        <HeroSearch/>

        <CompanyCarousel/>

        <div>
          <h1 className="text-center">Featured Jobs Offer</h1>
          <SpotlightJobs/>
          <HighlightJobs/>
        </div>
    </div>
  )
}

export default HomePage