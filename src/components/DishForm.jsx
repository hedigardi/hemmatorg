// src/components/DishForm.jsx
import React, { useState, useEffect } from "react"; // Importera useEffect
import { useAuth } from "../context/AuthContext";
import TextInput from "../components/form/TextInput";
import Textarea from "../components/form/Textarea";
import Dropdown from "../components/form/Dropdown"; 
import Button from "../components/form/Button";

export default function DishForm({ onSubmit, initialData = {}, isEditMode = false }) { // Lägg till initialData och isEditMode props
  const { user, isAuthenticated } = useAuth(); // Assuming 'user' object with 'uid' will be available
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "", // Håll pris som sträng initialt för inputfältet
    imageUrl: "",
    category: "",
    // Lägg till fler fält om de finns i din datamodell och formulär
    // t.ex. city: "",
    ingredients: "",
    allergens: "",
  });
  const [loading, setLoading] = useState(false);

  // Handler for TextInput and Textarea components
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    // Hantera pris som nummer vid behov, men spara som sträng i state för input
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Specific handler for the Dropdown component
  // Denna funktion tar emot det valda värdet direkt från Dropdown-komponenten
  const handleCategoryChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  // Fyll i formuläret med initialData när komponenten är i redigeringsläge
  useEffect(() => {
    if (isEditMode && initialData) {
      setFormData({
        ...initialData,
        price: initialData.price ? String(initialData.price) : "", // Konvertera pris till sträng för input
        // Se till att alla fält från initialData mappas korrekt
      });
    }
  }, [isEditMode, initialData]);

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
        price: parseFloat(formData.price), // Konvertera pris till nummer för databasen
        // Lägg bara till sellerId och createdAt om det är en ny rätt
        ...(isEditMode ? {} : { sellerId: user.uid }),
        ...(isEditMode ? {} : { createdAt: new Date() }), // Använd serverTimestamp i servicen istället
      };

      await onSubmit(dishDataToSubmit); // Delegate submission to parent

      // Återställ formuläret endast om det är lägg till-läge
      if (!isEditMode) {
        setFormData({
          title: "",
          description: "",
          price: "",
          imageUrl: "",
        category: "",
        ingredients: "",
        allergens: "",
      });
    }
    } catch (error) {
      console.error("Fel vid skickande av formulär:", error);
      // Error handling (e.g., showing a notification) can be managed by the parent component
      throw error; // Kasta felet vidare så att föräldrakomponenten kan hantera det
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
        {loading ? (isEditMode ? "Uppdaterar..." : "Sparar...") : (isEditMode ? "Uppdatera rätt" : "Spara rätt")}
      </Button>
    </form>
  );
}
