import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import NavBar from "./sections/NavBar";
import Footer from "./sections/Footer";
import AuthPage from "./components/AuthPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [authMode, setAuthMode] = useState(null); // 'login' | 'signup' | null
  const [showAuth, setShowAuth] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const openLogin = () => {
    setAuthMode("login");
    setShowAuth(true);
  };

  const openSignup = () => {
    setAuthMode("signup");
    setShowAuth(true);
  };

  const closeAuth = () => {
    setShowAuth(false);
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <NavBar
            onLoginClick={openLogin}
            onSignupClick={openSignup}
            setIsNavOpen={setIsNavOpen}
          />

          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vehicles" element={<Vehicles isNavOpen={isNavOpen} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          <Footer />

          {showAuth && (
            <AuthPage key={authMode} mode={authMode} onClose={closeAuth} />
          )}
          <Toaster position="top-center" />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
