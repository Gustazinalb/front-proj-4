import { useEffect, useRef } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function ProtectedRoute({ adminOnly = false }) {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const toastShown = useRef(false);

  useEffect(() => {
    if (isAuthenticated && adminOnly && !isAdmin && !toastShown.current) {
      toastShown.current = true;
      navigate("/", { replace: true });
      window.setTimeout(() => toast.error("Acesso restrito a administradores."), 0);
    }
  }, [adminOnly, isAdmin, isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (adminOnly && !isAdmin) {
    return null;
  }

  return <Outlet />;
}
