import { Link, useLocation } from "react-router-dom";
import { User, Briefcase, Building, FileText, BarChart2, LocateIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  { name: "Dashboard", path: "/admin/", icon: BarChart2 },
  { name: "Users", path: "/admin/users", icon: User },
  { name: "Jobs", path: "/admin/jobs", icon: Briefcase },
  { name: "Companies", path: "/admin/companies", icon: Building },
  { name: "Applications", path: "/admin/applications", icon: FileText },
  { name: "Locations", path: "/admin/location", icon: LocateIcon },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <span className="text-xl font-bold tracking-tight">Admin</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.path}
                    tooltip={item.name}
                  >
                    <Link to={item.path}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}