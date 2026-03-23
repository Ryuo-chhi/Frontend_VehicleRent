import React, { useState } from 'react'
import { GiCarKey } from "react-icons/gi";
import CarOverlay from './CarOverlay';

function CarCard({ props }) {
  const [day, setDay] = useState(1);
  const [open, setOpen] = useState(false);
  const calculateTotal = () => props.price * day;

  return (
    <>
      <div 
        onClick={() => setOpen(true)} 
        className="cursor-pointer rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:translate-y-1 max-w-sm w-full">

        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          <img 
            src={props.image} 
            alt={props.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="px-4 pt-3 pb-4">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-1" style={{color: props.color}}>
            {props.category} · {props.fuelType}
          </p>
          <h2 className="text-xl font-black tracking-tight text-gray-900 mt-0.5 mb-3">
            {props.name}
          </h2>

          {/* Price + inventory */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-black text-gray-900">${props.price}</p>
              <p className="text-xs text-gray-400">per day</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full" style={{backgroundColor: props.color + '18', color: props.color}}>
              <GiCarKey style={{color: props.color}} size={13}/>
              {props.tagCount}{props.inventory} Left
            </div> 
          </div>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <CarOverlay 
          props={props}
          day={day}
          setDay={setDay}
          calculateTotal={calculateTotal}
          onClose={() => setOpen(false)}
      />
      )}
    </>
  )
}

export default CarCard;
