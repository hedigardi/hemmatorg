// src/components/DishForm.jsx
import React, { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function DishForm({ onSubmit }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      alert("Du måste vara inloggad för att spara en rätt.");
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "dishes"), {
        ...formData,
        price: parseFloat(formData.price),
        sellerId: user.uid,
        createdAt: serverTimestamp(),
      });

      alert("Rätt sparad!");

      setFormData({
        title: "",
        description: "",
        price: "",
        imageUrl: "",
        category: "",
      });

      onSubmit?.();
    } catch (error) {
      console.error("Fel vid sparning:", error);
      alert("Något gick fel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        type="text"
        placeholder="Titel"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Beskrivning"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="price"
        type="number"
        step="0.01"
        placeholder="Pris"
        value={formData.price}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="imageUrl"
        type="url"
        placeholder="Bild-URL"
        pattern="https?://.+"
        title="Ange en giltig URL som börjar med http eller https"
        value={formData.imageUrl}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="">Välj kategori</option>
        <option value="vegetariskt">Vegetariskt</option>
        <option value="kött">Kött</option>
        <option value="fisk">Fisk</option>
        <option value="efterrätt">Efterrätt</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
      >
        {loading ? "Sparar..." : "Spara rätt"}
      </button>
    </form>
  );
}
