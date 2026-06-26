import { useState } from 'react';
import toast from 'react-hot-toast';

const ReturnModal = ({ show, onClose, rental, form, setForm, onSubmit, promotions = [] }) => {
  const [discountType, setDiscountType] = useState('manual');
  const [promoCode, setPromoCode] = useState('');

  if (!show || !rental) return null;

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code");
      return;
    }
    const promo = promotions.find(p => p.code.toLowerCase() === promoCode.toLowerCase());
    if (promo) {
      if (promo.active) {
        const basePrice = (rental.rentDays || 1) * (rental.vehicle?.rentalRatePerDay || 0);
        const discountAmt = basePrice * (promo.discountPercent / 100);
        setForm({ ...form, discount: discountAmt.toFixed(2) });
        toast.success(`Promo applied! ${promo.discountPercent}% off`);
      } else {
        toast.error("This promo code is inactive.");
      }
    } else {
      toast.error("Invalid promo code.");
    }
  };

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
            <div className="col-span-3 border-t border-gray-100 pt-3 mt-1">
              <label className="block text-xs font-semibold text-gray-500 mb-2">Discount Option</label>
              <div className="flex gap-4 mb-3">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" checked={discountType === 'manual'} onChange={() => setDiscountType('manual')} className="text-blue-600" />
                  Manual Amount
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" checked={discountType === 'promo'} onChange={() => setDiscountType('promo')} className="text-blue-600" />
                  Promo Code
                </label>
              </div>

              {discountType === 'manual' ? (
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Discount Amount ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.discount}
                    onChange={(e) => setForm({ ...form, discount: e.target.value })}
                    className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-xl text-sm"
                  />
                </div>
              ) : (
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Enter Promo Code</label>
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="e.g. SUMMER20"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm uppercase"
                    />
                  </div>
                  <button type="button" onClick={handleApplyPromo} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition h-[38px] shrink-0 cursor-pointer">
                    Apply
                  </button>
                  <div className="w-24">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Applied ($)</label>
                    <input type="text" readOnly value={form.discount || 0} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600" />
                  </div>
                </div>
              )}
            </div>
            
            <div className="col-span-3 mt-1">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Damage Fee ($)</label>
              <input
                type="number"
                step="0.01"
                value={form.damageFee}
                onChange={(e) => setForm({ ...form, damageFee: e.target.value })}
                className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-xl text-sm"
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
