import { useState } from "react";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineUser,
} from "react-icons/hi";
import InputWithIcon from "./InputWithIcon";
import { FcGoogle } from "react-icons/fc";
import {
  validateEmail,
  validatePassword,
  validateFullName,
} from "../utils/validators";

const Signup = ({ switchToLogin }) => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    fullname: "",
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
    const fullnameError = validateFullName(form.fullname);
    if (fullnameError) newErrors.fullname = fullnameError;

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
      console.log("Sign up successfully", form);
    }
  }

  return (
    <article className="w-full h-full md:w-1/2 flex flex-col justify-center items-center bg-white rounded-tr-2xl rounded-br-2xl p-3 sm:px-5 lg:px-8 xl:px-10 gap-5 transition-all duration-300">
      <div>
        <h2 className="text-center font-bold text-2xl my-2">Sign Up</h2>
        <p className="text-gray-400">Fill in your details to get started</p>
      </div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
        <div>
          <p>Full Name</p>
          <InputWithIcon
            icon={HiOutlineUser}
            type="text"
            name="fullname"
            placeholder="Your full name"
            handleChange={handleChange}
          />
        </div>
        {errors.fullname && (
          <small className="text-red-500">{errors.fullname}</small>
        )}
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

        <div className="mt-1">
          <button
            type="submit"
            className="w-full bg-blue-700 text-white p-3 outline-none rounded-xl cursor-pointer hover:bg-blue-600 transition-colors duration-300"
          >
            Sign Up
          </button>
        </div>

        <div className="text-center">
          <p>
            Already have an account?{" "}
            <button
              onClick={switchToLogin}
              className="text-blue-700 cursor-pointer hover:text-blue-800"
            >
              {" "}
              <a href="">Log in</a>
            </button>
          </p>
        </div>
        <div className="flex flex-col gap-8 mt-2">
          <div className="text-center flex justify-between items-center text-gray-500">
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

export default Signup;
