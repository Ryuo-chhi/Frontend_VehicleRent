import Hero from "../sections/Hero";
import FeatureCardList from "../components/FeatureCardList";

export const Home = ({setPage}) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="flex-1">
        <Hero setPage={setPage} />
        <FeatureCardList />
      </div>
    </div>
  );
};

export default Home;
