import VehicleCard from "./VehicleCard.jsx";

const VehicleGrid = ({ vehicles, search, emptyMessage = "No vehicles match your search." }) => {
  const filteredVehicles = vehicles.filter((vehicle) => {
    const name = (vehicle.name || `${vehicle.vehicleBrand || ""} ${vehicle.vehicleModel || ""}`).toLowerCase();
    return name.includes(search.toLowerCase());
  });

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 lg:grid-cols-4 mx-auto max-w-6xl px-8">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.vehicleId} vehicle={vehicle} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            {emptyMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default VehicleGrid;
