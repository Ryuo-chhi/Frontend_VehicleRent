import CarList from "../components/CarList";
import MotorList from "../components/MotorList";
import SectionLabel from "../sections/SectionLabel";
import { LuCar } from "react-icons/lu";
import { FaMotorcycle } from "react-icons/fa";

export const Vehicles = () => {
  return (
    <div className="relative px-8 pb-12">
      {/* Hero */}
      <section className="pt-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black tracking-tight text-gray-900 leading-none sm:text-4xl lg:text-5xl mb-3">
            PREMIUM FLEET
          </h1>
          <p className="text-sm text-gray-400 max-w-xl sm:text-base lg:text-lg">
            Explore our premium collection of luxury, SUV, and compact vehicles.
            All cars are carefully maintained and ready for your next journey.
            Choose the perfect vehicle that fits your style and budget.
          </p>

          {/* Car List */}
          <SectionLabel
            icon={LuCar}
            bgIcon="#0D99FF"
            title="Performance Cars"
            available={10}
          />
          <CarList />

          {/* Motorcycle List */}
          <SectionLabel
            icon={FaMotorcycle}
            bgIcon="#6f42c1"
            title="Elite Motorcycles"
            available={10}
          />
          <MotorList />
        </div>
      </section>
    </div>
  );
};

export default Vehicles;
