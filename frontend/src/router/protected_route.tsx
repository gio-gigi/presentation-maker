import { Navigate, Outlet } from "react-router-dom";
import { UserRole } from "../constants/roles";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const user = { role: UserRole.ADMIN }; //TODO: get user from context
  if (!user) {
    return <Navigate to="/login" replace={true}/>;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace={true}/>;
  }
  return <Outlet/>;
}