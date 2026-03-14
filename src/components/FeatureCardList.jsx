import featureCardData from "../data/featureCard.js";
import FeatureCard from "./FeatureCard.jsx";

const FeatureCardList = () => {
  return (
    <article className="flex flex-col gap-6">
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
