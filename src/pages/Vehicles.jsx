import CarList from "../components/CarList";
import MotorList from "../components/MotorList";
import SectionLabel from "../sections/SectionLabel";
import { LuCar } from "react-icons/lu";
import { FaMotorcycle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

export const Vehicles = ({ isNavOpen }) => {
  const [search, setSearch] = useState("");
  return (
    <div className="relative px-8 pb-12">
      {/* Hero */}
      <section className="pt-30 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center  gap-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-gray-900 leading-none sm:text-4xl lg:text-5xl mb-3">
              PREMIUM FLEET
            </h1>
            <p className="text-sm text-gray-400 max-w-xl sm:text-base lg:text-lg">
              Explore our premium collection of luxury, SUV, and compact
              vehicles. All cars are carefully maintained and ready for your
              next journey. Choose the perfect vehicle that fits your style and
              budget.
            </p>
          </div>
          <div
            className={`w-full flex justify-center sticky z-20 ${isNavOpen ? "top-4/11" : "top-1/12"} sm:top-1/12 transition-all duration-600`}
          >
            <div className=" relative w-8/10 backdrop-blur-md bg-white/60 rounded-2xl">
              <button className=" absolute right-0 top-0 rounded-r-2xl  cursor-pointer bg-blue-600 h-full w-1/10 flex justify-center items-center">
                <FiSearch size={24} style={{ color: "white" }} />
              </button>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 border-2 border-gray-400 focus:border-blue-600 outline-none rounded-2xl px-4"
              />
            </div>
          </div>

          <div>
            {/* Car List */}
            <SectionLabel
              icon={LuCar}
              bgIcon="#0D99FF"
              title="Performance Cars"
              available={10}
            />
            <CarList search={search} />
          </div>
          <div>
            {/* Motorcycle List */}
            <SectionLabel
              icon={FaMotorcycle}
              bgIcon="#6f42c1"
              title="Elite Motorcycles"
              available={10}
            />
            <MotorList search={search} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Vehicles;
