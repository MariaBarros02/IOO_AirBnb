import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const PrivateRoute = ({ requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const [showingAlert, setShowingAlert] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated && !showingAlert) {
      setShowingAlert(true);
      Swal.fire({
        icon: "warning",
        title: "Debes iniciar sesión",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    if (
      !loading &&
      isAuthenticated &&
      requiredRole &&
      user?.role !== requiredRole &&
      !showingAlert
    ) {
      setShowingAlert(true);
      Swal.fire({
        icon: "error",
        title: "Acceso denegado",
        text: "No tienes permisos para acceder a esta sección.",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  }, [loading, isAuthenticated, user, requiredRole, showingAlert]);

  if (loading) return null; // spinner opcional aquí

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
