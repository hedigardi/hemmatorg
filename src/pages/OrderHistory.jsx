import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // Importera useAuth
import { getOrdersByUserId } from "../services/orderService"; // Importera service-funktionen

export default function OrderHistory() {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated || !user) {
        setLoading(false);
        setError("Du måste vara inloggad för att se din orderhistorik.");
        return;
      }

      try {
        setLoading(true);
        const fetchedOrders = await getOrdersByUserId(user.uid);
        setOrders(fetchedOrders);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Kunde inte ladda din orderhistorik. Försök igen senare.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, user]); // Körs om när inloggningsstatus eller användare ändras

  if (loading) return <p className="p-4 text-center">Laddar orderhistorik...</p>;
  if (error) return <p className="p-4 text-center text-red-500">{error}</p>;
  if (!isAuthenticated) return <p className="p-4 text-center">Logga in för att se din orderhistorik.</p>;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">Din Orderhistorik</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">Du har inga tidigare beställningar.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Order #{order.id.substring(0, 8)}...</h2> {/* Visa kort ID */}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'new' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' : 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Datum: {order.createdAt?.toDate().toLocaleDateString()} {order.createdAt?.toDate().toLocaleTimeString()}
              </p>
              <p className="text-md font-bold text-gray-800 dark:text-white">Totalsumma: {order.totalAmount} kr</p>
              {/* Kan lägga till en lista över items här senare */}
              {/* <div className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                <strong>Artiklar:</strong>
                <ul className="list-disc list-inside">
                  {order.items.map((item, index) => (
                    <li key={index}>{item.title} (x{item.quantity}) - {item.priceAtPurchase} kr/st</li>
                  ))}
                </ul>
              </div> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
