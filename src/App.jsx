import { useState } from "react";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Footer from "./sections/Footer";
import About from "./pages/About";
import Vehicles from "./pages/Vehicles";
import NavBar from "./sections/NavBar";

const App = () => {
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

export default App;
