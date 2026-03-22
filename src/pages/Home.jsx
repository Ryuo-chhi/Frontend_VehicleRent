import { useState } from "react";
import NavBar from "../sections/NavBar";
import Hero from "../sections/Hero";
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
    <div className=" relative">
      <NavBar onLoginClick={openLogin} onSignupClick={openSignup} />
      <Hero />
      <FeatureCardList />

      {showAuth && (
        <AuthPage key={authMode} mode={authMode} onClose={closeAuth} />
      )}
    </div>
  );
};

export default Home;
