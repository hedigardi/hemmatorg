import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth"; // Not used in current mock
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth
import TextInput from "../components/form/TextInput";
import Button from "../components/form/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("buyer"); // Nytt state för vald roll, 'buyer' är default
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Här kan du senare använda selectedRole om din login-logik behöver det
      await login(email, password, selectedRole); // Skickar med selectedRole
      navigate("/"); // Navigera till startsidan eller profilsidan efter inloggning
    } catch (err) {
      setError("Felaktig e-postadress eller lösenord."); // Generellt felmeddelande
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-pageTheme-light dark:bg-gray-900"> {/* Sidans bakgrund */}
      <div className="w-full max-w-md p-8 space-y-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl"> {/* Minskad space-y till 4 */}
        <h1 className="text-3xl font-bold text-center text-primary-main dark:text-primary-light">Logga in</h1> {/* Ändrad färg till orange */}
        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          Välj din roll och fortsätt
        </p>
        {error && <p className="text-red-500 text-sm text-center py-2">{error}</p>} {/* Lite padding för felmeddelande */}
        
        {/* Rollväljare */}
        <div className="pt-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Jag vill logga in som:</p>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer text-gray-700 dark:text-gray-300">
              <input type="radio" name="role" value="buyer" checked={selectedRole === "buyer"} onChange={() => setSelectedRole("buyer")} className="form-radio text-primary-main focus:ring-primary-main" />
              <span>Köpare</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer text-gray-700 dark:text-gray-300">
              <input type="radio" name="role" value="seller" checked={selectedRole === "seller"} onChange={() => setSelectedRole("seller")} className="form-radio text-primary-main focus:ring-primary-main" />
              <span>Säljare</span>
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="Ditt lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" disabled={loading} className="w-full !py-3 text-base"> {/* Ökad padding och textstorlek på knappen */}
            {loading ? "Loggar in..." : "Logga in"}
          </Button>
        </form>
        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          Har du inget konto?{" "}
          <Link to="/register" className="font-medium text-primary-main hover:underline"> {/* Använder primary.main för länken */}
            Skapa ett här
          </Link>
        </p>
      </div>
    </div>
  );
}
