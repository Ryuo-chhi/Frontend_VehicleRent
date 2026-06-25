import { HiOutlineX } from "react-icons/hi";

const RentalDetailsModal = ({ show, onClose, rental, isHistory, onNavigateToCustomer, onNavigateToVehicle }) => {
  if (!show || !rental) return null;

  // For history, the rental details are inside rental.rent.
  // For active rentals, the rental object itself has the details.
  const r = isHistory ? rental.rent : rental;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 border border-gray-100 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Rental Details <span className="text-gray-500 font-mono text-base">#{r?.rentId}</span>
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <HiOutlineX size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* General Info */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">General Information</h3>
            <div className="space-y-2 text-sm">
              <p className="flex justify-between"><span className="text-gray-500">Status:</span> <span className="font-semibold text-gray-900">{isHistory ? 'Completed' : 'Active'}</span></p>
              <p className="flex justify-between"><span className="text-gray-500">Start Date:</span> <span className="font-semibold text-gray-900">{r?.startDate}</span></p>
              <p className="flex justify-between"><span className="text-gray-500">Expected End:</span> <span className="font-semibold text-gray-900">{r?.endDate}</span></p>
              <p className="flex justify-between"><span className="text-gray-500">Rent Days:</span> <span className="font-semibold text-gray-900">{r?.rentDays}</span></p>
              <p className="flex justify-between"><span className="text-gray-500">Staff Handled:</span> <span className="font-semibold text-gray-900">{r?.staff?.name || 'Unknown'}</span></p>
            </div>
          </div>

          {/* Financial Info */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">Financial Breakdown</h3>
            <div className="space-y-2 text-sm">
              {isHistory ? (
                <>
                  <p className="flex justify-between"><span className="text-gray-500">Payment Method:</span> <span className="font-semibold text-gray-900">{rental.paymentMethod}</span></p>
                  <p className="flex justify-between"><span className="text-gray-500">Base Price:</span> <span className="font-semibold text-gray-900">${rental.price}</span></p>
                  <p className="flex justify-between p-2 bg-green-50 rounded-lg -mx-2"><span className="text-gray-600">Discount:</span> <span className="font-semibold text-green-600">-${rental.discount}</span></p>
                  <p className="flex justify-between p-2 bg-red-50 rounded-lg -mx-2"><span className="text-gray-600">Extra Days Fee:</span> <span className="font-semibold text-red-600">+${rental.price / r.rentDays * rental.extraDays} ({rental.extraDays} days)</span></p>
                  <p className="flex justify-between p-2 bg-red-50 rounded-lg -mx-2"><span className="text-gray-600">Damage Fee:</span> <span className="font-semibold text-red-600">+${rental.damageFee}</span></p>
                  <div className="pt-2 mt-2 border-t border-gray-200">
                    <p className="flex justify-between font-bold text-base"><span className="text-gray-900">Total Paid:</span> <span className="text-blue-600">${rental.totalPaid}</span></p>
                  </div>
                </>
              ) : (
                <>
                  <p className="flex justify-between"><span className="text-gray-500">Deposit Paid:</span> <span className="font-semibold text-green-600">${r?.payment?.deposit}</span></p>
                  <p className="flex justify-between"><span className="text-gray-500">Daily Rate:</span> <span className="font-semibold text-gray-900">${r?.vehicle?.rentalRatePerDay}/day</span></p>
                  <p className="flex justify-between"><span className="text-gray-500">Estimated Total:</span> <span className="font-semibold text-gray-900">${r?.rentDays * r?.vehicle?.rentalRatePerDay}</span></p>
                </>
              )}
            </div>
          </div>

          {/* Customer Section */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">Customer Details</h3>
              <div className="space-y-2 text-sm mb-4">
                <p className="flex justify-between"><span className="text-gray-500">Name:</span> <span className="font-semibold text-gray-900">{r?.customer?.customerName}</span></p>
                <p className="flex justify-between"><span className="text-gray-500">Phone:</span> <span className="font-semibold text-gray-900 font-mono">{r?.customer?.customerPhone}</span></p>
                <p className="flex justify-between"><span className="text-gray-500">ID/Passport:</span> <span className="font-semibold text-gray-900 font-mono">{r?.customer?.customerIdNum}</span></p>
              </div>
            </div>
            <button 
              onClick={() => onNavigateToCustomer(r?.customer)}
              className="w-full py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg text-sm font-semibold transition cursor-pointer"
            >
              View Full Profile
            </button>
          </div>

          {/* Vehicle Section */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">Vehicle Details</h3>
              <div className="space-y-2 text-sm mb-4">
                <p className="flex justify-between"><span className="text-gray-500">Model:</span> <span className="font-semibold text-gray-900">{r?.vehicle?.vehicleBrand} {r?.vehicle?.vehicleModel}</span></p>
                <p className="flex justify-between"><span className="text-gray-500">Plate:</span> <span className="font-semibold text-gray-900 font-mono">{r?.vehicle?.licencePlate}</span></p>
                <p className="flex justify-between"><span className="text-gray-500">Class:</span> <span className="font-semibold text-gray-900 capitalize">{r?.vehicle?.vehicleClass}</span></p>
              </div>
            </div>
            <button 
              onClick={() => onNavigateToVehicle(r?.vehicle)}
              className="w-full py-2 bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg text-sm font-semibold transition cursor-pointer"
            >
              Manage Vehicle
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RentalDetailsModal;
