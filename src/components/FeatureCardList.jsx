import featureCardData from "../data/featureCard.js";
import FeatureCard from "./FeatureCard.jsx";

const FeatureCardList = () => {
  return (
    <article className="grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-6xl px-4">
      {featureCardData.map((card) => (
        <FeatureCard
          key={card.id}
          icon={card.icon}
          bgIcon={card.bgIcon}
          title={card.title}
          description={card.description}
        />
      ))}
    </article>
  );
};

export default FeatureCardList;
