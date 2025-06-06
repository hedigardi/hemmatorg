function Header() {
    return (
      <header className="flex items-center justify-between p-4 border-b-2 border-primary-main dark:border-gray-700">
        <h1 className="text-xl font-bold text-orange-500">HemmaTorg</h1>
        <button className="bg-orange-500 text-white px-4 py-2 rounded">Logga in med BankID</button>
      </header>
    );
  }
  
  export default Header;