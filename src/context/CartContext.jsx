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
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.dish.id === dish.id);

      if (existingItemIndex > -1) {
        // Rätten finns redan, öka antalet
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        // Rätten finns inte, lägg till som ny post
        return [...prevItems, { dishId: dish.id, quantity, dish }];
      }
    });
  };

  // Funktion för att ta bort en rätt från varukorgen (kan byggas ut senare)
  const removeItemFromCart = (dishId) => {
    setCartItems(prevItems => prevItems.filter(item => item.dishId !== dishId));
  };

  // Funktion för att tömma varukorgen (kan byggas ut senare)
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