import { 
  Users, 
  Briefcase, 
  FileCheck, 
  Star 
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// Assuming you'll refactor Chart to use shadcn/recharts later
import { Chart } from "../components/Chart"; 

export const Dashboard = () => {
  const stats = [
    { title: "Total Users", value: "12,452", icon: Users, description: "+12% from last month" },
    { title: "Active Jobs", value: "318", icon: Briefcase, description: "24 new today" },
    { title: "Applications", value: "124", icon: FileCheck, description: "10% increase" },
    { title: "Avg. Rating", value: "4.8", icon: Star, description: "Based on 2k reviews" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header section if you want a page title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your platform's performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts / Main Content */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Growth Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
             <Chart />
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {/* You can drop a shadcn Table or ScrollArea here */}
            <div className="text-sm text-muted-foreground">
              Recent user registrations will appear here.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};