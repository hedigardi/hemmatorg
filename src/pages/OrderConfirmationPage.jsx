// src/pages/OrderConfirmationPage.jsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/form/Button';

export default function OrderConfirmationPage() {
  const { orderId } = useParams(); // Hämta orderId från URL:en

  return (
    <div className="container mx-auto p-4 md:p-8 text-center">
      <h1 className="text-3xl font-bold text-green-500 mb-4">Tack för din beställning!</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
        Din beställning har tagits emot och kommer att bearbetas.
      </p>
      {orderId && <p className="text-md text-gray-600 dark:text-gray-400 mb-6">Ditt ordernummer är: <strong>{orderId}</strong></p>}
      <Link to="/">
        <Button variant="primary">Tillbaka till startsidan</Button>
      </Link>
    </div>
  );
}