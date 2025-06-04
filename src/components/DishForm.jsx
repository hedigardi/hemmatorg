// src/components/DishForm.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import TextInput from "../components/form/TextInput";
import Textarea from "../components/form/Textarea";
import Dropdown from "../components/form/Dropdown"; 
import Button from "../components/form/Button";

export default function DishForm({ onSubmit }) {
  const { user, isAuthenticated } = useAuth(); // Assuming 'user' object with 'uid' will be available
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "",
    ingredients: "",
    allergens: "",
  });
  const [loading, setLoading] = useState(false);

  // Handler for TextInput and Textarea components
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // Specific handler for the Dropdown component
  const handleCategoryChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isAuthenticated || !user) {
      console.error("Du måste vara inloggad för att spara en rätt.");
      setLoading(false);
      return;
    }

    try {
      const dishDataToSubmit = {
        ...formData,
        price: parseFloat(formData.price),
        sellerId: user.uid, // Use actual user ID
      };

      await onSubmit(dishDataToSubmit); // Delegate submission to parent

      setFormData({
        title: "",
        description: "",
        price: "",
        imageUrl: "",
        category: "",
        ingredients: "",
        allergens: "",
      });
    } catch (error) {
      console.error("Fel vid skickande av formulär:", error);
      // Error handling (e.g., showing a notification) can be managed by the parent component
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = [
    { label: "Vegetariskt", value: "vegetariskt" },
    { label: "Kött", value: "kött" },
    { label: "Fisk", value: "fisk" },
    { label: "Efterrätt", value: "efterrätt" },
    { label: "Veganskt", value: "veganskt" },
    { label: "Soppor", value: "soppor" },
    // Add more categories as needed
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput
        label="Titel"
        name="title"
        placeholder="Titel"
        value={formData.title}
        onChange={handleInputChange}
        required
      />
      <Textarea
        label="Beskrivning"
        name="description"
        placeholder="Beskrivning"
        value={formData.description}
        onChange={handleInputChange}
        required
      />
      <TextInput
        label="Pris (kr)"
        name="price"
        type="number"
        step="0.01"
        placeholder="Pris"
        value={formData.price}
        onChange={handleInputChange}
        required
      />
      <TextInput
        label="Bild-URL"
        name="imageUrl"
        type="url"
        placeholder="Bild-URL"
        pattern="https?://.+"
        title="Ange en giltig URL som börjar med http eller https"
        value={formData.imageUrl}
        onChange={handleInputChange}
      />
      <Textarea
        label="Ingredienser"
        name="ingredients"
        placeholder="Lista ingredienserna..."
        value={formData.ingredients}
        onChange={handleInputChange}
      />
      <Textarea
        label="Allergiinformation (frivilligt)"
        name="allergens"
        placeholder="Ange eventuella allergener..."
        value={formData.allergens}
        onChange={handleInputChange}
      />
      <Dropdown
        label="Kategori"
        name="category"
        value={formData.category}
        onChange={handleCategoryChange} // Use the specific handler
        options={categoryOptions}
        required
      />
      <Button
        type="submit"
        disabled={loading}
        variant="primary"
      >
        {loading ? "Sparar..." : "Spara rätt"}
      </Button>
    </form>
  );
}
