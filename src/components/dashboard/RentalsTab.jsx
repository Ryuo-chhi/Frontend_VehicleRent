import { HiOutlinePlus } from "react-icons/hi";

const RentalsTab = ({ activeRentals, rentalHistory, onNewRentalClick, onReturnClick, isLoading }) => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-gray-900">Active Rentals</h2>
      <button
        onClick={onNewRentalClick}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition cursor-pointer"
      >
        <HiOutlinePlus size={18} />
        New Rental
      </button>
    </div>
    <div className="overflow-x-auto mb-10">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase bg-gray-55/50">
            <th className="py-3 px-4">ID</th>
            <th className="py-3 px-4">Vehicle</th>
            <th className="py-3 px-4">Customer</th>
            <th className="py-3 px-4">Start Date</th>
            <th className="py-3 px-4">Days</th>
            <th className="py-3 px-4">Deposit</th>
            <th className="py-3 px-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
          {isLoading ? (
            <tr>
              <td colSpan="7" className="text-center py-10">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
              </td>
            </tr>
          ) : activeRentals.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-8 text-gray-400">No active rentals found.</td>
            </tr>
          ) : (
            activeRentals.map((r) => (
              <tr key={r.rentId} className="hover:bg-gray-50 transition">
                <td className="py-3.5 px-4 font-mono font-bold text-gray-900">#{r.rentId}</td>
                <td className="py-3.5 px-4">
                  <span className="font-semibold">{r.vehicle?.vehicleBrand}</span> {r.vehicle?.vehicleModel}
                </td>
                <td className="py-3.5 px-4">{r.customer?.customerName}</td>
                <td className="py-3.5 px-4">{r.startDate}</td>
                <td className="py-3.5 px-4">{r.rentDays}</td>
                <td className="py-3.5 px-4 font-semibold text-green-600">${r.payment?.deposit}</td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => onReturnClick(r)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-blue-700 transition cursor-pointer"
                  >
                    Return
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

    <h2 className="text-xl font-bold text-gray-900 mb-6">Rental History</h2>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase bg-gray-55/50">
            <th className="py-3 px-4">Code</th>
            <th className="py-3 px-4">Vehicle Model</th>
            <th className="py-3 px-4">Customer</th>
            <th className="py-3 px-4">Days</th>
            <th className="py-3 px-4">Total Amount</th>
            <th className="py-3 px-4">Payment Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
          {isLoading ? (
            <tr>
              <td colSpan="6" className="text-center py-10">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
              </td>
            </tr>
          ) : rentalHistory.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-8 text-gray-400">No rental history records found.</td>
            </tr>
          ) : (
            rentalHistory.map((h, i) => (
              <tr key={i} className="hover:bg-gray-50 transition">
                <td className="py-3.5 px-4 font-mono">{h.rent?.vehicle?.vehicleCode}</td>
                <td className="py-3.5 px-4">{h.rent?.vehicle?.vehicleModel}</td>
                <td className="py-3.5 px-4">{h.rent?.customer?.customerName}</td>
                <td className="py-3.5 px-4">{h.rent?.rentDays}</td>
                <td className="py-3.5 px-4 font-semibold text-blue-600">${h.totalPaid}</td>
                <td className="py-3.5 px-4">{h.payDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default RentalsTab;
