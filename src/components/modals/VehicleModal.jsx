const VehicleModal = ({ show, onClose, form, setForm, onSubmit }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-gray-100 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Vehicle</h2>
        
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Vehicle Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
            >
              <option value="Car">Car</option>
              <option value="Moto">Moto</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Brand</label>
              <input
                type="text"
                required
                placeholder="Toyota"
                value={form.vehicleBrand}
                onChange={(e) => setForm({ ...form, vehicleBrand: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Model</label>
              <input
                type="text"
                required
                placeholder="Prius"
                value={form.vehicleModel}
                onChange={(e) => setForm({ ...form, vehicleModel: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Class/Style</label>
              <input
                type="text"
                required
                placeholder="SUV / Sedan"
                value={form.vehicleClass}
                onChange={(e) => setForm({ ...form, vehicleClass: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Power Source</label>
              <select
                value={form.powerSource}
                onChange={(e) => setForm({ ...form, powerSource: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
              >
                <option value="gasoline">Gasoline</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Rental Rate / Day ($)</label>
              <input
                type="number"
                required
                placeholder="35"
                value={form.rentalRatePerDay}
                onChange={(e) => setForm({ ...form, rentalRatePerDay: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Licence Type Required</label>
              <input
                type="text"
                required
                placeholder="B1"
                value={form.vehicleLicence}
                onChange={(e) => setForm({ ...form, vehicleLicence: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Licence Plate</label>
            <input
              type="text"
              required
              placeholder="PP-1A-9999"
              value={form.licencePlate}
              onChange={(e) => setForm({ ...form, licencePlate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
            />
          </div>

          {form.type === "Car" ? (
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Number of Seats</label>
              <input
                type="number"
                required
                value={form.numberOfSeats}
                onChange={(e) => setForm({ ...form, numberOfSeats: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2 py-2">
              <input
                type="checkbox"
                id="helmetIncluded"
                checked={form.helmetIncluded}
                onChange={(e) => setForm({ ...form, helmetIncluded: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="helmetIncluded" className="text-sm font-medium text-gray-700">Helmet Included</label>
            </div>
          )}

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
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition cursor-pointer"
            >
              Save Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleModal;
