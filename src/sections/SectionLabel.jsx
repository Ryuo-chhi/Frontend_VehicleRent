export const SectionLabel = ({ icon, bgIcon, title, available }) => {
  const Icon = icon;

  return (
    <div className="flex items-center justify-between">
      
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

      {available !== undefined && (
        <p className={`text-sm sm:text-base md:text-lg font-bold tracking-wide ${available > 0 ? "text-gray-400" : "text-red-400"}`}>
          {available > 0 ? `${available} AVAILABLE` : "UNAVAILABLE"}
        </p>
      )}

    </div>
  );
};

export default SectionLabel;