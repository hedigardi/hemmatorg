// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // State för varukorgen. Använd en array av objekt, t.ex. { dishId: '...', quantity: N, dish: { ...dishData } }
  const [cartItems, setCartItems] = useState([]);

  // Ladda varukorgen från localStorage vid start
  useEffect(() => {
    const storedCart = localStorage.getItem('hemmatorg_cart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        localStorage.removeItem('hemmatorg_cart'); // Clear invalid data
      }
    }
  }, []);

  // Spara varukorgen till localStorage när den ändras
  useEffect(() => {
    localStorage.setItem('hemmatorg_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Funktion för att lägga till en rätt i varukorgen
  const addItemToCart = (dish, quantity = 1) => {
    console.log("addItemToCart received call for dish:", dish.title, "with quantity parameter:", quantity);
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.dish.id === dish.id);

      if (existingItemIndex > -1) {
        // Varan finns redan i varukorgen, uppdatera antalet
        // Skapa en ny array OCH ett nytt objekt för den vara som uppdateras
        const updatedItems = prevItems.map((item, index) => {
          if (index === existingItemIndex) {
            // console.log("Inside setCartItems callback: Item found. Current quantity:", item.quantity, "Quantity variable value:", quantity);
            const newQuantity = item.quantity + 1; // Addera alltid 1
            // console.log("Inside setCartItems callback: New quantity after adding 1:", newQuantity);
            return { ...item, quantity: newQuantity }; // Returnera ett nytt objekt med uppdaterat antal
          }
          return item; // Returnera oförändrade objekt
        });
        return updatedItems;
      } else {
        // Varan är ny, lägg till den i varukorgen med det specificerade antalet
        return [...prevItems, { dish, quantity: quantity }]; // Använd 'quantity' istället för 'quantityToAdd'
      }
    });
  };

  // Funktion för att ta bort en rätt från varukorgen eller minska antalet
  // Denna funktion verkar ha blivit återställd till en äldre version i din kontext.
  // Vi bör använda den version som hanterar minskning av antal också.
  const removeItemFromCart = (dishId, quantityToRemove = 1) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.dish.id === dishId);

      if (existingItemIndex > -1) {
        const currentItem = prevItems[existingItemIndex];
        const newQuantity = currentItem.quantity - quantityToRemove;

        if (newQuantity <= 0) {
          // Ta bort varan helt om antalet blir 0 eller mindre
          return prevItems.filter((_, index) => index !== existingItemIndex);
        }
        // Annars, uppdatera antalet för varan genom att skapa ett nytt objekt
        return prevItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      return prevItems; // Returnera oförändrad lista om rätten inte finns
    });
  };

  // Funktion för att tömma varukorgen
  const clearCart = () => {
    setCartItems([]);
  };

  // Beräkna totalt antal varor i varukorgen
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}