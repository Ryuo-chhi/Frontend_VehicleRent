import { HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineTrash, HiOutlinePencil, HiOutlinePlus, HiOutlineUsers } from "react-icons/hi";
import EmptyState from "./EmptyState";
import SkeletonRows from "./SkeletonRows";

const StaffTab = ({ staffList, onEditStaff, onDeleteStaff, onAddStaff, isLoading }) => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-gray-900">Staff Management</h2>
      <button onClick={onAddStaff} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition cursor-pointer">
        <HiOutlinePlus size={18} /> Add Staff
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase bg-gray-55/50">
            <th className="py-3 px-4">ID</th>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Username</th>
            <th className="py-3 px-4">Role</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
          {isLoading ? (
            <SkeletonRows columns={6} rows={4} />
          ) : staffList.length === 0 ? (
            <tr><td colSpan="6">
              <EmptyState icon={HiOutlineUsers} title="No staff members" description="Add your first team member to manage operations." actionLabel="Add Staff" onAction={onAddStaff} />
            </td></tr>
          ) : (
            staffList.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 transition">
                <td className="py-3.5 px-4 font-mono font-bold">#{s.id}</td>
                <td className="py-3.5 px-4 font-semibold text-gray-900">{s.name}</td>
                <td className="py-3.5 px-4 font-mono">{s.username}</td>
                <td className="py-3.5 px-4">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${s.role === "MANAGER" ? "bg-purple-100 text-purple-800" : s.role === "REGULAR" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}>{s.role}</span>
                </td>
                <td className="py-3.5 px-4">
                  {s.active ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><HiOutlineCheckCircle /> Online</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600"><HiOutlineXCircle /> Offline</span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-right flex justify-end gap-2">
                  <button onClick={() => onEditStaff(s)} className="group relative text-blue-500 hover:text-blue-700 p-1.5 rounded-lg hover:bg-blue-50 transition cursor-pointer" aria-label="Edit staff member">
                    <HiOutlinePencil size={18} />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">Edit</span>
                  </button>
                  <button onClick={() => onDeleteStaff(s.id)} className="group relative text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition cursor-pointer" aria-label="Delete staff member">
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

export default StaffTab;
