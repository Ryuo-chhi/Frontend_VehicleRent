import React from "react";
import { IoCloseOutline } from "react-icons/io5";

function VehicleOverlay({ props, day, setDay, calculateTotal, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Car Image */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={props.image}
            alt={props.name}
            className="w-full h-full object-cover"
          />
          <span
            className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide"
            style={{ backgroundColor: props.color }}
          >
            {props.tag}
          </span>
          <div className="absolute inset-0 bg-linear-to-t from black/60 via-black/10 to-transparent"/>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors"
          >
            <IoCloseOutline className="text-white text-2xl"/>
          </button>
        </div>

        {/* Car Info */}
        <div className="p-5">
          <p className="text-xs font-semibold tracking-widest uppercase mb-0.5" style={{color: props.color}}>{props.category} · {props.name}</p>
          <h2 className="text-2xl font-black tracking-tight">{props.name}</h2>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {[
              { label: "SEATS", value: `${props.seats} Seats` },
              { label: "GEARBOX", value: props.gearbox },
              { label: "LUGGAGE", value: props.luggage },
              { label: "SUPPORT", value: props.support },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 border border-gray-100 rounded-xl p-3 py-2.5">
                <p className="text-[9px] text-gray-400 font-bold tracking-widest uppercase">{item.label}</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Rental info/Policy */}
          <div className="rounded-xl px-4 py-3 mb-5 mt-5 text-xs text-gray-600 leading-relaxed" style={{backgroundColor: props.color + '12', borderLeft: `3px solid ${props.color}`}}>
            <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: props.color }}>IMPORTANT RENTAL INFO</p>
            <p >Valid ID and driving license required. Fuel policy is same-to-same. Security deposit depends on vehicle class.</p>
          </div>

          {/* Price + Days */}
          <div className="flex items-center justify-between mt-6 gap-3">

            <div className="shrink-0">
              <p className="text-[9px] text-gray-400 font-bold tracking-widest uppercase">Estimated Total</p>
              <p 
                className="text-2xl font-black text-green-700">${calculateTotal()}
                <span className="text-xs font-normal text-gray-400 ml-1">/{day}d</span>
             </p>
            </div>

            {/* Day selector */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-2xl px-2 py-1.5 shrink-0">

              <button
                onClick={() => setDay((d) => Math.max(1, d - 1))}
                className="w-7 h-7 rounded-xl bg-white shadow-sm text-gray-500 font-black text-base flex items-center justify-center hover:text-gray-800 transition-colors"
              >
                -
              </button>
              <span>{day}</span>
              <button
                onClick={() => setDay((d) => d + 1)}
                className="w-7 h-7 rounded-xl bg-white shadow-sm text-gray-500 font-black text-base flex items-center justify-center hover:text-gray-800 transition-colors"
              >
                +
              </button>
              <span className="text-[10px] font-bold tracking-widest pl-1 pr-0.5" style={{ color: props.color }}>DAYS</span>
            </div>
            
            {/* Book */}
            <button 
              className="cursor-pointer px-4 py-2.5 rounded-2xl text-white font-bold text-sm tracking-wide hover:opacity-90 active:scale-95 transition-all shrink-0"
              style={{ backgroundColor: props.color }}
            >
              Book Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default VehicleOverlay;