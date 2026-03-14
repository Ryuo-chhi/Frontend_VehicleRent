
const Navigation = () => {
  return (
    <ul className="flex flex-col w-full sm:flex-row sm:gap-6  gap-2 text-start ">
      <li className="hover:bg-gray-200/30 w-full transition-colors duration-75 cursor-pointer">
        <a href="" >
          Home
        </a>
      </li>
      <li className="hover:bg-gray-200/30 w-full transition-colors duration-75 cursor-pointer">
        <a href="" >
          Vehicles
        </a>
      </li>
      <li className="hover:bg-gray-200/30 w-full transition-colors duration-75 cursor-pointer">
        <a href="" >
          About
        </a>
      </li>
      <li className="hover:bg-gray-200/30 w-full transition-colors duration-75 cursor-pointer">
        <a href="" >
          Contact 
        </a>
      </li>
    </ul>
  );
}

export default Navigation