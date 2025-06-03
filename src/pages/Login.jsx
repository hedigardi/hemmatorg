import React from "react";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-6">Logga in med BankID</h1>
      <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
        Starta BankID
      </button>
    </div>
  );
}
