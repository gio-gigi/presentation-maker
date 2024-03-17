import { Navigate, Outlet } from "react-router-dom";
import { UserRole } from "../constants/roles";
import { useAuth } from "../contexts/auth_context";

export const LoginRoute = () => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" replace={true}/>;
  }
  return <Outlet/>;
}