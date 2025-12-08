import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AIRecommendations from "./pages/AIRecommendations";

// Components
import Navbar from "./components/Navbar";

function App() {
  // Track token in state
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken); // triggers re-render, Navbar shows immediately
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <Toaster />
      <Navbar token={token} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Public Routes */}
        <Route
          path="/login"
          element={!token ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/register"
          element={!token ? <Register onRegister={handleLogin} /> : <Navigate to="/dashboard" />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/transactions"
          element={token ? <Transactions /> : <Navigate to="/login" />}
        />
        <Route
          path="/ai-recommendations"
          element={token ? <AIRecommendations /> : <Navigate to="/login" />}
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
