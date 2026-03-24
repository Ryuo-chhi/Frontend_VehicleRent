const AboutStat = ({ value, label }) => {
  return (
    <div>
      <div className="text-blue-600 text-xl sm:text-2xl font-bold">{value}</div>
      <div className="text-gray-500 text-xs sm:text-sm font-semibold uppercase">
        {label}
      </div>
    </div>
  );
};

export default AboutStat;
