// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import TextInput from "../components/form/TextInput";
import Button from "../components/form/Button";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(email, password, displayName);
      navigate("/"); // Navigera till startsidan eller profilsidan efter registrering
    } catch (err) {
      setError(err.message);
      console.error("Registration failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg">
        <h1 className="text-2xl font-bold text-center text-orange-500">Skapa konto</h1>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            label="Visningsnamn"
            name="displayName"
            type="text"
            placeholder="Ditt namn"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
          <TextInput
            label="E-postadress"
            name="email"
            type="email"
            placeholder="din@epost.se"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextInput
            label="Lösenord"
            name="password"
            type="password"
            placeholder="Minst 6 tecken"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" disabled={loading} className="w-full">
            {loading ? "Registrerar..." : "Skapa konto"}
          </Button>
        </form>
        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          Har du redan ett konto?{" "}
          <Link to="/login" className="font-medium text-orange-500 hover:underline">
            Logga in här
          </Link>
        </p>
      </div>
    </div>
  );
}