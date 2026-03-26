import { useState } from "react";
import Footer from "./sections/Footer";
import NavBar from "./sections/NavBar";
import AuthPage from "./components/AuthPage";
import Hero from "./sections/Hero";
import FeatureCardList from "./components/FeatureCardList";
import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";
import Contact from "./pages/Contact";
import About from "./pages/About";

const Test = () => {
  const [authMode, setAuthMode] = useState(null); // 'login' | 'signup' | null
  const [showAuth, setShowAuth] = useState(false);
  const [page, setPage] = useState("home");

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

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home />;
      case "vehicles":
        return <Vehicles />;
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      default:
        return <Home />;
    }
  };
  return (
    <div>
      <NavBar
        onLoginClick={openLogin}
        onSignupClick={openSignup}
        setPage={setPage}
      />

      {renderPage()}

        <Footer />
      {showAuth && (
        <AuthPage key={authMode} mode={authMode} onClose={closeAuth} />
      )}
    </div>
  );
};

export default Test;
