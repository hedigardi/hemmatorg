import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth(); // Hämta loading state

  if (loading) {
    // Om autentiseringsstatus fortfarande laddas, visa en laddningsindikator eller ingenting
    // Detta förhindrar omdirigering innan Firebase har svarat.
    return <p className="p-4 text-center">Laddar autentisering...</p>; // Eller return null;
  }

  if (!isAuthenticated && !loading) { // Kontrollera isAuthenticated först när loading är false
    return <Navigate to="/login" replace />;
  }

  return children;
}
