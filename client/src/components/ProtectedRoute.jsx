import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;