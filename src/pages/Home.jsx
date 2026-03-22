import { useState } from "react";
import NavBar from "../sections/NavBar";
import Hero from "../sections/Hero";
import Footer from "../sections/Footer";
import FeatureCardList from "../components/FeatureCardList";
import AuthPage from "../components/AuthPage";

export const Home = () => {
  const [authMode, setAuthMode] = useState(null); // 'login' | 'signup' | null
  const [showAuth, setShowAuth] = useState(false);

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
    <div className="relative flex min-h-screen flex-col">
      <div className="flex-1">
        <NavBar onLoginClick={openLogin} onSignupClick={openSignup} />
        <Hero />
        <FeatureCardList />
      </div>
      <Footer />

      {showAuth && (
        <AuthPage key={authMode} mode={authMode} onClose={closeAuth} />
      )}
    </div>
  );
};

export default Home;
