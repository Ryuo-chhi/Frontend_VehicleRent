import { HiOutlinePlus, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineTrash } from "react-icons/hi";

const VehiclesTab = ({ vehicles, onAddVehicleClick, onDeleteVehicle, isLoading }) => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-gray-900">Manage Vehicles</h2>
      <button
        onClick={onAddVehicleClick}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition cursor-pointer"
      >
        <HiOutlinePlus size={18} />
        Add Vehicle
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-55/50">
            <th className="py-3 px-4">Code</th>
            <th className="py-3 px-4">Brand / Model</th>
            <th className="py-3 px-4">Class</th>
            <th className="py-3 px-4">Rate/Day</th>
            <th className="py-3 px-4">Licence Plate</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
          {isLoading ? (
            <tr>
              <td colSpan="7" className="text-center py-10">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
              </td>
            </tr>
          ) : vehicles.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-8 text-gray-400">
                No vehicles found. Click "Add Vehicle" to register one.
              </td>
            </tr>
          ) : (
            vehicles.map((v) => (
              <tr key={v.vehicleId} className="hover:bg-gray-50 transition-colors">
                <td className="py-3.5 px-4 font-mono font-semibold text-gray-900">{v.vehicleCode}</td>
                <td className="py-3.5 px-4">
                  <span className="font-semibold text-gray-900">{v.vehicleBrand}</span> {v.vehicleModel}
                </td>
                <td className="py-3.5 px-4 capitalize">{v.vehicleClass}</td>
                <td className="py-3.5 px-4 font-semibold text-blue-600">${v.rentalRatePerDay}</td>
                <td className="py-3.5 px-4 font-mono">{v.licencePlate}</td>
                <td className="py-3.5 px-4">
                  {v.available ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <HiOutlineCheckCircle /> Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <HiOutlineXCircle /> Rented
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => onDeleteVehicle(v.vehicleId)}
                    className="text-red-500 hover:text-red-700 p-1 rounded transition cursor-pointer"
                    title="Delete Vehicle"
                  >
                    <HiOutlineTrash size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default VehiclesTab;
