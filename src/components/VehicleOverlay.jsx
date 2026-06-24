import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import api from "../services/api";

function VehicleOverlay({ vehicle, day, setDay, calculateTotal, onClose }) {
  const isLoggedIn = !!localStorage.getItem("token");
  const isCar = vehicle.vehicleCode?.startsWith("Car");

  const price = vehicle.price || vehicle.rentalRatePerDay || 0;
  const name = vehicle.name || `${vehicle.vehicleBrand || ''} ${vehicle.vehicleModel || ''}`.trim();
  const image = vehicle.image || null;
  const color = vehicle.color || (isCar ? "#1a9de0" : "#6f42c1");

  // Booking flow state
  const [showBooking, setShowBooking] = useState(false);
  const [bookingStep, setBookingStep] = useState("form");
  const [bookingError, setBookingError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [customerForm, setCustomerForm] = useState({
    customerName: "",
    customerIdNum: "",
    customerPhone: "",
  });
  const [registeredCustomerId, setRegisteredCustomerId] = useState(localStorage.getItem("customerId") || null);

  const [bookingForm, setBookingForm] = useState({
    startDate: new Date().toISOString().split("T")[0],
    deposit: 0,
  });

  const computeEndDate = () => {
    const start = new Date(bookingForm.startDate);
    start.setDate(start.getDate() + day);
    return start.toISOString().split("T")[0];
  };

  const handleRegisterCustomer = async (e) => {
    e.preventDefault();
    setBookingError("");

    if (!/^[0-9]{9,10}$/.test(customerForm.customerPhone.replace(/\D/g, ''))) {
      setBookingError("Please enter a valid 9-10 digit phone number.");
      return;
    }

    setSubmitting(true);
    try {
      const customerResponse = await api.post('/customers/register', customerForm);
      const customer = customerResponse.data;
      setRegisteredCustomerId(customer.customerId);
      localStorage.setItem("customerId", customer.customerId);
      setBookingStep("form");
    } catch (err) {
      setBookingError("Failed to register: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBookNow = async (e) => {
    e.preventDefault();
    if (!registeredCustomerId) {
      setBookingStep("register");
      return;
    }
    setBookingError("");
    setSubmitting(true);
    try {
      const staffId = 1;
      const staffUsername = localStorage.getItem("username") || "root_admin";
      await api.post('/rentals', {
        vehicleId: vehicle.vehicleId,
        customerId: registeredCustomerId,
        staffId,
        staffUsername,
        rentDays: day,
        startDate: bookingForm.startDate,
        endDate: computeEndDate(),
        deposit: parseFloat(bookingForm.deposit),
      });
      setBookingStep("success");
    } catch (err) {
      setBookingError("Booking failed: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${color}33, ${color}66)` }}>
              <span className="text-3xl font-black text-white">{vehicle.vehicleCode}</span>
            </div>
          )}
          <span className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide"
            style={{ backgroundColor: color }}>
            {vehicle.tag || (isCar ? "Car" : "Motorcycle")}
          </span>
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent"/>
          <button onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors">
            <IoCloseOutline className="text-white text-2xl"/>
          </button>
        </div>

        {/* Info */}
        <div className="p-5">
          <p className="text-xs font-semibold tracking-widest uppercase mb-0.5" style={{color}}>
            {vehicle.category || vehicle.vehicleClass || "N/A"} · {name}
          </p>
          <h2 className="text-2xl font-black tracking-tight">{name}</h2>

          {/* Specs — uses static fields when available */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {[
              { label: "SEATS", value: `${vehicle.seats || vehicle.numberOfSeats || (isCar ? 4 : 2)} Seats` },
              { label: "GEARBOX", value: vehicle.gearbox || "Automatic" },
              { label: "LUGGAGE", value: vehicle.luggage || "N/A" },
              { label: "SUPPORT", value: vehicle.support || "24/7 Support" },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 border border-gray-100 rounded-xl p-3 py-2.5">
                <p className="text-[9px] text-gray-400 font-bold tracking-widest uppercase">{item.label}</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Rental Policy */}
          <div className="rounded-xl px-4 py-3 mb-5 mt-5 text-xs text-gray-600 leading-relaxed"
            style={{backgroundColor: color + '12', borderLeft: `3px solid ${color}`}}>
            <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color }}>IMPORTANT RENTAL INFO</p>
            <p>Valid ID and driving license required. Fuel policy is same-to-same. Security deposit depends on vehicle class.</p>
          </div>

          {/* Price + Days + Book */}
          {!showBooking && (
            <div className="flex items-center justify-between mt-6 gap-3">
              <div className="shrink-0">
                <p className="text-[9px] text-gray-400 font-bold tracking-widest uppercase">Estimated Total</p>
                <p className="text-2xl font-black text-green-700">${calculateTotal()}
                  <span className="text-xs font-normal text-gray-400 ml-1">/{day}d</span>
                </p>
              </div>
              <div className="flex items-center gap-1 bg-gray-100 rounded-2xl px-2 py-1.5 shrink-0">
                <button onClick={() => setDay((d) => Math.max(1, d - 1))}
                  className="w-7 h-7 rounded-xl bg-white shadow-sm text-gray-500 font-black text-base flex items-center justify-center hover:text-gray-800 transition-colors">-</button>
                <span>{day}</span>
                <button onClick={() => setDay((d) => d + 1)}
                  className="w-7 h-7 rounded-xl bg-white shadow-sm text-gray-500 font-black text-base flex items-center justify-center hover:text-gray-800 transition-colors">+</button>
                <span className="text-[10px] font-bold tracking-widest pl-1 pr-0.5" style={{ color }}>DAYS</span>
              </div>
              <button
                onClick={() => {
                  if (vehicle.available === false) return;
                  setShowBooking(true);
                  if (!localStorage.getItem("customerId") && !registeredCustomerId) {
                    setBookingStep("register");
                  } else {
                    setBookingStep("form");
                  }
                }}
                disabled={vehicle.available === false}
                className={`cursor-pointer px-4 py-2.5 rounded-2xl text-white font-bold text-sm tracking-wide transition-all shrink-0 ${
                  vehicle.available === false ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 active:scale-95'
                }`}
                style={{ backgroundColor: color }}>
                {vehicle.available === false ? 'Unavailable' : 'Book Now'}
              </button>
            </div>
          )}

          {/* === BOOKING FLOW === */}
          {showBooking && (
            <div className="mt-4">
              {bookingStep === "register" && (
                <form onSubmit={handleRegisterCustomer} className="flex flex-col gap-3">
                  <h3 className="text-sm font-bold text-gray-800 mb-1">Customer Information</h3>
                  <input type="text" required placeholder="Full Name" value={customerForm.customerName}
                    onChange={(e) => setCustomerForm({...customerForm, customerName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-500" />
                  <input type="text" required placeholder="ID Card / Passport Number" value={customerForm.customerIdNum}
                    onChange={(e) => setCustomerForm({...customerForm, customerIdNum: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-500" />
                  <input type="text" required placeholder="Phone Number (9-10 digits)" value={customerForm.customerPhone}
                    onChange={(e) => setCustomerForm({...customerForm, customerPhone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-500" />
                  {bookingError && <p className="text-red-500 text-xs">{bookingError}</p>}
                  <div className="flex gap-2">
                    <button type="button" onClick={() => { setShowBooking(false); setBookingStep("form"); }}
                      className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition cursor-pointer">Cancel</button>
                    <button type="submit" disabled={submitting}
                      className="flex-1 px-3 py-2 text-white rounded-xl text-sm font-semibold transition cursor-pointer disabled:opacity-50"
                      style={{ backgroundColor: color }}>{submitting ? "Registering..." : "Continue"}</button>
                  </div>
                </form>
              )}
              {bookingStep === "form" && (
                <form onSubmit={handleBookNow} className="flex flex-col gap-3">
                  <h3 className="text-sm font-bold text-gray-800 mb-1">Confirm Booking</h3>
                  {registeredCustomerId && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-xl text-xs font-medium">
                      ✓ Customer registered (ID: {registeredCustomerId})
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Start Date</label>
                      <input type="date" required value={bookingForm.startDate}
                        onChange={(e) => setBookingForm({...bookingForm, startDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Deposit ($)</label>
                      <input type="number" step="0.01" value={bookingForm.deposit}
                        onChange={(e) => setBookingForm({...bookingForm, deposit: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-500" />
                    </div>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">Vehicle</span><span className="font-semibold">{name}</span></div>
                    <div className="flex justify-between mt-1"><span className="text-gray-500">Duration</span><span className="font-semibold">{day} day{day > 1 ? 's' : ''}</span></div>
                    <div className="flex justify-between mt-1"><span className="text-gray-500">Rate</span><span className="font-semibold">${price}/day</span></div>
                    <hr className="my-2 border-gray-200"/>
                    <div className="flex justify-between"><span className="text-gray-700 font-bold">Estimated Total</span><span className="font-black text-green-700">${calculateTotal()}</span></div>
                  </div>
                  {bookingError && <p className="text-red-500 text-xs">{bookingError}</p>}
                  <div className="flex gap-2">
                    <button type="button" onClick={() => { setShowBooking(false); setBookingStep("form"); }}
                      className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition cursor-pointer">Cancel</button>
                    <button type="submit" disabled={submitting}
                      className="flex-1 px-3 py-2 text-white rounded-xl text-sm font-semibold transition cursor-pointer disabled:opacity-50"
                      style={{ backgroundColor: color }}>{submitting ? "Processing..." : "Confirm Booking"}</button>
                  </div>
                </form>
              )}
              {bookingStep === "success" && (
                <div className="text-center py-4">
                  <div className="text-4xl mb-2">🎉</div>
                  <h3 className="text-lg font-bold text-gray-900">Booking Confirmed!</h3>
                  <p className="text-sm text-gray-500 mt-1">Your rental for {name} has been processed.</p>
                  <button onClick={onClose}
                    className="mt-4 px-6 py-2 text-white rounded-2xl text-sm font-semibold transition cursor-pointer hover:opacity-90"
                    style={{ backgroundColor: color }}>Close</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VehicleOverlay;