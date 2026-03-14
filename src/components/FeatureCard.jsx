export const FeatureCard = ({ icon, bgIcon, title, description }) => {
  const Icon = icon;

  return (
    <div className="bg-white min-h-50 w-80 p-6 rounded-lg shadow-md">
      <div
        className="w-9.5 h-9.5 flex items-center justify-center rounded-xl mb-4"
        style={{ backgroundColor: `${bgIcon}33` }}
      >
        {Icon ? <Icon style={{color: bgIcon}} /> : null}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-0.5">{title}</h3>
        <p className="text-gray-500 text-base">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
