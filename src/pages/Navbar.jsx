import React from "react";

export default function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <h1 className="text-xl font-bold text-blue-600">Quiz App</h1>

      {/* Right Side Buttons */}
      <div className="flex items-center gap-4">
        {/* If NOT Logged In */}
        {!isLoggedIn && (
          <button
            onClick={() => (window.location.href = "/login")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        )}

        {/* If Logged In */}
        {isLoggedIn && (
          <>
            {/* Profile Button */}
            <button
              onClick={() => (window.location.href = "/profile")}
              className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold hover:bg-gray-400 transition"
            >
              A
            </button>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
