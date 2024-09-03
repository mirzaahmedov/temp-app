import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./hook";

const AuthGuard = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default AuthGuard;
