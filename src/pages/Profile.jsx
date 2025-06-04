import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import TextInput from "../components/form/TextInput";
import Button from "../components/form/Button";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, updateUserProfileData, deleteCurrentUserAccount, loading: authLoading } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await updateUserProfileData({ displayName });
      setEditMode(false);
      alert("Profilen uppdaterad!");
    } catch (err) {
      setError("Kunde inte uppdatera profilen: " + err.message);
      console.error("Profile update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Är du säker på att du vill radera ditt konto? Detta kan inte ångras.")) {
      setError("");
      setLoading(true);
      try {
        await deleteCurrentUserAccount();
        alert("Ditt konto har raderats.");
        navigate("/"); // Navigera till startsidan efter radering
      } catch (err) {
        setError("Kunde inte radera kontot. Du kan behöva logga in igen och försöka på nytt. Fel: " + err.message);
        console.error("Account deletion failed:", err);
        // Firebase kan kräva nyligen inloggning för denna åtgärd.
        // Du kan behöva omdirigera till login eller visa ett meddelande om detta.
      } finally {
        setLoading(false);
      }
    }
  };

  if (authLoading || !user) {
    return <p className="p-4 text-center">Laddar profil...</p>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">Din Profil</h1>
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">E-postadress</p>
          <p className="text-lg text-gray-800 dark:text-white">{user.email}</p>
        </div>

        {editMode ? (
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <TextInput
              label="Visningsnamn"
              name="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
            <div className="flex gap-2">
              <Button type="submit" variant="primary" disabled={loading}>{loading ? "Sparar..." : "Spara ändringar"}</Button>
              <Button variant="outline" onClick={() => { setEditMode(false); setError(""); setDisplayName(user.displayName); }}>Avbryt</Button>
            </div>
          </form>
        ) : (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Visningsnamn</p>
            <p className="text-lg text-gray-800 dark:text-white">{user.displayName || "(Inget visningsnamn satt)"}</p>
            <Button onClick={() => setEditMode(true)} className="mt-2">Redigera namn</Button>
          </div>
        )}

        <div className="pt-4 border-t dark:border-gray-700">
          <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Farozon</h2>
          <Button variant="outline" onClick={handleDeleteAccount} disabled={loading} className="border-red-500 text-red-500 hover:bg-red-50">
            {loading ? "Raderar konto..." : "Radera mitt konto"}
          </Button>
        </div>
      </div>
    </div>
  );
}
