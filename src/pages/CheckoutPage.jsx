// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrderInFirestore } from '../services/orderService';
import Button from '../components/form/Button';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateTotalItemPrice = (item) => item.dish.price * item.quantity;
  const calculateTotalPrice = () =>
    cartItems.reduce((total, item) => total + calculateTotalItemPrice(item), 0);

  const handlePlaceOrder = async () => {
    if (!isAuthenticated || !user) {
      setError("Du måste vara inloggad för att kunna slutföra en beställning.");
      navigate('/login'); // Omdirigera till login om inte inloggad
      return;
    }

    if (cartItems.length === 0) {
      setError("Din varukorg är tom.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const orderData = {
      buyerId: user.uid,
      items: cartItems.map(item => ({
        dishId: item.dish.id,
        title: item.dish.title,
        quantity: item.quantity,
        priceAtPurchase: item.dish.price, // Spara priset vid köptillfället
      })),
      totalAmount: calculateTotalPrice(),
      // Framtida: leveransadress, etc.
    };

    try {
      const orderId = await createOrderInFirestore(orderData);
      clearCart();
      navigate(`/order-confirmation/${orderId}`);
    } catch (err) {
      console.error("Failed to place order:", err);
      setError("Kunde inte slutföra beställningen. Försök igen.");
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0 && !isLoading) {
    return <div className="p-4 text-center">Din varukorg är tom. <Button onClick={() => navigate('/')}>Fortsätt handla</Button></div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">Kassa</h1>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Orderöversikt</h2>
        {cartItems.map(item => (
          <div key={item.dish.id} className="flex justify-between py-2 border-b dark:border-gray-700">
            <span>{item.dish.title} (x{item.quantity})</span>
            <span>{calculateTotalItemPrice(item)} kr</span>
          </div>
        ))}
        <div className="flex justify-between font-bold text-lg mt-4 pt-2 border-t dark:border-gray-700">
          <span>Totalsumma:</span>
          <span>{calculateTotalPrice()} kr</span>
        </div>
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        <Button
          variant="primary"
          onClick={handlePlaceOrder}
          disabled={isLoading || cartItems.length === 0}
          className="w-full mt-6"
        >
          {isLoading ? 'Bearbetar...' : 'Slutför beställning & Betala (Simulerad)'}
        </Button>
      </div>
    </div>
  );
}