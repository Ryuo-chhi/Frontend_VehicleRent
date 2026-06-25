import { HiOutlineTrash, HiOutlinePencil, HiOutlinePlus, HiOutlineUserGroup } from "react-icons/hi";
import EmptyState from "./EmptyState";
import SkeletonRows from "./SkeletonRows";

const CustomersTab = ({ customers, onEditCustomer, onDeleteCustomer, onAddCustomer, isLoading }) => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-gray-900">Registered Customers</h2>
      <button
        onClick={onAddCustomer}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition cursor-pointer"
      >
        <HiOutlinePlus size={18} />
        Add Customer
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase bg-gray-55/50">
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Phone Number</th>
            <th className="py-3 px-4">ID Card/Passport</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
          {isLoading ? (
            <SkeletonRows columns={5} rows={5} />
          ) : customers.length === 0 ? (
            <tr>
              <td colSpan="5">
                <EmptyState
                  icon={HiOutlineUserGroup}
                  title="No customers yet"
                  description="Add a customer to begin processing rentals."
                  actionLabel="Add Customer"
                  onAction={onAddCustomer}
                />
              </td>
            </tr>
          ) : (
            customers.map((c) => (
              <tr key={c.customerId} className="hover:bg-gray-50 transition">
                <td className="py-3.5 px-4 font-semibold text-gray-900">{c.customerName}</td>
                <td className="py-3.5 px-4 text-gray-500">{c.email || '—'}</td>
                <td className="py-3.5 px-4 font-mono">{c.customerPhone}</td>
                <td className="py-3.5 px-4 font-mono">{c.customerIdNum}</td>
                <td className="py-3.5 px-4 text-right flex justify-end gap-2">
                  <button
                    onClick={() => onEditCustomer(c)}
                    className="group relative text-blue-500 hover:text-blue-700 p-1.5 rounded-lg hover:bg-blue-50 transition cursor-pointer"
                    aria-label="Edit customer"
                  >
                    <HiOutlinePencil size={18} />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">Edit</span>
                  </button>
                  <button
                    onClick={() => onDeleteCustomer(c.customerId)}
                    className="group relative text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition cursor-pointer"
                    aria-label="Delete customer"
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
    </div>
  </div>
);

export default CustomersTab;
