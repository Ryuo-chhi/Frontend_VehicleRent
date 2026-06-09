import { NavLink } from "react-router-dom";

const Navigation = () => {
  const role = localStorage.getItem("role");
  const isStaff = role === "MANAGER" || role === "REGULAR";

  return (
    <ul className="flex flex-col w-full sm:w-auto sm:flex-row sm:gap-6 gap-2 text-center sm:text-start font-semibold items-center justify-center">
      <li className="hover:bg-gray-200/30 w-full sm:w-auto transition-colors duration-75 cursor-pointer px-2 py-1 rounded-lg">
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "text-blue-600" : ""}
        >
          Home
        </NavLink>
      </li>
      <li className="hover:bg-gray-200/30 w-full sm:w-auto transition-colors duration-75 cursor-pointer px-2 py-1 rounded-lg">
        <NavLink 
          to="/vehicles"
          className={({ isActive }) => isActive ? "text-blue-600" : ""}
        >
          Vehicles
        </NavLink>
      </li>

      {isStaff && (
        <li className="hover:bg-gray-200/30 w-full sm:w-auto transition-colors duration-75 cursor-pointer px-2 py-1 rounded-lg">
          <NavLink 
            to="/dashboard"
            className={({ isActive }) => isActive ? "text-blue-600" : "text-blue-600"}
          >
            Dashboard
          </NavLink>
        </li>
      )}
      
      <li className="hover:bg-gray-200/30 w-full sm:w-auto transition-colors duration-75 cursor-pointer px-2 py-1 rounded-lg">
        <NavLink 
          to="/about"
          className={({ isActive }) => isActive ? "text-blue-600" : ""}
        >
          About
        </NavLink>
      </li>
      <li className="hover:bg-gray-200/30 w-full sm:w-auto transition-colors duration-75 cursor-pointer px-2 py-1 rounded-lg">
        <NavLink 
          to="/contact"
          className={({ isActive }) => isActive ? "text-blue-600" : ""}
        >
          Contact
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
