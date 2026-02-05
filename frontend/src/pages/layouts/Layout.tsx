import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <Navbar />
            <div className="py-3">
            <Outlet />
            </div>
        </div>
    );
};

export default Layout;