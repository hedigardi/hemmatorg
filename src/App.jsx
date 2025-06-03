import Navbar from './components/Navbar';
import RoutesComponent from './routes';

function App() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Navbar />
      <RoutesComponent />
    </div>
  );
}

export default App;
