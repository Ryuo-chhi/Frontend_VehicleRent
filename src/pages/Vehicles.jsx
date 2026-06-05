import VehicleGrid from "../components/VehicleGrid";
import SectionLabel from "../sections/SectionLabel";
import { LuCar } from "react-icons/lu";
import { FaMotorcycle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { api } from "../utils/api";
import { CAR_DATA } from "../data/carCard";
import { MOTORCYCLE_DATA } from "../data/motor";

// Build a lookup map from static data keyed by vehicleCode (id field)
const STATIC_MAP = {};
CAR_DATA.forEach((c) => { STATIC_MAP[c.id] = c; });
MOTORCYCLE_DATA.forEach((m) => { STATIC_MAP[m.id] = m; });

// Merge a backend vehicle with its matching static entry
// Combines backend live state with static images/UI tags using a fast dictionary lookup
const enrichVehicle = (backendVehicle) => {
  const staticEntry = STATIC_MAP[backendVehicle.vehicleCode] || {};
  return {
    // Static data as base (image, gearbox, luggage, support, tag, tagCount, color, etc.)
    ...staticEntry,
    // Backend data overwrites shared fields (id comes from backend as vehicleId)
    ...backendVehicle,
    // Computed display fields — prefer backend values, fallback to static
    name: `${backendVehicle.vehicleBrand || ''} ${backendVehicle.vehicleModel || ''}`.trim() || staticEntry.name || backendVehicle.vehicleCode,
    price: backendVehicle.rentalRatePerDay ?? staticEntry.price ?? 0,
    category: backendVehicle.vehicleClass || staticEntry.category || "N/A",
    fuelType: backendVehicle.powerSource || staticEntry.fuelType || "N/A",
    image: staticEntry.image || null,
    color: staticEntry.color || (backendVehicle.vehicleCode?.startsWith("Car") ? "#1a9de0" : "#6f42c1"),
    seats: backendVehicle.numberOfSeats || staticEntry.seats || (backendVehicle.vehicleCode?.startsWith("Car") ? 4 : 2),
    gearbox: staticEntry.gearbox || "Automatic",
    luggage: staticEntry.luggage || "N/A",
    support: staticEntry.support || "24/7 Support",
    tag: staticEntry.tag || (backendVehicle.vehicleCode?.startsWith("Car") ? "Performance Cars" : "Motorcycles"),
    tagCount: staticEntry.tagCount || 0,
  };
};

export const Vehicles = ({ isNavOpen }) => {
  const [search, setSearch] = useState("");
  const [cars, setCars] = useState([]);
  const [motos, setMotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await api.getVehicles();
        const enriched = data.map(enrichVehicle);
        setCars(enriched.filter((v) => v.vehicleCode?.startsWith("Car")));
        setMotos(enriched.filter((v) => v.vehicleCode?.startsWith("Moto")));
      } catch (err) {
        console.error("Failed to fetch vehicles:", err);
        // Fallback: show static data if backend is down
        setCars(CAR_DATA.map((c) => ({ ...c, vehicleCode: c.id, name: c.name, price: c.price, available: true })));
        setMotos(MOTORCYCLE_DATA.map((m) => ({ ...m, vehicleCode: m.id, name: m.name, price: m.price, available: true })));
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const availableCars = cars.filter((c) => c.available).length;
  const availableMotos = motos.filter((m) => m.available).length;

  return (
    <div className="relative px-8 pb-12">
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
                placeholder="Search vehicles..."
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div>
                <SectionLabel
                  icon={LuCar}
                  bgIcon="#0D99FF"
                  title="Performance Cars"
                  available={availableCars}
                />
                <VehicleGrid vehicles={cars} search={search} emptyMessage="No cars match your search." />
              </div>
              <div>
                <SectionLabel
                  icon={FaMotorcycle}
                  bgIcon="#6f42c1"
                  title="Elite Motorcycles"
                  available={availableMotos}
                />
                <VehicleGrid vehicles={motos} search={search} emptyMessage="No motorcycles match your search." />
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Vehicles;
