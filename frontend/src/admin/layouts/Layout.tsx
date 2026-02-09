import { Outlet } from "react-router-dom";
import { Topbar } from "../components/Topbar";
import { AppSidebar } from "../components/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const AdminLayout = () => {
    return (
        <SidebarProvider>
            {/* 1. The Sidebar itself */}
            <AppSidebar />

            {/* 2. Inset wraps the Topbar and Content area */}
            <SidebarInset>
                <Topbar />
                <main className="p-4 md:p-6">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default AdminLayout;