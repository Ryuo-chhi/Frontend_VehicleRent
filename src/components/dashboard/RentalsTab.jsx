import { useState } from "react";
import { HiOutlinePlus, HiDotsVertical, HiOutlineClipboardList } from "react-icons/hi";
import EmptyState from "./EmptyState";
import SkeletonRows from "./SkeletonRows";
import useTable from "../../hooks/useTable";
import Pagination from "./Pagination";

const RentalsTab = ({ activeRentals, rentalHistory, onNewRentalClick, onReturnClick, onViewDetails, isLoading, searchQuery }) => {
  const [view, setView] = useState('active');

  const activeTable = useTable({
    data: activeRentals,
    searchQuery,
    searchFields: ['rentId', 'vehicle.vehicleBrand', 'vehicle.vehicleModel', 'customer.customerName'],
    itemsPerPage: 10
  });

  const historyTable = useTable({
    data: rentalHistory,
    searchQuery,
    searchFields: ['rent.vehicle.vehicleCode', 'rent.vehicle.vehicleModel', 'rent.customer.customerName', 'totalPaid'],
    itemsPerPage: 10
  });

  return (
  <div>
    <div className="flex justify-between items-center mb-6">
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
        <button
          onClick={() => setView('active')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
            view === 'active' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Active
          <span className={`ml-1.5 px-1.5 py-0.5 rounded-md text-xs ${
            view === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-500'
          }`}>{activeRentals.length}</span>
        </button>
        <button
          onClick={() => setView('history')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
            view === 'history' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          History
          <span className={`ml-1.5 px-1.5 py-0.5 rounded-md text-xs ${
            view === 'history' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-500'
          }`}>{rentalHistory.length}</span>
        </button>
      </div>
      <button
        onClick={onNewRentalClick}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition cursor-pointer"
      >
        <HiOutlinePlus size={18} />
        New Rental
      </button>
    </div>

    {/* Active Rentals View */}
    {view === 'active' && (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase bg-gray-55/50">
              <th className="py-3 px-4 cursor-pointer hover:bg-gray-100" onClick={() => activeTable.requestSort('rentId')}>ID <activeTable.SortIcon columnKey="rentId" /></th>
              <th className="py-3 px-4 cursor-pointer hover:bg-gray-100" onClick={() => activeTable.requestSort('vehicle.vehicleBrand')}>Vehicle <activeTable.SortIcon columnKey="vehicle.vehicleBrand" /></th>
              <th className="py-3 px-4 cursor-pointer hover:bg-gray-100" onClick={() => activeTable.requestSort('customer.customerName')}>Customer <activeTable.SortIcon columnKey="customer.customerName" /></th>
              <th className="py-3 px-4 cursor-pointer hover:bg-gray-100" onClick={() => activeTable.requestSort('startDate')}>Start Date <activeTable.SortIcon columnKey="startDate" /></th>
              <th className="py-3 px-4 text-right cursor-pointer hover:bg-gray-100" onClick={() => activeTable.requestSort('rentDays')}>Days <activeTable.SortIcon columnKey="rentDays" /></th>
              <th className="py-3 px-4 text-right cursor-pointer hover:bg-gray-100" onClick={() => activeTable.requestSort('payment.deposit')}>Deposit <activeTable.SortIcon columnKey="payment.deposit" /></th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {isLoading ? (
              <SkeletonRows columns={7} rows={4} />
            ) : activeRentals.length === 0 ? (
              <tr>
                <td colSpan="7">
                  <EmptyState
                    icon={HiOutlineClipboardList}
                    title="No active rentals"
                    description="All vehicles are currently available. Create a new rental to get started."
                    actionLabel="New Rental"
                    onAction={onNewRentalClick}
                  />
                </td>
              </tr>
            ) : activeTable.currentData.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-8 text-center text-gray-500">
                  No active rentals match your search.
                </td>
              </tr>
            ) : (
              activeTable.currentData.map((r) => (
                <tr key={r.rentId} className="hover:bg-gray-50 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900">#{r.rentId}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold">{r.vehicle?.vehicleBrand}</span> {r.vehicle?.vehicleModel}
                  </td>
                  <td className="py-3.5 px-4">{r.customer?.customerName}</td>
                  <td className="py-3.5 px-4">{r.startDate}</td>
                  <td className="py-3.5 px-4 text-right tabular-nums">{r.rentDays}</td>
                  <td className="py-3.5 px-4 font-semibold text-green-600 text-right tabular-nums">${r.payment?.deposit}</td>
                  <td className="py-3.5 px-4 text-right flex justify-end items-center gap-2">
                    <button
                      onClick={() => onReturnClick(r)}
                      className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-700 transition cursor-pointer"
                      aria-label="Return vehicle"
                    >
                      Return
                    </button>
                    <button 
                      onClick={() => onViewDetails(r, false)}
                      className="group relative text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition cursor-pointer"
                      aria-label="View rental details"
                    >
                      <HiDotsVertical size={18} />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">Details</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {!isLoading && activeTable.currentData.length > 0 && (
          <Pagination currentPage={activeTable.currentPage} totalPages={activeTable.totalPages} goToPage={activeTable.goToPage} totalItems={activeTable.totalItems} itemsPerPage={10} />
        )}
      </div>
    )}

    {/* History View */}
    {view === 'history' && (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase bg-gray-55/50">
              <th className="py-3 px-4 cursor-pointer hover:bg-gray-100" onClick={() => historyTable.requestSort('rent.vehicle.vehicleCode')}>Code <historyTable.SortIcon columnKey="rent.vehicle.vehicleCode" /></th>
              <th className="py-3 px-4 cursor-pointer hover:bg-gray-100" onClick={() => historyTable.requestSort('rent.vehicle.vehicleModel')}>Vehicle Model <historyTable.SortIcon columnKey="rent.vehicle.vehicleModel" /></th>
              <th className="py-3 px-4 cursor-pointer hover:bg-gray-100" onClick={() => historyTable.requestSort('rent.customer.customerName')}>Customer <historyTable.SortIcon columnKey="rent.customer.customerName" /></th>
              <th className="py-3 px-4 text-right cursor-pointer hover:bg-gray-100" onClick={() => historyTable.requestSort('rent.rentDays')}>Days <historyTable.SortIcon columnKey="rent.rentDays" /></th>
              <th className="py-3 px-4 text-right cursor-pointer hover:bg-gray-100" onClick={() => historyTable.requestSort('totalPaid')}>Total Amount <historyTable.SortIcon columnKey="totalPaid" /></th>
              <th className="py-3 px-4 cursor-pointer hover:bg-gray-100" onClick={() => historyTable.requestSort('payDate')}>Payment Date <historyTable.SortIcon columnKey="payDate" /></th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {isLoading ? (
              <SkeletonRows columns={7} rows={4} />
            ) : rentalHistory.length === 0 ? (
              <tr>
                <td colSpan="7">
                  <EmptyState
                    icon={HiOutlineClipboardList}
                    title="No rental history"
                    description="Completed rentals will appear here once vehicles are returned."
                  />
                </td>
              </tr>
            ) : historyTable.currentData.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-8 text-center text-gray-500">
                  No rental history matches your search.
                </td>
              </tr>
            ) : (
              historyTable.currentData.map((h, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="py-3.5 px-4 font-mono">{h.rent?.vehicle?.vehicleCode}</td>
                  <td className="py-3.5 px-4">{h.rent?.vehicle?.vehicleModel}</td>
                  <td className="py-3.5 px-4">{h.rent?.customer?.customerName}</td>
                  <td className="py-3.5 px-4 text-right tabular-nums">{h.rent?.rentDays}</td>
                  <td className="py-3.5 px-4 font-semibold text-blue-600 text-right tabular-nums">${h.totalPaid}</td>
                  <td className="py-3.5 px-4">{h.payDate}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={() => onViewDetails(h, true)}
                      className="group relative text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition cursor-pointer"
                      aria-label="View history details"
                    >
                      <HiDotsVertical size={18} />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">Details</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {!isLoading && historyTable.currentData.length > 0 && (
          <Pagination currentPage={historyTable.currentPage} totalPages={historyTable.totalPages} goToPage={historyTable.goToPage} totalItems={historyTable.totalItems} itemsPerPage={10} />
        )}
      </div>
    )}
  </div>
  );
};

export default RentalsTab;
