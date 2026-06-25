import { HiOutlineX } from "react-icons/hi";

const MaintenanceModal = ({ show, onClose, form, setForm, onSubmit, isEdit }) => {
  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-gray-100 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {isEdit ? "Edit Maintenance Record" : "Add Maintenance Record"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <HiOutlineX size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {!isEdit && (
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Vehicle ID</label>
              <input
                type="number"
                name="vehicleId"
                required
                value={form.vehicleId || ""}
                onChange={handleChange}
                placeholder="e.g. 5"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Details</label>
            <textarea
              name="details"
              required
              value={form.details || ""}
              onChange={handleChange}
              placeholder="e.g. Oil change and tire rotation"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Cost ($)</label>
              <input
                type="number"
                name="cost"
                required
                min="0"
                step="0.01"
                value={form.cost || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
            {isEdit && (
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Status</label>
                <select
                  name="status"
                  required
                  value={form.status || "ONGOING"}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="ONGOING">Ongoing</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                required
                value={form.startDate || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
            {isEdit && (
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            )}
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition"
            >
              {isEdit ? "Save Changes" : "Create Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MaintenanceModal;
