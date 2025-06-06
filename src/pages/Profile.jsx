import React, { useState, useEffect } from "react"; // Importera useEffect
import { useAuth } from "../context/AuthContext";
import TextInput from "../components/form/TextInput";
import Button from "../components/form/Button";
import { useNavigate } from "react-router-dom";
import { getOrdersByUserId } from "../services/orderService";
import { ListOrdered, Trash2, Edit } from "lucide-react"; // Importera ListOrdered, Trash2 OCH Edit ikoner

export default function Profile() {
  const { user, updateUserProfileData, deleteCurrentUserAccount, loading: authLoading } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // State för orderhistorik
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState(null);

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

  // Effekt för att hämta orderhistorik
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) { // ProtectedRoute hanterar omdirigering om inte inloggad
        setOrdersLoading(false);
        return;
      }

      try {
        setOrdersLoading(true);
        const fetchedOrders = await getOrdersByUserId(user.uid);
        setOrders(fetchedOrders);
        setOrdersError(null);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setOrdersError("Kunde inte ladda din orderhistorik. Försök igen senare.");
      } finally {
        setOrdersLoading(false);
      }
    };
    fetchOrders();
  }, [user]); // Körs om när användarobjektet ändras (t.ex. vid inloggning)

  if (authLoading || !user) {
    return <p className="p-4 text-center">Laddar...</p>; // Gemensamt laddningsmeddelande
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
            <Button onClick={() => setEditMode(true)} className="mt-2 flex items-center" variant="secondary"> {/* Lägg till flex items-center och eventuellt en variant */}
              <Edit className="mr-1 h-4 w-4" /> Redigera namn
            </Button>
          </div>
        )}

        <div className="pt-4 border-t dark:border-gray-700">
          <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Farozon</h2>
          {/* Lägg till Trash2 ikon och flex-styling för att matcha DishCard */}
          <Button variant="destructive_outline" onClick={handleDeleteAccount} disabled={loading} className="flex items-center">
            <Trash2 className="mr-1 h-4 w-4" /> {/* Matchar ikonstorlek och marginal från DishCard */}
            {loading ? "Raderar konto..." : "Radera mitt konto"} {/* Texten */}
          </Button>
        </div>
      </div>

      {/* Orderhistorik sektion */}
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 space-y-4 mt-8"> {/* Ny sektion */}
        <h2 className="text-2xl font-bold text-center text-orange-500 mb-4 flex items-center justify-center">
           <ListOrdered className="mr-2 h-6 w-6" /> Din Orderhistorik
        </h2>

        {ordersLoading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">Laddar orderhistorik...</p>
        ) : ordersError ? (
          <p className="text-center text-red-500">{ordersError}</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">Du har inga tidigare beställningar.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map(order => (
              <li key={order.id} className="bg-gray-100 dark:bg-gray-700 shadow-sm rounded-lg p-4"> {/* Lättare bakgrund för varje order */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Order #{order.id.substring(0, 8)}...</h3> {/* Visa kort ID */}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'new' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' : 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Datum: {order.createdAt?.toDate().toLocaleDateString()} {order.createdAt?.toDate().toLocaleTimeString()}
                </p>
                <p className="text-md font-bold text-gray-800 dark:text-white">Totalsumma: {order.totalAmount} kr</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
