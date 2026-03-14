
const Navigation = () => {
  return (
    <ul className="flex flex-col sm:flex-row sm:gap-6  gap-2 text-start ">
      <li className="nav-li">
        <a href="" className="transition-colors hover:text-gray-600">
          Home
        </a>
      </li>
      <li className="nav-li">
        <a href="" className="transition-colors hover:text-gray-600">
          Vehicles
        </a>
      </li>
      <li className="nav-li">
        <a href="" className="transition-colors hover:text-gray-600">
          About
        </a>
      </li>
      <li className="nav-li">
        <a href="" className="transition-colors hover:text-gray-600">
          Contact 
        </a>
      </li>
    </ul>
  );
}

export default Navigation