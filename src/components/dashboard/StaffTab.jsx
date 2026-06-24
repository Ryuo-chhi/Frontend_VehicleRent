import { HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";

const StaffTab = ({ staffList, onEditStaff, onDeleteStaff, isLoading }) => (
  <div>
    <h2 className="text-xl font-bold text-gray-900 mb-6">Staff Management</h2>
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
            <tr>
              <td colSpan="6" className="text-center py-10">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
              </td>
            </tr>
          ) : staffList.length === 0 ? (
            <tr><td colSpan="6" className="text-center py-8 text-gray-400">No staff members found.</td></tr>
          ) : (
            staffList.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 transition">
                <td className="py-3.5 px-4 font-mono font-bold">#{s.id}</td>
                <td className="py-3.5 px-4 font-semibold text-gray-900">{s.name}</td>
                <td className="py-3.5 px-4 font-mono">{s.username}</td>
                <td className="py-3.5 px-4">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    s.role === "MANAGER" ? "bg-purple-100 text-purple-800" : s.role === "REGULAR" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                  }`}>{s.role}</span>
                </td>
                <td className="py-3.5 px-4">
                  {s.active ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><HiOutlineCheckCircle /> Online</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600"><HiOutlineXCircle /> Offline</span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-right flex justify-end gap-2">
                  <button
                    onClick={() => onEditStaff(s)}
                    className="text-blue-500 hover:text-blue-700 p-1 rounded transition cursor-pointer"
                  >
                    <HiOutlinePencil size={18} />
                  </button>
                  <button
                    onClick={() => onDeleteStaff(s.id)}
                    className="text-red-500 hover:text-red-700 p-1 rounded transition cursor-pointer"
                  ><HiOutlineTrash size={18} /></button>
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
