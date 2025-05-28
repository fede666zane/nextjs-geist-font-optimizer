"use client";

import { useState } from "react";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Login handler with API call
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      alert("Please enter username and password");
      return;
    }
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        setIsLoggedIn(true);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("Error logging in");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <form
          onSubmit={handleLogin}
          className="bg-gray-800 p-8 rounded-lg shadow-lg w-80"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <label className="block mb-2 font-semibold" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <label className="block mb-2 font-semibold" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-6 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="w-full bg-white text-gray-900 font-bold py-2 rounded hover:bg-gray-200 transition"
          >
            Log In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Presupuestos - Agencia de Viajes</h1>
      <p>Bienvenido, {username}!</p>
      {/* Further UI for budget creation will go here */}
    </div>
  );
}
