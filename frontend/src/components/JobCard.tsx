import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

export function JobCard({ job }) {
    return (
        <Card className="relative hover:shadow-xl transition-shadow h-full">
            <div className="absolute top-4 left-4">
                <img src={job.logo} alt={job.company} className="h-10 w-10 rounded-md object-cover border" />
            </div>
            <CardHeader className="pt-16">
                <CardTitle className="text-xl">{job.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{job.company}</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />{job.location}
                </div>
                <div className="flex justify-end">
                    <Badge className="text-xs rounded-sm text-dark border-gray-950 dark:bg-gray-900 dark:border-gray-100 dark:text-white bg-white">{job.type}</Badge>
                </div>
                <Button variant="outline" className="w-full border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white">Apply Job</Button>
            </CardContent>
        </Card>
    )
}