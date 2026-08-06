import { Navigate } from "react-router-dom";
import { useAdminAuth } from "@/context/AdminAuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useAdminAuth();

  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default ProtectedRoute;