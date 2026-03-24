
const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 pt-24">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 drop-shadow-md text-center">
        About vehicle
      </h1>
      {/* Card */}
      <div className="bg-white rounded-3xl shadow-xl mt-8 max-w-2xl w-full p-6 sm:p-8 text-center">
        <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
          Founded in 2024, VehicleRent has quickly grown to become the most
          trusted platform for premium vehicle rentals. Our mission is to
          simplify the way you rent, providing a seamless experience from
          booking to drop-off.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
          We believe that luxury should be accessible. That’s why we maintain a
          high-quality fleet at competitive prices, ensuring that you get the
          best value for your journey.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-10 text-center w-full max-w-3xl">
        <div>
          <div className="text-blue-600 text-xl sm:text-2xl font-bold">
            2024
          </div>
          <div className="text-gray-500 text-xs sm:text-sm font-semibold uppercase">
            FOUNED
          </div>
        </div>
        <div>
          <div className="text-blue-600 text-xl sm:text-2xl font-bold">
            150+
          </div>
          <div className="text-gray-500 text-xs sm:text-sm font-semibold uppercase">
            VEHICLES
          </div>
        </div>
        <div>
          <div className="text-blue-600 text-xl sm:text-2xl font-bold">5k+</div>
          <div className="text-gray-500 text-xs sm:text-sm font-semibold uppercase">
            CUSTOMERS
          </div>
        </div>
        <div>
          <div className="text-blue-600 text-xl sm:text-2xl font-bold">12</div>
          <div className="text-gray-500 text-xs sm:text-sm font-semibold uppercase">
            CITIES
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
