import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
