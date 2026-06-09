const ReturnModal = ({ show, onClose, rental, form, setForm, onSubmit }) => {
  if (!show || !rental) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Process Vehicle Return</h2>
        <p className="text-xs text-gray-500 mb-4">Finalize payment and return status for rental #{rental.rentId}</p>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Return Date</label>
              <input
                type="date"
                required
                value={form.payDate}
                onChange={(e) => setForm({ ...form, payDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Payment Method</label>
              <select
                value={form.paymentMethod}
                onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
              >
                <option value="CASH">CASH</option>
                <option value="CARD">CARD</option>
                <option value="ABA">ABA Pay</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Extra Days</label>
              <input
                type="number"
                value={form.extraDays}
                onChange={(e) => setForm({ ...form, extraDays: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Discount ($)</label>
              <input
                type="number"
                step="0.01"
                value={form.discount}
                onChange={(e) => setForm({ ...form, discount: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Damage Fee ($)</label>
              <input
                type="number"
                step="0.01"
                value={form.damageFee}
                onChange={(e) => setForm({ ...form, damageFee: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition cursor-pointer"
            >
              Process Return
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReturnModal;
