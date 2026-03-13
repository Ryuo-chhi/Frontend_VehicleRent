import CarCard from "./CarCard";
import { CAR_DATA } from "../datas/carCard.js";

const CarList = () => {
  return (
    <div>
      {CAR_DATA.map((car) => (
        <CarCard key={car.id} props={car} />
      ))}
    </div>
  );
};

export default CarList;
