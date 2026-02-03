import { Card } from "@/components/ui/card"

const companies = [
    { name: "Google", logo: "/logos/google.png", bg: "bg-blue-50" },
    { name: "Apple", logo: "/logos/apple.png", bg: "bg-gray-100" },
    { name: "Microsoft", logo: "/logos/microsoft.png", bg: "bg-green-50" },
    { name: "Facebook", logo: "/logos/facebook.png", bg: "bg-blue-100" },
    { name: "Amazon", logo: "/logos/amazon.png", bg: "bg-yellow-50" },
    { name: "Netflix", logo: "/logos/netflix.png", bg: "bg-red-50" },
    { name: "Google", logo: "/logos/google.png", bg: "bg-blue-50" },
    { name: "Apple", logo: "/logos/apple.png", bg: "bg-gray-100" },
    { name: "Microsoft", logo: "/logos/microsoft.png", bg: "bg-green-50" },
    { name: "Facebook", logo: "/logos/facebook.png", bg: "bg-blue-100" },
    { name: "Amazon", logo: "/logos/amazon.png", bg: "bg-yellow-50" },
    { name: "Netflix", logo: "/logos/netflix.png", bg: "bg-red-50" },
]

export default function CompanyCarousel() {
    return (
        <section className="w-full py-8">
            <h2 className="text-2xl font-bold my-7 text-center text-gray-900 dark:text-gray-100">
                Top Companies
            </h2>
            <br/>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide px-2">
                {companies.map((company, idx) => (
                    <Card
                        key={idx}
                        className={`
              flex-shrink-0 w-72 h-72 p-4 flex flex-col items-center justify-center 
              rounded-lg shadow-md dark:shadow-gray-800 transition-transform duration-300
              ${company.bg} dark:bg-gray-700
              hover:scale-105 hover:shadow-xl
            `}
                    >
                        <img
                            src={company.logo}
                            alt={company.name}
                            className="h-20 mb-2 object-contain"
                        />
                        <span className="text-center font-medium text-gray-900 dark:text-gray-100">
                            {company.name}
                        </span>
                    </Card>
                ))}
            </div>
        </section>
    )
}
