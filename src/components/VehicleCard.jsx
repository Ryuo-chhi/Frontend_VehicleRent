import React, { useState } from 'react'
import { GiCarKey } from "react-icons/gi";
import VehicleOverlay from './VehicleOverlay.jsx';

function VehicleCard({ vehicle }) {
  const [day, setDay] = useState(1);
  const [open, setOpen] = useState(false);

  const price = vehicle.price || vehicle.rentalRatePerDay || 0;
  const name = vehicle.name || `${vehicle.vehicleBrand || ''} ${vehicle.vehicleModel || ''}`.trim() || vehicle.vehicleCode;
  const image = vehicle.image || null;
  const color = vehicle.color || "#1a9de0";

  const calculateTotal = () => price * day;

  return (
    <>
      <div 
        onClick={() => setOpen(true)} 
        className="cursor-pointer rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:translate-y-1 max-w-sm w-full">

        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div 
              className="w-full h-full flex items-center justify-center transition-transform duration-500 hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${color}22, ${color}44)` }}
            >
              <span className="text-4xl font-black" style={{ color }}>{vehicle.vehicleCode}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="px-4 pt-3 pb-4">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-1" style={{color}}>
            {vehicle.category || vehicle.vehicleClass || "N/A"} · {vehicle.fuelType || vehicle.powerSource || "N/A"}
          </p>
          <h2 className="text-xl font-black tracking-tight text-gray-900 mt-0.5 mb-3">
            {name}
          </h2>

          {/* Price + inventory */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-black text-green-700">${price}</p>
              <p className="text-xs text-gray-400">per day</p>
            </div>
            {/* Show availability from backend if present, otherwise tagCount from static */}
            {vehicle.available !== undefined ? (
              <div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: vehicle.available ? '#16a34a18' : '#dc262618',
                  color: vehicle.available ? '#16a34a' : '#dc2626'
                }}>
                <GiCarKey size={13}/>
                {vehicle.available ? 'Available' : 'Rented'}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                style={{backgroundColor: color + '18', color: color}}>
                <GiCarKey style={{color}} size={13}/>
                {vehicle.tagCount || 0} Left
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <VehicleOverlay
          vehicle={vehicle}
          day={day}
          setDay={setDay}
          calculateTotal={calculateTotal}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}

export default VehicleCard;
