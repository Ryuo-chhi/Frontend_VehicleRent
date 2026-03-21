import { useState } from "react";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";

import InputWithIcon from "./InputWithIcon";
import { FcGoogle } from "react-icons/fc";
import { validateEmail, validatePassword } from "../utils/validators";

const Login = () => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  //handle input change
  function handleChange(e) {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
    console.log(e.target.name + " " + e.target.value);
  }

  //validation
  function validate() {
    let newErrors = {};
    const emailError = validateEmail(form.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(form.password);
    if (passwordError) newErrors.password = passwordError;

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Login successfully", form);
    }
  }
  return (
    <article className="w-full h-3/4 sm:w-4/5 border-2 border-gray-400 rounded-xl flex flex-col justify-center items-center p-3 gap-5 transition-all duration-300">
      <div>
        <h2 className="text-center font-bold text-2xl my-2">Login</h2>
        <p className="text-gray-400">
          Enter your credentials to access your account
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
        <div>
          <p>Email Address</p>
          <InputWithIcon
            icon={HiOutlineMail}
            type="email"
            name="email"
            placeholder="you@email.com"
            handleChange={handleChange}
          />
        </div>
        {errors.email && <small className="text-red-500">{errors.email}</small>}
        <div>
          <p>Password</p>
          <InputWithIcon
            icon={HiOutlineLockClosed}
            type={show ? "text" : "password"}
            name="password"
            placeholder="Password"
            handleChange={handleChange}
            rightIcon={
              <button type="button" onClick={() => setShow(!show)}>
                {show ? <HiOutlineEye /> : <HiOutlineEyeOff />}
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
          <button
            type="submit"
            className="w-full bg-blue-700 text-white p-3 outline-none rounded-xl cursor-pointer hover:bg-blue-600 transition-colors duration-300"
          >
            Login
          </button>
        </div>
        <div className="text-center">
          <p>
            Don't have an account?{" "}
            <button className="text-blue-700 cursor-pointer hover:text-blue-800">
              {" "}
              <a href="">Sign Up</a>
            </button>
          </p>
        </div>
        <div className="flex flex-col gap-6 mt-2">
          <div className="text-center flex justify-center items-center text-gray-500 gap-3">
            <hr className="w-1/3" />
            <p>or continue with</p>
            <hr className="w-1/3" />
          </div>
          <div className="w-full flex justify-center items-center gap-3 border-gray-300 border-2 p-3 outline-none rounded-xl cursor-pointer hover:bg-gray-300 transition-colors duration-300">
            <FcGoogle />
            <button>Google</button>
          </div>
        </div>
      </form>
    </article>
  );
};

export default Login;
