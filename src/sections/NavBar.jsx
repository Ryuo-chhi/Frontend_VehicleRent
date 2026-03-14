import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Navigation from "../components/Navigation";
import Profile from "../components/Profile";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="w-full fixed inset-x-0 z-20 backdrop-blur-md bg-white/60  rounded-b-2xl">
      <div className="flex justify-between p-2 items-center border-2 ">
        <div className="flex">
          <h1 className="text-blue-600 font-bold text-2xl">VEHICLE</h1>
          <h1 className="font-bold text-2xl">RENT</h1>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex cursor-pointer focus:outline-none sm:hidden"
        >
          {isOpen ? (
            <HiX size={32} style={{ color: "red" }} />
          ) : (
            <HiMenu size={32} />
          )}
        </button>
        <nav className="hidden sm:flex ">
          <Navigation />
        </nav>
        <div className="hidden sm:flex">
          <Profile />
        </div>
      </div>
      <div
        className={`w-screen flex justify-center pr-5 overflow-hidden sm:hidden h-fit transition-all duration-500 ${
          isOpen
            ? "max-h-screen opacity-100 pointer-events-auto"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <nav className=" w-full flex flex-col justify-center items-start p-4 gap-4">
          <article className="w-full border-b-2 border-gray-400 py-2">
            <Profile />
          </article>
          <Navigation />
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
