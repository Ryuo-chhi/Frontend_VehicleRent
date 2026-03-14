import React, { useState } from 'react'

function CarCard({props}) {
    const [day, setDay] = useState(1);
    
    function calculateTotal() {
        return props.price * day;
    }


  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white flex flex-col shadow-lg rounded-2xl overflow-hidden">

        {/* Car Image */}
        <img src={props.image} alt={props.name} className='w-full h-48 sm:h-48 md:h-56 object-cover rounded-t-3xl'/>

        {/* Card Content */}
        <div className='flex flex-col p-4 sm:p-5'>
            <p className='font-sans text-blue-600 text-[10px] sm:text-xs font-semibold uppercase mb-1'>{props.fuelType}</p>
            <h2 className='font-sans text-lg sm:text-xl md:text-2xl font-bold uppercase'>{props.name}</h2>

            {/* Price and Rent Day */}
            <div className='flex flex-row justify-between items-center'>
                <p className='font-sans text-lg sm:text-2xl font-bold text-green-600'>$ {calculateTotal()}</p>
                <div className='flex items-center bg-gray-100 px-2 py-1 rounded-xl gap-2'>
                    <input type='text' className="w-8 bg-transparent text-green-600 font-semibold outline-none text-center"
                        onChange={(e) => setDay(e.target.value)} value={day}
                    />
                    <span className="text-blue-500 font-semibold text-xs sm:text-sm bg-white p-2  rounded-xl ">DAYS</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CarCard;