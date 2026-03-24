import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Navigation from "../components/Navigation";
import Profile from "../components/Profile";
const NavBar = ({ onLoginClick, onSignupClick, setPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full fixed inset-x-0 z-20 backdrop-blur-md bg-white/60  rounded-b-2xl px-4">
      {/* desktop view */}
      <div className="flex justify-between p-2 sm:px-8 items-center">
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
          <Navigation setPage={setPage}/>
        </nav>
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={onLoginClick}
            className="px-3 py-1 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Login
          </button>
          <button
            onClick={onSignupClick}
            className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Signup
          </button>
          {/* <Profile /> */}
        </div>
      </div>

      {/* mobile view */}

      <div
        className={`w-screen flex justify-center pr-5 overflow-hidden sm:hidden h-fit transition-all duration-500 ${
          isOpen
            ? "max-h-screen opacity-100 "
            : "max-h-0 opacity-0 "
        }`}
        aria-hidden={!isOpen}
      >
        <nav className=" w-full flex flex-col justify-center items-start p-4 gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setIsOpen(false);
                //this ensure and run only if onLoginClick is pass and it not undifined 
                onLoginClick && onLoginClick();
              }}
              className="flex-1 px-3 py-2 rounded-lg border border-blue-600 text-blue-600"
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                //this ensure and run only if onLoginClick is pass and it not undifined 
                onSignupClick && onSignupClick();
              }}
              className="flex-1 px-3 py-2 rounded-lg bg-blue-600 text-white"
            >
              Signup
            </button>
          </div>
          
          <article className="w-full border-b-2 border-gray-400 ">
            {/* <Profile /> */}
          </article>


          <Navigation setPage={setPage} />
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
