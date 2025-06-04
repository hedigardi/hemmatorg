// src/pages/SellerOrdersPage.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getSellerOrderItems } from "../services/orderService";
import { Link } from "react-router-dom";

export default function SellerOrdersPage() {
  const { user, isAuthenticated } = useAuth();
  const [sellerOrderItems, setSellerOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellerItems = async () => {
      if (!isAuthenticated || !user) {
        setLoading(false);
        // ProtectedRoute handles redirection, but good practice
        return;
      }

      try {
        setLoading(true);
        const items = await getSellerOrderItems(user.uid);
        setSellerOrderItems(items);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch seller order items:", err);
        setError("Kunde inte ladda dina beställningar. Försök igen senare.");
      } finally {
        setLoading(false);
      }
    };

    fetchSellerItems();
  }, [isAuthenticated, user]);

  if (loading) return <p className="p-4 text-center">Laddar beställningar...</p>;
  if (error) return <p className="p-4 text-center text-red-500">{error}</p>;
  // ProtectedRoute handles the !isAuthenticated case

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">Dina Inkomna Beställningar</h1>

      {sellerOrderItems.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">Du har inga inkomna beställningar ännu.</p>
      ) : (
        <ul className="space-y-4">
          {sellerOrderItems.map(item => (
            <li key={item.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{item.dish.title} (x{item.quantity})</h2>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'new' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' : 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'}`}>
                  {item.status} {/* Or main order status if preferred */}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Orderdatum: {item.createdAt?.toDate().toLocaleDateString()} {item.createdAt?.toDate().toLocaleTimeString()}
              </p>
              <p className="text-md text-gray-700 dark:text-gray-200">Pris per enhet: {item.dish.priceAtPurchase} kr</p>
              <p className="text-md font-bold text-gray-800 dark:text-white">Total för denna artikel: {item.dish.priceAtPurchase * item.quantity} kr</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Order ID: <Link to={`/order-confirmation/${item.orderId}`} className="underline">{item.orderId}</Link></p> {/* Link to main order? */}
              {/* Seller actions like "Mark as prepared", "Contact buyer", etc. */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}