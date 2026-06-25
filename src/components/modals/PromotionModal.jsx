import { HiOutlineX } from "react-icons/hi";

const PromotionModal = ({ show, onClose, form, setForm, onSubmit, isEdit }) => {
  if (!show) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ 
      ...prev, 
      [name]: type === "checkbox" ? checked : value 
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 border border-gray-100 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {isEdit ? "Edit Promotion" : "Add Promotion"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <HiOutlineX size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Promotion Code</label>
            <input
              type="text"
              name="code"
              required
              value={form.code || ""}
              onChange={handleChange}
              placeholder="e.g. SUMMER2026"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-sm font-mono uppercase"
              style={{ textTransform: 'uppercase' }}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Discount Percentage (%)</label>
            <input
              type="number"
              name="discountPercent"
              required
              min="0"
              max="100"
              step="0.1"
              value={form.discountPercent || ""}
              onChange={handleChange}
              placeholder="e.g. 15"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="activeCheckbox"
              name="active"
              checked={form.active || false}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="activeCheckbox" className="text-sm font-semibold text-gray-700">
              Is Active?
            </label>
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
              {isEdit ? "Save Changes" : "Create Promotion"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromotionModal;
