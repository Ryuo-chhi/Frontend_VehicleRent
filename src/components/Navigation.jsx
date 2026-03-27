const Navigation = ({ setPage }) => {
  return (
    <ul className="flex flex-col w-full sm:flex-row sm:gap-6  gap-2 text-start font-semibold ">
      <li className="hover:bg-gray-200/30 w-full transition-colors duration-75 cursor-pointer">
        <a
          onClick={(e) => {
            e.preventDefault();
            if (typeof setPage === "function") setPage("home");
          }}
        >
          Home
        </a>
      </li>
      <li className="hover:bg-gray-200/30 w-full transition-colors duration-75 cursor-pointer">
        <a
          onClick={(e) => {
            e.preventDefault();
            if (typeof setPage === "function") setPage("vehicles");
          }}
        >
          Vehicles
        </a>
      </li>
      <li className="hover:bg-gray-200/30 w-full transition-colors duration-75 cursor-pointer">
        <a
          onClick={(e) => {
            e.preventDefault();
            if (typeof setPage === "function") setPage("about");
          }}
        >
          About
        </a>
      </li>
      <li className="hover:bg-gray-200/30 w-full transition-colors duration-75 cursor-pointer">
        <a
          onClick={(e) => {
            e.preventDefault();
            if (typeof setPage === "function") setPage("contact");
          }}
        >
          Contact
        </a>
      </li>
    </ul>
  );
};

export default Navigation;
