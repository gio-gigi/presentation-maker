import { Navigate, Outlet } from "react-router-dom";
import { UserRole } from "../constants/roles";
import { useAuth } from "../contexts/auth_context";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace={true}/>;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace={true}/>;
  }
  return <Outlet/>;
}