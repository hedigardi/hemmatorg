import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-orange-400 text-white">
      <Link to="/" className="text-lg font-bold">HemmaTorg</Link>
      <div className="flex gap-4">
        <Link to="/cart">Varukorg</Link>
        <Link to="/profile">Profil</Link>
        <Link to="/login">Logga in</Link>
      </div>
    </nav>
  );
}
