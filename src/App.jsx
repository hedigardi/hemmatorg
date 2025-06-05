import Navbar from './components/Navbar';
import RoutesComponent from './routes';
import { CartProvider } from './context/CartContext'; // Importera CartProvider
import Footer from './components/Footer'; // Importera Footer

function App() {
  return (
    // Denna div kommer att få bakgrundsfärgen om body-taggen inte redan har en mer specifik.
    // Med ändringen i index.css kommer body att styra den övergripande sidbakgrunden.
    <div className="min-h-screen flex flex-col bg-pageTheme-light text-gray-800 dark:bg-gray-900 dark:text-gray-200"> {/* Återinförd bg-pageTheme-light och flex flex-col */}
      <CartProvider>
        <Navbar />
        <main className="flex-grow"> {/* Omslut RoutesComponent med main och flex-grow */}
          <RoutesComponent />
        </main>
        <Footer /> {/* Lägg till Footer här */}
      </CartProvider>
    </div>
  );
}

export default App;
