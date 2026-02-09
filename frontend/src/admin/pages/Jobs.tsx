import { useState } from "react";
import { 
  Plus, 
  MoreHorizontal, 
  MapPin, 
  Building2,
  DollarSign,
  Users2,
  Tag,
  Briefcase
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Jobs = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Job Management</h1>
        </div>

        {/* --- Post Job Dialog --- */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-lg hover:shadow-primary/20">
              <Plus className="h-4 w-4" /> Post New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Job Posting</DialogTitle>
              <DialogDescription>
                အလုပ်ခေါ်စာအသစ်အတွက် အချက်အလက်များကို ပြည့်စုံစွာ ဖြည့်စွက်ပါ။
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              {/* Title & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input id="title" placeholder="e.g. Senior Backend Developer" />
                </div>
                <div className="grid gap-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">IT / Software</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Type, Salary & Posts */}
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label>Job Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fulltime">Full-Time</SelectItem>
                      <SelectItem value="parttime">Part-Time</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="salary">Salary (MMK)</Label>
                  <Input id="salary" type="number" placeholder="1200000" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="posts">Num of Posts</Label>
                  <Input id="posts" type="number" placeholder="5" />
                </div>
              </div>

              {/* Description & Requirements */}
              <div className="grid gap-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea id="desc" placeholder="အလုပ်အကြောင်းအရာ ဖော်ပြချက်..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="req">Requirements</Label>
                <Textarea id="req" placeholder="လိုအပ်ချက်များ (Skills, Experience...)" />
              </div>

              {/* Address */}
              <div className="grid gap-2">
                <Label htmlFor="address">Full Address (Optional)</Label>
                <Input id="address" placeholder="အမှတ် (၁၂၃)၊ လမ်း ၅၀..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit">Create Posting</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* --- Jobs Table --- */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[250px]">Job Info</TableHead>
              <TableHead>Company & Category</TableHead>
              <TableHead>Location & Salary</TableHead>
              <TableHead>Openings</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Example Row */}
            <TableRow className="hover:bg-muted/30">
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-foreground">Frontend Engineer</span>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-[10px] uppercase font-bold py-0">Full-Time</Badge>
                    <span className="text-[10px] text-muted-foreground">v1.0</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1 text-sm">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Building2 className="h-3.5 w-3.5 text-blue-500" /> Tech Hub Co.
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Tag className="h-3 w-3" /> Software Development
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1 text-sm">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-red-500" /> Yangon
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                    <DollarSign className="h-3.5 w-3.5" /> 1.5M MMK
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Users2 className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">3</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 transition-colors">
                  Active
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View Applications</DropdownMenuItem>
                    <DropdownMenuItem>Edit Posting</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Delete Job</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};