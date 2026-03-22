
import { Home } from "./pages/Home";

import About from "./pages/About";

import { Vehicles } from "./pages/Vehicle"; 


const App = () => {
  return (
    <div className="mx-auto">
      <Home />

      <About />

      <Vehicles />

    </div>
  );
};

export default App;
