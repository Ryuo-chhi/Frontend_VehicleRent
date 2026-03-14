
export const AvailableHour = ({ icon, bgIcon, title, day1, day2, hour1, hour2 }) => {
  return (
    <div className="bg-black min-h-50 p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9.5 h-9.5 flex items-center justify-center rounded-xl" style={{ color: bgIcon }}>
          {icon}
        </div>
        <h3 className="text-white text-lg font-bold">{title}</h3>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-400 text-base mb-0.5 font-semibold">{day1}</span>
        <span className="text-white text-base mb-0.5 font-medium">{hour1}</span>

      </div>  
        <hr className="text-gray-400 text-base mb-0.5"></hr>
      <div className="flex justify-between mt-2">
        <span className="text-gray-400 text-base mb-0.5 font-semibold">{day2}</span>
        <span className="text-white text-base mb-0.5 font-medium">{hour2}</span>
      </div>    
    </div>
  );
};

export default AvailableHour;
