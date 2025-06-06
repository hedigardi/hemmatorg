import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importera useNavigate
import { useCart } from '../context/CartContext';
import Button from '../components/form/Button'; // Importera Button
import { Trash2 } from 'lucide-react'; // Importera Trash2 ikon

export default function Cart() {
  const { cartItems, addItemToCart, removeItemFromCart, clearCart } = useCart();
  const navigate = useNavigate(); // Hook för navigering

  const calculateTotalItemPrice = (item) => item.dish.price * item.quantity;
  const calculateTotalPrice = () =>
    cartItems.reduce((total, item) => total + calculateTotalItemPrice(item), 0);

  const handleIncreaseQuantity = (dish) => addItemToCart(dish, 1);
  const handleDecreaseQuantity = (dish) => {
    if (cartItems.find((item) => item.dish.id === dish.id).quantity > 1) {
      // Minska antalet om det är mer än 1 (removeItemFromCart hanterar redan antal)
      removeItemFromCart(dish.id, 1);
    } else {
      // Ta bort helt om antalet är 1
      removeItemFromCart(dish.id);
    }
  };
  const handleRemoveItem = (dishId) => removeItemFromCart(dishId, cartItems.find(item => item.dish.id === dishId)?.quantity || 1); // Ta bort alla av denna rätt

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">Din varukorg</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">Din varukorg är tom.</p>
      ) : (
        <>
          <ul className="space-y-4"> {/* Använd space-y istället för divide-y för tydligare separation */}
            {cartItems.map((item) => (
              <li key={item.dish.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex flex-col md:flex-row items-center justify-between"> {/* Kort-stil för varje artikel */}
                <div className="flex items-center">
                  {item.dish.imageUrl && (
                    <img
                      src={item.dish.imageUrl}
                      alt={item.dish.title}
                      className="w-20 h-20 object-cover rounded-md mr-4"
                    />
                  )}
                  <div>
                    <p className="text-lg font-medium text-gray-800 dark:text-white">{item.dish.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Antal: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center mt-2 md:mt-0">
                  <span className="text-lg font-semibold text-gray-800 dark:text-white mr-4">
                    {calculateTotalItemPrice(item)} kr
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="secondary" onClick={() => handleDecreaseQuantity(item.dish)} disabled={item.quantity <= 1}>-</Button> {/* Disable minskning om antal är 1 */}
                    <Button variant="secondary" onClick={() => handleIncreaseQuantity(item.dish)}>+</Button>
                    <Button variant="destructive_outline" onClick={() => handleRemoveItem(item.dish.id)} className="flex items-center"> {/* Lägg till flex items-center */}
                      <Trash2 className="mr-1 h-4 w-4" /> Ta bort
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center font-semibold"> {/* Lade till font-semibold */}
            <span className="text-xl font-bold text-gray-800 dark:text-white">Totalsumma:</span>
            <span className="text-2xl font-bold text-orange-500">{calculateTotalPrice()} kr</span>
          </div>

          <div className="mt-4 flex justify-end space-x-4">
            {/* Valfri "Töm varukorgen"-knapp */}
            {/* <Button variant="outline" onClick={clearCart}>Töm varukorgen</Button> */}

            {/* "Gå till kassan"-knapp (funktionalitet ej implementerad) */}
            <Button variant="primary" onClick={() => navigate('/checkout')} disabled={cartItems.length === 0}>
              Gå till kassan
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
