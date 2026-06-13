import { useState } from "react";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";

import InputWithIcon from "./InputWithIcon";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";

const Login = ({ switchToSignup, onClose }) => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "", // Accepts email or staff username
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  //handle input change
  function handleChange(e) {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  }

  //validation
  function validate() {
    let newErrors = {};
    if (!form.email.trim()) {
      newErrors.email = "Email Address or Username is required";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError("");
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const identifier = form.email.trim();
        const isEmail = identifier.includes("@");

        const credentials = isEmail
          ? { email: identifier, password: form.password }
          : { username: identifier, password: form.password };

        // Smart routing: if it contains @, route as customer; otherwise, route as staff
        await login(credentials, isEmail ? 'customer' : 'staff');
        onClose?.(); // Close the login modal
      } catch (error) {
        setApiError(error.response?.data || error.message || "Login failed");
        console.log("Login failed", error);
      }
    }
  }

  return (
    <article
      className="w-full h-full md:w-1/2 flex flex-col justify-center items-center p-3 gap-6 sm:px-4 lg:px-8 xl:px-10  bg-white md:rounded-tr-2xl md:rounded-br-2xl md:rounded-tl-none md:rounded-bl-none
 rounded-2xl transition-all duration-300"
    >
      <div className="text-center">
        <h2 className="font-bold text-2xl my-1">Login</h2>
        <p className="text-gray-400 text-sm">
          Enter your credentials to access your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div>
          <p className="text-sm font-medium mb-1">Email Address</p>
          <InputWithIcon
            icon={HiOutlineMail}
            type="text"
            name="email"
            placeholder="you@email.com or username"
            handleChange={handleChange}
          />
        </div>
        {errors.email && <small className="text-red-500">{errors.email}</small>}
        <div>
          <p className="text-sm font-medium mb-1">Password</p>
          <InputWithIcon
            icon={HiOutlineLockClosed}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            handleChange={handleChange}
            rightIcon={
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <HiOutlineEye /> : <HiOutlineEyeOff />}
              </button>
            }
          />
        </div>
        {errors.password && (
          <small className="text-red-500">{errors.password}</small>
        )}
        <div className="text-end">
          <a href="" className="text-blue-700 text-sm hover:text-blue-800">
            Forgot password?
          </a>
        </div>
        <div>
          {apiError && (
            <div className="text-red-500 text-sm text-center font-medium my-2">
              {apiError}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white p-3 outline-none rounded-xl cursor-pointer hover:bg-blue-600 transition-colors duration-300"
          >
            Login
          </button>
        </div>
        <div className="text-center text-sm">
          <p>
            Don't have an account?{" "}
            <button
              type="button"
              onClick={switchToSignup}
              className="text-blue-700 cursor-pointer hover:text-blue-800 font-bold"
            >
              Sign Up
            </button>
          </p>
        </div>
        <div className="flex flex-col gap-4 mt-2">
          <div className="text-center flex justify-between items-center text-gray-500 text-xs">
            <hr className="w-1/3" />
            <p>or continue with</p>
            <hr className="w-1/3" />
          </div>
          <div className="w-full flex justify-center items-center gap-3 border-gray-300 border-2 p-2 outline-none rounded-xl cursor-pointer hover:bg-gray-100 transition-colors duration-300">
            <FcGoogle />
            <button type="button">Google</button>
          </div>
        </div>
      </form>
    </article>
  );
};

export default Login;
