import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/auth.context";
import type { ReactNode } from "react";

interface GuestRouteProps {
    children: ReactNode;
}

export const GuestRoute = ({ children }: GuestRouteProps) => {
    const { user } = useAuth();

    if (user) {
        // logged in → home page ကို redirect
        return <Navigate to="/" replace />;
    }

    return children;
};
