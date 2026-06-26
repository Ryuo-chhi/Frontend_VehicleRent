import { HiOutlinePlus, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineTrash, HiOutlinePencil, HiOutlineTruck } from "react-icons/hi";
import EmptyState from "./EmptyState";
import SkeletonRows from "./SkeletonRows";
import useTable from "../../hooks/useTable";
import Pagination from "./Pagination";

const VehiclesTab = ({ vehicles, onAddVehicleClick, onEditVehicle, onDeleteVehicle, isLoading, searchQuery }) => {
  const { currentData, requestSort, SortIcon, currentPage, totalPages, goToPage, totalItems } = useTable({
    data: vehicles,
    searchQuery,
    searchFields: ['vehicleCode', 'vehicleBrand', 'vehicleModel', 'vehicleClass', 'licencePlate'],
    itemsPerPage: 10
  });

  const totalVehicles = vehicles.length;
  const availableVehicles = vehicles.filter(v => v.available).length;
  const rentedVehicles = totalVehicles - availableVehicles;

  return (
  <div>
    <div className="flex justify-between items-center mb-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-gray-900">Manage Vehicles</h2>
        {!isLoading && totalVehicles > 0 && (
          <div className="flex gap-2 text-xs font-semibold mt-1">
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md">Total: {totalVehicles}</span>
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md">Available: {availableVehicles}</span>
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-md">Rented: {rentedVehicles}</span>
          </div>
        )}
      </div>
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
            <th className="py-3 px-4 cursor-pointer hover:bg-gray-100" onClick={() => requestSort('vehicleCode')}>Code <SortIcon columnKey="vehicleCode" /></th>
            <th className="py-3 px-4 cursor-pointer hover:bg-gray-100" onClick={() => requestSort('vehicleBrand')}>Brand / Model <SortIcon columnKey="vehicleBrand" /></th>
            <th className="py-3 px-4 cursor-pointer hover:bg-gray-100" onClick={() => requestSort('vehicleClass')}>Class <SortIcon columnKey="vehicleClass" /></th>
            <th className="py-3 px-4 text-right cursor-pointer hover:bg-gray-100" onClick={() => requestSort('rentalRatePerDay')}>Rate/Day <SortIcon columnKey="rentalRatePerDay" /></th>
            <th className="py-3 px-4 cursor-pointer hover:bg-gray-100" onClick={() => requestSort('licencePlate')}>Licence Plate <SortIcon columnKey="licencePlate" /></th>
            <th className="py-3 px-4 cursor-pointer hover:bg-gray-100" onClick={() => requestSort('available')}>Status <SortIcon columnKey="available" /></th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
          {isLoading ? (
            <SkeletonRows columns={7} rows={5} />
          ) : vehicles.length === 0 ? (
            <tr>
              <td colSpan="7">
                <EmptyState
                  icon={HiOutlineTruck}
                  title="No vehicles yet"
                  description="Register your first vehicle to start managing your fleet."
                  actionLabel="Add Vehicle"
                  onAction={onAddVehicleClick}
                />
              </td>
            </tr>
          ) : currentData.length === 0 ? (
            <tr>
              <td colSpan="7" className="py-8 text-center text-gray-500">
                No vehicles match your search.
              </td>
            </tr>
          ) : (
            currentData.map((v) => (
              <tr key={v.vehicleId} className="hover:bg-gray-50 transition-colors">
                <td className="py-3.5 px-4 font-mono font-semibold text-gray-900">{v.vehicleCode}</td>
                <td className="py-3.5 px-4">
                  <span className="font-semibold text-gray-900">{v.vehicleBrand}</span> {v.vehicleModel}
                </td>
                <td className="py-3.5 px-4 capitalize">{v.vehicleClass}</td>
                <td className="py-3.5 px-4 font-semibold text-blue-600 text-right tabular-nums">${v.rentalRatePerDay}</td>
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
                <td className="py-3.5 px-4 text-right flex justify-end gap-2">
                  <button
                    onClick={() => onEditVehicle(v)}
                    className="group relative text-blue-500 hover:text-blue-700 p-1.5 rounded-lg hover:bg-blue-50 transition cursor-pointer"
                    aria-label="Edit vehicle"
                  >
                    <HiOutlinePencil size={18} />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">Edit</span>
                  </button>
                  <button
                    onClick={() => onDeleteVehicle(v.vehicleId)}
                    className="group relative text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition cursor-pointer"
                    aria-label="Delete vehicle"
                  >
                    <HiOutlineTrash size={18} />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">Delete</span>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {!isLoading && currentData.length > 0 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} totalItems={totalItems} itemsPerPage={10} />
      )}
    </div>
  </div>
  );
};

export default VehiclesTab;
