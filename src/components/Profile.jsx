import { useState, useRef, useEffect } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const username = user || "User";
  const initial = username.charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none cursor-pointer group hover:opacity-90 transition"
      >
        <div className="flex bg-blue-600 group-hover:bg-blue-700 rounded-full w-10 h-10 items-center justify-center text-white shadow-md transition-colors font-bold text-lg">
          {initial}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* User info */}
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Signed in as</p>
            <p className="font-semibold text-gray-800 text-sm truncate" title={username}>
              {username}
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-750 hover:bg-red-50 hover:text-red-600 flex items-center gap-2 transition cursor-pointer mt-1"
          >
            <HiOutlineLogout size={16} />
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
