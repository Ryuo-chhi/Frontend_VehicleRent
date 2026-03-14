import NavBar from "./sections/NavBar";
import CarList from "./components/CarList";
import FeatureCardList from "./components/FeatureCardList";

const App = () => {
  return (
    <div className="mx-auto">
        <NavBar />
      <CarList />
      <FeatureCardList />
    </div>
  );
};

export default App;
