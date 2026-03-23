export const SectionLabel = ({ icon, bgIcon, title, available }) => {
  const Icon = icon;

  return (
    <div className="flex items-center justify-between mt-14">
      
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 flex items-center justify-center rounded-xl"
          style={{ backgroundColor: `${bgIcon}33` }}
        >
          {Icon ? <Icon style={{ color: bgIcon }} /> : null}
        </div>

        <h3 className="text-lg sm:text-xl font-semibold">
          {title}
        </h3>
      </div>

      {available && (
        <p className="text-sm sm:text-base md:text-lg text-gray-400 font-bold tracking-wide">
          {available} AVAILABLE
        </p>
      )}

    </div>
  );
};

export default SectionLabel;