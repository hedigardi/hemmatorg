import React from "react";
// import { signInWithEmailAndPassword } from "firebase/auth"; // Not used in current mock
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  const handleLogin = () => {
    // Här skulle du anropa BankID-API eller mocka det
    
    // Vi simulerar en inloggning
    setTimeout(() => {
      const mockUser = { uid: "mockUserId123", email: "test@example.com", name: "Test User" }; // Example user object
      login(mockUser); // Call context's login function
      navigate("/profile"); // Gå till profil efter inloggning
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-4">
      <h1 className="text-2xl font-bold mb-6">Logga in med BankID</h1>
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Starta BankID
      </button>
    </div>
  );
}
