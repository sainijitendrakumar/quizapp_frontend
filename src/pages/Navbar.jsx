import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true ya false
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-white shadow-md w-full px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <h1 className="text-xl font-bold text-blue-600">Quiz App</h1>

      {/* Right side buttons */}
      <div className="flex items-center gap-4">
        {/* If NOT logged in */}
        {!isLoggedIn && (
          <button
            onClick={() => (window.location.href = "/login")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Login
          </button>
        )}

        {/* If logged in */}
        {isLoggedIn && (
          <>
            {/* Profile Button */}
            <button
              onClick={() => (window.location.href = "/profile")}
              className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold"
            >
              A
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
