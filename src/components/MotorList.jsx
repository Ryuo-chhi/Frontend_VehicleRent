import VehicleCard from "./VehicleCard.jsx";
import { MOTORCYCLE_DATA } from "../data/motor.js";

const MotorList = ({ search }) => {
  const filteredMotors = MOTORCYCLE_DATA.filter((motor) =>
    motor.name.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 lg:grid-cols-4 mx-auto max-w-6xl px-8">
        {filteredMotors.length > 0 ? (
          filteredMotors.map((motorcycle) => (
            <VehicleCard key={motorcycle.id} props={motorcycle} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No motorcycles match your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default MotorList;
