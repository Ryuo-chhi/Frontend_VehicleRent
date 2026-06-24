import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";

const CustomersTab = ({ customers, onEditCustomer, onDeleteCustomer, isLoading }) => (
  <div>
    <h2 className="text-xl font-bold text-gray-900 mb-6">Registered Customers</h2>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase bg-gray-55/50">
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Phone Number</th>
            <th className="py-3 px-4">ID Card/Passport</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
          {isLoading ? (
            <tr>
              <td colSpan="4" className="text-center py-10">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
              </td>
            </tr>
          ) : customers.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-8 text-gray-400">No customers registered yet.</td>
            </tr>
          ) : (
            customers.map((c) => (
              <tr key={c.customerId} className="hover:bg-gray-50 transition">
                <td className="py-3.5 px-4 font-semibold text-gray-900">{c.customerName}</td>
                <td className="py-3.5 px-4 font-mono">{c.customerPhone}</td>
                <td className="py-3.5 px-4 font-mono">{c.customerIdNum}</td>
                <td className="py-3.5 px-4 text-right flex justify-end gap-2">
                  <button
                    onClick={() => onEditCustomer(c)}
                    className="text-blue-500 hover:text-blue-700 p-1 rounded transition cursor-pointer"
                  >
                    <HiOutlinePencil size={18} />
                  </button>
                  <button
                    onClick={() => onDeleteCustomer(c.customerId)}
                    className="text-red-500 hover:text-red-700 p-1 rounded transition cursor-pointer"
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

export default CustomersTab;
