import { useState, useEffect } from "react";
import api from "../../services/api";

const RentModal = ({ show, onClose, form, setForm, onSubmit }) => {
  const [vehicles, setVehicles] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      const fetchOptions = async () => {
        setLoading(true);
        try {
          const [vRes, cRes] = await Promise.all([
            api.get("/vehicles"),
            api.get("/customers")
          ]);
          // Only show available vehicles
          const availableVehicles = vRes.data.filter(v => v.available);
          setVehicles(availableVehicles);
          setCustomers(cRes.data);
          
          // Auto-select first option if none selected
          if (!form.vehicleId && availableVehicles.length > 0) {
            setForm(prev => ({ ...prev, vehicleId: availableVehicles[0].vehicleId }));
          }
          if (!form.customerId && cData.length > 0) {
            setForm(prev => ({ ...prev, customerId: cData[0].customerId }));
          }
        } catch (err) {
          console.error("Failed to fetch rent options", err);
        } finally {
          setLoading(false);
        }
      };
      fetchOptions();
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-gray-100 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Rental</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Vehicle</label>
              <select 
                required 
                value={form.vehicleId}
                onChange={(e) => setForm({...form, vehicleId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                disabled={loading}
              >
                <option value="">Select Vehicle</option>
                {vehicles.map(v => (
                  <option key={v.vehicleId} value={v.vehicleId}>
                    {v.vehicleBrand} {v.vehicleModel} ({v.licencePlate})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Customer</label>
              <select 
                required 
                value={form.customerId}
                onChange={(e) => setForm({...form, customerId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                disabled={loading}
              >
                <option value="">Select Customer</option>
                {customers.map(c => (
                  <option key={c.customerId} value={c.customerId}>
                    {c.customerName} ({c.customerPhone})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Rent Days</label>
              <input type="number" required min="1" value={form.rentDays}
                onChange={(e) => setForm({...form, rentDays: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Start Date</label>
              <input type="date" required value={form.startDate}
                onChange={(e) => setForm({...form, startDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">End Date</label>
              <input type="date" required value={form.endDate}
                onChange={(e) => setForm({...form, endDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Deposit ($)</label>
            <input type="number" step="0.01" value={form.deposit}
              onChange={(e) => setForm({...form, deposit: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm" />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition cursor-pointer">Cancel</button>
            <button type="submit" disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition cursor-pointer disabled:bg-blue-400">Create Rental</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RentModal;
