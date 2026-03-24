import React from "react";
import Button from "../components/Button";

export const Hero = ({ setPage }) => {
  return (
    <div className="pt-25 flex flex-col items-center justify-center">
      <div className="text-4xl font-bold ">
        Drive Your
        <span className="bg-linear-to-tr from-sky-600 to-blue-900 bg-clip-text text-transparent">
          {" "}
          Dreams
        </span>
      </div>
      <div className="text-center px-4 pt-2 text-gray-700 max-w-xl">
        Experience the ultimate freedom with our premium vehicle rental service.
        From sleek sedans to rugged SUVs, we have the perfect ride for every
        journey.
      </div>
      <div className="pt-8 gap-6 flex flex-col items-center justify-center">
        <Button
          variant="cta"
          label="Browse Vehicles"
          onClick={(e) => {
            e.preventDefault();
            if (typeof setPage === "function") setPage("vehicles");
          }}
        />
        <Button variant="learnMore" label="Learn More" />
      </div>
    </div>
  );
};

export default Hero;
