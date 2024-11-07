"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import menuData from "../../jsonFiles/menuData.json"; // Importing the JSON file
import superAdminData from "../../jsonFiles/superAdminData.json"; // Importing the JSON file
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { getCookie } from "cookies-next";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null); // For tracking open submenus
  const [isOpen, setIsOpen] = useState(false); // For tracking sidebar visibility on mobile
  const userRole = getCookie("role");
  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(userRole);
  }, [userRole]);
  // Toggle submenus open or close

  const handleToggle = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  // Toggle sidebar on mobile
  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden text-white bg-[#2c907f] p-2 fixed top-4 left-4 z-50 rounded"
        onClick={handleSidebarToggle}
      >
        {isOpen ? <IoClose /> : <IoMdMenu />}
      </button>
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white w-64 h-full px-4 py-8 fixed left-0 z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:block`}
      >
        <ul>
          {role && role === "admin" ? (
            <div>
              {superAdminData.map((item, index) => (
                <li key={index} className="mb-2">
                  {item.subMenu.length > 0 ? (
                    <div>
                      <button
                        onClick={() => handleToggle(index)}
                        className="w-full text-left py-2 px-4 rounded bg-[#2c907f] hover:bg-[#269885] flex justify-between"
                      >
                        {item.title}
                        <span>{openMenu === index ? "-" : "+"}</span>
                      </button>
                      {openMenu === index && (
                        <ul className="pl-4 mt-2">
                          {item.subMenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                href={subItem.path}
                                className="block py-2 px-4 rounded hover:bg-gray-600"
                              >
                                {subItem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      className="block py-2 bg-[#2c907f] px-4 rounded hover:bg-[#269885]"
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </div>
          ) : (
            <div>
              {menuData.map((item, index) => (
                <li key={index} className="mb-2">
                  {item.subMenu.length > 0 ? (
                    <div>
                      <button
                        onClick={() => handleToggle(index)}
                        className="w-full text-left py-2 px-4 rounded bg-[#2c907f] hover:bg-[#269885] flex justify-between"
                      >
                        {item.title}
                        <span>{openMenu === index ? "-" : "+"}</span>
                      </button>
                      {openMenu === index && (
                        <ul className="pl-4 mt-2">
                          {item.subMenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                href={subItem.path}
                                className="block py-2 px-4 rounded hover:bg-gray-600"
                              >
                                {subItem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      className="block py-2 bg-[#2c907f] px-4 rounded hover:bg-[#269885]"
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </div>
          )}
        </ul>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={handleSidebarToggle}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
