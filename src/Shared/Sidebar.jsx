import React, { useState, useContext } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../Context/AuthContext";
import { 
  FaHome, 
  FaPlus, 
  FaList, 
  FaSearch, 
  FaUser, 
  FaBars, 
  FaTimes,
  FaChartBar
} from "react-icons/fa";

const Sidebar = () => {
  const { User } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      icon: <FaChartBar className="text-xl" />,
      link: "/dashboard",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Home",
      icon: <FaHome className="text-xl" />,
      link: "/",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Add Food",
      icon: <FaPlus className="text-xl" />,
      link: "/addfood",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      requireAuth: true,
    },
    {
      title: "My Foods",
      icon: <FaList className="text-xl" />,
      link: "/myfood",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      requireAuth: true,
    },
    {
      title: "Browse Fridge",
      icon: <FaSearch className="text-xl" />,
      link: "/Fridge",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
    },
    {
      title: "My Profile",
      icon: <FaUser className="text-xl" />,
      link: "/myprofile",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      requireAuth: true,
    },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    !item.requireAuth || (item.requireAuth && User)
  );

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
      >
        {isOpen ? <FaTimes className="text-gray-600" /> : <FaBars className="text-gray-600" />}
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed left-0 top-0 h-full w-72 bg-white shadow-xl z-40 lg:translate-x-0 lg:static lg:z-auto border-r border-gray-200`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 border-b border-gray-200">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <motion.h1
                className="font-extrabold text-2xl text-center"
                animate={{
                  color: [
                    "#ab3939",
                    "#d59b2f",
                    "#a9df33",
                    "#21a762",
                    "#16adc8",
                    "#1d51c8",
                    "#9a52e3",
                    "#d852e3",
                  ],
                  transition: {
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
              >
                NutriTrack
              </motion.h1>
            </Link>
            <p className="text-center text-gray-500 text-sm mt-2">
              Smart Food Management
            </p>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {filteredMenuItems.map((item, index) => {
                const isActive = location.pathname === item.link;
                
                return (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <NavLink
                      to={item.link}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group ${
                        isActive
                          ? `${item.bgColor} ${item.color} shadow-md`
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <div className={`${isActive ? item.color : "text-gray-400 group-hover:text-gray-600"}`}>
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.title}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto w-2 h-2 bg-current rounded-full"
                        />
                      )}
                    </NavLink>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* User Info Section */}
          {User && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {User.displayName?.charAt(0) || User.email?.charAt(0) || "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">
                    {User.displayName || "User"}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {User.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-center text-xs text-gray-400">
              <p>© 2024 NutriTrack</p>
              <p>Smart Food Management System</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main content spacer for desktop */}
      <div className="hidden lg:block w-72 flex-shrink-0"></div>
    </>
  );
};

export default Sidebar;
