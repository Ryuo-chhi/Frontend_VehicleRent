import CarCard from "./CarCard";
import { MOTORCYCLE_DATA } from "../data/motor.js";

const MotorList = () => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 lg:grid-cols-4 mx-auto max-w-6xl px-8">
        {MOTORCYCLE_DATA.map((motorcycle) => (
          <CarCard key={motorcycle.id} props={motorcycle} />
        ))}
      </div>
    </div>
  );
};

export default MotorList;
