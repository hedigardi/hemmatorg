import Navbar from './components/Navbar';
import RoutesComponent from './routes';
import { CartProvider } from './context/CartContext'; // Importera CartProvider

function App() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <CartProvider> {/* Omslut med CartProvider */}
        <Navbar />
        <RoutesComponent />
      </CartProvider>
    </div>
  );
}

export default App;
