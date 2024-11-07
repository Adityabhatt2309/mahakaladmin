"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa"; // Import user icon from react-icons
import { logoutUser } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { deleteCookie, getCookie } from "cookies-next";
import { CiMenuFries } from "react-icons/ci";
import { toggleSideBar } from "../redux/globalSlice";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const userRole = getCookie("role");
  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(userRole);
  }, [userRole]);
  // Handle Logout
  const handleLogout = () => {
    dispatch(logoutUser());
    deleteCookie("authToken");
    router.push("/login");
  };

  const SideBarHandler = () => {
    dispatch(toggleSideBar());
  };

  return (
    <header className="bg-[#2c907f] text-white p-4 flex justify-between items-center">
      {/* Navbar Brand */}
      <div className=" flex items-center sm:gap-8 md:gap-0">
        <CiMenuFries className="sm:block md:hidden" onClick={SideBarHandler} />
        <h1 className="text-xl hidden md:block">Dashboard</h1>
      </div>

      {/* User Icon with Dropdown */}
      <div className="relative">
        <div className="flex justify-center gap-2 text-white font-bold text-pretty">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="focus:outline-none flex flex-col justify-center items-center"
          >
            <FaUserCircle size={28} />
          </button>
          <p> {role && role === "admin" ? "Super Admin" : "Admin"}</p>
        </div>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
