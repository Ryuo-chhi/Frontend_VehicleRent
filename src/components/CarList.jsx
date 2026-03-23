import CarCard from "./CarCard";
import { CAR_DATA } from "../data/carCard.js";

const CarList = () => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 lg:grid-cols-4 mx-auto max-w-6xl px-8">
        {CAR_DATA.map((car) => (
          <CarCard key={car.id} props={car} />
        ))}
      </div>
    </div>
  );
};

export default CarList;
