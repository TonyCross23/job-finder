import { useState } from "react";
import { 
  FileText, 
  User as UserIcon, 
  Briefcase, 
  Calendar, 
  MoreHorizontal, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye,
  Search
} from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ApplicationStatus = "Pending" | "Seen" | "Accepted" | "Rejected";

export const Applications = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [applications, setApplications] = useState([
    {
      id: "app-1",
      jobTitle: "Frontend Engineer",
      applicantName: "Aung Aung",
      applicantEmail: "aung@gmail.com",
      status: "Pending" as ApplicationStatus,
      appliedAt: "2024-03-20",
    },
    {
      id: "app-2",
      jobTitle: "Backend Developer",
      applicantName: "Su Su",
      applicantEmail: "susu@gmail.com",
      status: "Accepted" as ApplicationStatus,
      appliedAt: "2024-03-18",
    },
    {
      id: "app-3",
      jobTitle: "UI/UX Designer",
      applicantName: "Kyaw Kyaw",
      applicantEmail: "kyaw@gmail.com",
      status: "Rejected" as ApplicationStatus,
      appliedAt: "2024-03-15",
    }
  ]);

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case "Accepted":
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200 hover:bg-emerald-500/20"><CheckCircle2 className="w-3 h-3 mr-1" /> Accepted</Badge>;
      case "Rejected":
        return <Badge variant="destructive" className="bg-red-500/10 text-red-600 border-red-200 hover:bg-red-500/20"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
      case "Seen":
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-200 hover:bg-blue-500/20"><Eye className="w-3 h-3 mr-1" /> Seen</Badge>;
      default:
        return <Badge variant="secondary" className="bg-slate-500/10 text-slate-600 border-slate-200 hover:bg-slate-500/20"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
    }
  };

  const filteredApps = applications.filter(app => 
    app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto">
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Job Applications</h1>
          <p className="text-muted-foreground text-sm">အလုပ်လျှောက်လွှာများကို စစ်ဆေးပြီး Status များ ပြောင်းလဲနိုင်ပါသည်။</p>
        </div>
        <div className="flex gap-2">
            <Badge variant="outline" className="px-3 py-1 font-medium">Total: {applications.length}</Badge>
        </div>
      </div>

      {/* --- Search Bar --- */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or job..."
          className="pl-9 bg-card"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* --- Applications Table --- */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[250px]">Applicant</TableHead>
              <TableHead>Applied Position</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApps.length > 0 ? (
              filteredApps.map((app) => (
                <TableRow key={app.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">{app.applicantName}</span>
                        <span className="text-[11px] text-muted-foreground">{app.applicantEmail}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm font-medium">{app.jobTitle}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {app.appliedAt}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(app.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                        <DropdownMenuItem className="gap-2 cursor-pointer text-blue-600">
                          <Eye className="h-4 w-4" /> Mark as Seen
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer text-emerald-600">
                          <CheckCircle2 className="h-4 w-4" /> Accept Candidate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer text-red-600">
                          <XCircle className="h-4 w-4" /> Reject Candidate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 cursor-pointer font-medium">
                          <FileText className="h-4 w-4" /> View Resume
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No applications found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};  