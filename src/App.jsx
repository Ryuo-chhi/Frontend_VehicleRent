import { useState } from "react";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Footer from "./sections/Footer";
import About from "./pages/About";
import Vehicles from "./pages/Vehicles";
import NavBar from "./sections/NavBar";
import AuthPage from "./components/AuthPage";

const App = () => {
  const [authMode, setAuthMode] = useState(null); // 'login' | 'signup' | null
  const [showAuth, setShowAuth] = useState(false);
  const [page, setPage] = useState("home");
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

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home setPage={setPage} />;
      case "vehicles":
        return <Vehicles isNavOpen={isNavOpen} />;
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
        setIsNavOpen={setIsNavOpen}
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
