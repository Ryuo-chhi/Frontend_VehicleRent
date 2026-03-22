import { useState } from "react";
import Login from "./Login";
import Signup from "./SignUp";
import { HiOutlineLockClosed, HiOutlineX } from "react-icons/hi";

const AuthPage = ({ mode = "login", onClose }) => {
  const [isLogin, setIsLogin] = useState(mode === "login");

  function switchToSignup(e) {
    e.preventDefault();
    setIsLogin(false);
  }
  function switchToLogin(e) {
    e.preventDefault();
    setIsLogin(true);
  }

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-black/30 px-5 lg:px-10">
      <div className=" w-full sm:w-9/10  lg:w-6/7 h-9/10 flex justify-center items-center rounded-2xl border-2 border-gray-400 relative">
        <div className=" h-8 aspect-square flex justify-center items-center rounded-tr-2xl rounded-bl-2xl cursor-pointer bg-gray-200 hover:bg-gray-300 absolute top-0 right-0 ">
          <button onClick={onClose}>
            <HiOutlineX size={24} style={{ color: "red" }} />
          </button>
        </div>
        <article className=" hidden md:flex flex-col justify-center items-center w-1/2 h-full rounded-tl-2xl rounded-bl-2xl bg-linear-to-br from-[#155DFC]  to-[#1C398E]  text-white">
          <div className="flex flex-col gap-3 items-start">
            <div className=" flex justify-center items-center h-16 aspect-square bg-white/20 rounded-2xl">
              <HiOutlineLockClosed size={38} />
            </div>
            <div className="text-3xl lg:text-4xl xl:text-5xl">
              <h2>Welcome to Our</h2>
              <h2>Platform</h2>
            </div>
            <div className="w-2xs">
              Join thousands of users who trust our services and experience
            </div>
          </div>
        </article>
        {isLogin ? (
          <Login switchToSignup={switchToSignup} />
        ) : (
          <Signup switchToLogin={switchToLogin} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
