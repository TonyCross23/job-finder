import { useState } from "react";
import { 
  Building2, Globe, Phone, MapPin, Plus, 
  MoreHorizontal, Trash2, Pencil, Search, 
  ExternalLink, User as UserIcon, Info
} from "lucide-react";

import {
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function AdminCompanies() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [locations] = useState([
    { id: "loc-1", name: "Yangon" },
    { id: "loc-2", name: "Mandalay" },
    { id: "loc-3", name: "Naypyidaw" },
    { id: "loc-4", name: "Taunggyi" },
    { id: "loc-5", name: "Bago" },
  ]);

  const [availableUsers] = useState([
    { id: "u1", username: "Mg Mg", email: "mgmg@gmail.com" },
    { id: "u2", username: "Kyaw Kyaw", email: "kyawkyaw@gmail.com" },
    { id: "u3", username: "Su Su", email: "susu@gmail.com" },
  ]);

  const [companies, setCompanies] = useState([
    {
      id: "c1",
      userId: "u1",
      ownerName: "Mg Mg",
      companyName: "Tech Hub Myanmar",
      phone: "09123456789",
      website: "https://techhub.com",
      locationName: "Yangon",
      jobCount: 5
    },
    {
      id: "c2",
      userId: "u2",
      ownerName: "Kyaw Kyaw",
      companyName: "Green Energy Co.",
      phone: "09777888999",
      website: "https://greenenergy.com",
      locationName: "Mandalay",
      jobCount: 3
    }
  ]);

  const [formData, setFormData] = useState({
    userId: "",
    companyName: "",
    phone: "",
    website: "",
    locationId: "",
    address: "",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating Company with Data:", formData);
    // API Call logic goes here...
    setOpen(false);
  };

  // Search Logic
  const filteredCompanies = companies.filter(c => 
    c.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto">
      {/* --- Header & Create Button --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Company Management</h1>
          <p className="text-muted-foreground text-sm">လုပ်ငန်းရှင်များနှင့် ကုမ္ပဏီပရိုဖိုင်များကို စီမံခန့်ခွဲရန် Admin Panel</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-lg">
              <Plus className="h-4 w-4" /> Create Company Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Add New Company</DialogTitle>
                <DialogDescription>
                  ကုမ္ပဏီအချက်အလက်များကို ဖြည့်စွက်ပြီး User တစ်ဦးထံ သတ်မှတ်ပေးပါ။
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-5 py-6">
                {/* User Assignment (Select Box) */}
                <div className="grid gap-2 p-4 bg-primary/5 rounded-xl border border-primary/20">
                  <Label className="flex items-center gap-2 font-bold text-primary">
                    <UserIcon className="h-4 w-4" /> Assign Owner (User Account)
                  </Label>
                  <Select onValueChange={(val) => setFormData({...formData, userId: val})}>
                    <SelectTrigger className="bg-white border-primary/20">
                      <SelectValue placeholder="Select a user for this company" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableUsers.map((u) => (
                        <SelectItem key={u.id} value={u.id}>
                          {u.username} ({u.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Company Name</Label>
                    <Input 
                      id="name" required 
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      placeholder="e.g. Tech Hub Co."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Contact Phone</Label>
                    <Input 
                      id="phone" required 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="09..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Location Selection (Select Box) */}
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-red-500" /> Location (City)
                    </Label>
                    <Select onValueChange={(val) => setFormData({...formData, locationId: val})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose City" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc.id} value={loc.id}>{loc.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="web">Website URL</Label>
                    <Input 
                      id="web" 
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="desc">Company Bio / Description</Label>
                  <Textarea 
                    id="desc" 
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="ကုမ္ပဏီအကြောင်း အကျဉ်းချုပ်..."
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={!formData.userId || !formData.locationId}>
                  Confirm & Create
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* --- Search & Stats --- */}
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by company name..."
            className="pl-9 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="hidden md:flex gap-4">
          <Badge variant="outline" className="px-4 py-1">Total: {companies.length} Companies</Badge>
        </div>
      </div>

      {/* --- Companies Table --- */}
      <div className="rounded-xl border bg-card shadow-sm overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50 font-bold">
            <TableRow>
              <TableHead className="w-[300px]">Company & Owner</TableHead>
              <TableHead>Contact & Social</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-center">Activity</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
                <TableRow key={company.id} className="hover:bg-muted/20 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground">{company.companyName}</span>
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <UserIcon className="h-3 w-3" /> Owner: {company.ownerName}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 text-sm">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Phone className="h-3.5 w-3.5 text-blue-500" /> {company.phone}
                      </div>
                      {company.website && (
                        <a href={company.website} target="_blank" rel="noreferrer" className="text-blue-600 flex items-center gap-1 text-xs hover:underline">
                          <Globe className="h-3 w-3" /> Visit Site <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-orange-50 text-orange-700 border-orange-200">
                      <MapPin className="h-3 w-3 mr-1" /> {company.locationName}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        {company.jobCount} Active Jobs
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[180px]">
                        <DropdownMenuLabel>Settings</DropdownMenuLabel>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <Pencil className="h-4 w-4" /> Edit Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <Info className="h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive gap-2 font-bold cursor-pointer" 
                          onClick={() => confirm(`Are you sure you want to delete ${company.companyName}?`)}
                        >
                          <Trash2 className="h-4 w-4" /> Delete Company
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground italic">
                  No companies found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}