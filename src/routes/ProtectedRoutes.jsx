import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { useEffect, useState } from "react";

export const ProtectedRoutes = () => {
  const { token, steamId, isInitialized, isLoading } = useAuthStore();
  const location = useLocation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isInitialized && !isLoading) {
      setIsReady(true);
    }
  }, [isInitialized, isLoading]);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-cyan-400">
        Завантаження...
      </div>
    );
  }

  if (!token && !steamId) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
};