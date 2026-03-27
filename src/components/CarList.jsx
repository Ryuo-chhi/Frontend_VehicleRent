import VehicleCard from "./VehicleCard.jsx";
import { CAR_DATA } from "../data/carCard.js";

const CarList = ({ search }) => {
  const filteredCars = CAR_DATA.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 lg:grid-cols-4 mx-auto max-w-6xl px-8">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => <VehicleCard key={car.id} props={car} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No cars match your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default CarList;
