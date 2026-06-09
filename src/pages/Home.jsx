import Hero from "../sections/Hero";
import FeatureCardList from "../components/FeatureCardList";

export const Home = () => {
  return (
    <div className="relative flex flex-col">
      <div className="flex-1">
        <Hero />
        <FeatureCardList />
      </div>
    </div>
  );
};

export default Home;
