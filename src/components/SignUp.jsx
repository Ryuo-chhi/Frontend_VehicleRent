import { useState } from "react";
import toast from "react-hot-toast";
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
import authService from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Signup = ({ switchToLogin, onClose }) => {
  const { login } = useAuth();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    fullname: "",
    identifier: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[\d\W_]/.test(pwd)) score += 1;
    return score;
  };

  const strengthScore = getStrength(form.password);
  const strengthColors = ["bg-gray-200", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];

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
    const fullnameError = validateFullName(form.fullname);
    if (fullnameError) newErrors.fullname = fullnameError;

    if (!form.identifier.trim()) {
      newErrors.identifier = "Email Address or Phone Number is required";
    } else if (!form.identifier.includes('@') && !/^[0-9]{9,10}$/.test(form.identifier)) {
      newErrors.identifier = "Please enter a valid email or a 9-10 digit phone number";
    }

    const passwordError = validatePassword(form.password);
    if (passwordError) newErrors.password = passwordError;

    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError("");
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const identifier = form.identifier.trim();
        const isEmail = identifier.includes('@');
        
        const customerData = {
          customerName: form.fullname,
          email: isEmail ? identifier : `${identifier}@placeholder.com`,
          customerIdNum: 'TBD',
          customerPhone: isEmail ? '000000000' : identifier,
          password: form.password,
          idCardPhoto: 'TBD',
          driverLicensePhoto: 'TBD'
        };

        // 1. Register customer
        await authService.customerRegister(customerData);
        // 2. Auto-login customer
        await login({ email: identifier, password: form.password }, 'customer');
        toast.success("Successfully registered and logged in!");
        onClose?.(); // Close the modal
      } catch (error) {
        const errorMsg = error.response?.data?.message || error.response?.data || error.message || "Registration failed";
        setApiError(errorMsg);
        toast.error("Signup failed: " + errorMsg);
        console.log("Signup failed", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  return (
    <article className="w-full h-full md:w-1/2 flex flex-col justify-center items-center bg-white rounded-2xl md:rounded-tr-2xl md:rounded-br-2xl md:rounded-tl-none md:rounded-bl-none p-3 sm:px-5 lg:px-8 xl:px-10 gap-4 transition-all duration-300">
      <div className="text-center">
        <h2 className="font-bold text-2xl my-1">Sign Up</h2>
        <p className="text-gray-400 text-sm">Fill in your details to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
        <div>
          <p className="text-sm font-medium mb-1">Full Name</p>
          <InputWithIcon
            icon={HiOutlineUser}
            type="text"
            name="fullname"
            placeholder="Your full name"
            handleChange={handleChange}
          />
          {errors.fullname && (
            <small className="text-red-500 block mt-0.5">{errors.fullname}</small>
          )}
        </div>
        
        <div>
          <p className="text-sm font-medium mb-1">Email Address or Phone Number</p>
          <InputWithIcon
            icon={HiOutlineMail}
            type="text"
            name="identifier"
            placeholder="you@email.com or 012345678"
            handleChange={handleChange}
          />
          {errors.identifier && <small className="text-red-500 block mt-0.5">{errors.identifier}</small>}
        </div>

        <div>
          <p className="text-sm font-medium mb-1">Password</p>
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
          {form.password.length > 0 && (
            <div className="mt-2 space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-gray-500">Password strength:</span>
                <span className={`font-bold ${strengthScore === 4 ? "text-green-600" : "text-gray-700"}`}>
                  {strengthLabels[strengthScore]}
                </span>
              </div>
              <div className="flex gap-1 h-1.5">
                {[1, 2, 3, 4].map(idx => (
                  <div key={idx} className={`h-full flex-1 rounded-full ${idx <= strengthScore ? strengthColors[strengthScore] : "bg-gray-200"} transition-colors duration-300`}></div>
                ))}
              </div>
            </div>
          )}
          {errors.password && (
            <small className="text-red-500 block mt-0.5">{errors.password}</small>
          )}
        </div>

        <div className="mt-1">
          {apiError && (
            <div className="text-red-500 text-sm text-center font-medium my-2">
              {apiError}
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex justify-center items-center gap-2 w-full bg-blue-700 text-white p-3 outline-none rounded-xl cursor-pointer hover:bg-blue-600 transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Signing Up...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </div>

        <div className="text-center text-sm">
          <p>
            Already have an account?{" "}
            <button
              type="button"
              onClick={switchToLogin}
              className="text-blue-700 cursor-pointer hover:text-blue-800 font-bold"
            >
              Log in
            </button>
          </p>
        </div>
        <div className="flex flex-col gap-3 mt-1">
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

export default Signup;
