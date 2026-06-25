import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus, HiOutlineCog } from "react-icons/hi";
import EmptyState from "./EmptyState";
import SkeletonRows from "./SkeletonRows";

const MaintenanceTab = ({ maintenanceRecords, onAddClick, onEditClick, onDeleteClick, isLoading }) => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-gray-900">Maintenance Records</h2>
      <button onClick={onAddClick} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition cursor-pointer">
        <HiOutlinePlus size={18} /> New Record
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase bg-gray-55/50">
            <th className="py-3 px-4">ID</th>
            <th className="py-3 px-4">Vehicle ID</th>
            <th className="py-3 px-4">Details</th>
            <th className="py-3 px-4 text-right">Cost</th>
            <th className="py-3 px-4">Start</th>
            <th className="py-3 px-4">End</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
          {isLoading ? (
            <SkeletonRows columns={8} rows={4} />
          ) : maintenanceRecords.length === 0 ? (
            <tr><td colSpan="8">
              <EmptyState icon={HiOutlineCog} title="All clear!" description="No maintenance records. Your fleet is running smooth." actionLabel="New Record" onAction={onAddClick} />
            </td></tr>
          ) : (
            maintenanceRecords.map((m) => (
              <tr key={m.maintenanceId} className="hover:bg-gray-50 transition">
                <td className="py-3.5 px-4 font-mono font-bold">#{m.maintenanceId}</td>
                <td className="py-3.5 px-4">{m.vehicleId}</td>
                <td className="py-3.5 px-4">{m.details}</td>
                <td className="py-3.5 px-4 font-semibold text-blue-600 text-right tabular-nums">${m.cost}</td>
                <td className="py-3.5 px-4">{m.startDate}</td>
                <td className="py-3.5 px-4">{m.endDate}</td>
                <td className="py-3.5 px-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${m.status === "COMPLETED" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{m.status}</span>
                </td>
                <td className="py-3.5 px-4 text-right flex justify-end gap-2">
                  <button onClick={() => onEditClick(m)} className="group relative text-blue-500 hover:text-blue-700 p-1.5 rounded-lg hover:bg-blue-50 transition cursor-pointer" aria-label="Edit maintenance record">
                    <HiOutlinePencil size={18} />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">Edit</span>
                  </button>
                  <button onClick={() => onDeleteClick(m.maintenanceId)} className="group relative text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition cursor-pointer" aria-label="Delete maintenance record">
                    <HiOutlineTrash size={18} />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">Delete</span>
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

export default MaintenanceTab;
