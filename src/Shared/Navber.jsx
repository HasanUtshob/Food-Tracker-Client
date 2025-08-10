import { Link, NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ThemeContext } from "../Context/ThemeContext";
import Loading from "../component/Loading";
import Swal from "sweetalert2";
import axios from "axios";
import { 
  FaHome, 
  FaUtensils, 
  FaPhone, 
  FaTachometerAlt, 
  FaUser, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes,
  FaSun,
  FaMoon
} from "react-icons/fa";

const Navbar = () => {
  const { User, SignOut } = useContext(AuthContext);
  const { darkmode, setDarkmode } = useContext(ThemeContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchUserData = async () => {
    const email = User?.email;
    if (!email) {
      setUserData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `https://food-tracker-server-six.vercel.app/users?email=${email}`,
        {
          headers: { Authorization: `Bearer ${User?.accessToken}` },
        }
      );
      setUserData(res.data[0]);
    } catch (error) {
      console.error("Failed to load user data:", error);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [User]);

  const handleSignOut = () => {
    Swal.fire({
      title: 'Sign Out?',
      text: 'Are you sure you want to sign out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, sign out',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        SignOut().then(() => {
          Swal.fire({
            icon: "success",
            title: "Signed Out Successfully!",
            text: "You have been logged out safely.",
            showConfirmButton: false,
            timer: 2000,
            background: '#f0f9ff',
            color: '#1e40af'
          });
          setUserData(null);
          setMobileMenuOpen(false);
        });
      }
    });
  };

  const toggleDarkMode = () => {
    setDarkmode(!darkmode);
  };

  const navItems = [
    { to: "/", label: "Home", icon: FaHome },
    { to: "/fridge", label: "Fridge", icon: FaUtensils },
    { to: "/contactus", label: "Contact", icon: FaPhone },
  ];

  if (loading) return <Loading />;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700' 
            : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <FaUtensils className="text-white text-lg" />
                </div>
                <motion.h1
                  className="font-black text-2xl bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  NutriTrack
                </motion.h1>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 font-medium ${
                      isActive
                        ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 shadow-sm'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`
                  }
                >
                  <item.icon className="text-sm" />
                  <span>{item.label}</span>
                </NavLink>
              ))}

              {User && (
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 font-medium ${
                      isActive
                        ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 shadow-sm'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`
                  }
                >
                  <FaTachometerAlt className="text-sm" />
                  <span>Dashboard</span>
                </NavLink>
              )}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                {darkmode ? (
                  <FaSun className="text-yellow-500 text-lg" />
                ) : (
                  <FaMoon className="text-gray-600 dark:text-gray-300 text-lg" />
                )}
              </motion.button>

              {/* User Section */}
              {User ? (
                <div className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 p-2 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 hover:from-blue-100 hover:to-purple-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 border border-blue-200 dark:border-gray-600"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-md">
                      <img
                        src={userData?.photo || "/default-avatar.png"}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="hidden lg:block text-left">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {userData?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {userData?.email?.slice(0, 20)}...
                      </p>
                    </div>
                  </motion.button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-200 dark:border-gray-600">
                          <img
                            src={userData?.photo || "/default-avatar.png"}
                            alt="User"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">
                            {userData?.name || "User"}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {userData?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <Link
                        to="/dashboard/myprofile"
                        className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <FaUser className="text-blue-500" />
                        <span className="text-gray-700 dark:text-gray-300">My Profile</span>
                      </Link>
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <FaTachometerAlt className="text-green-500" />
                        <span className="text-gray-700 dark:text-gray-300">Dashboard</span>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 text-red-600 dark:text-red-400"
                      >
                        <FaSignOutAlt />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/registration"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                {mobileMenuOpen ? (
                  <FaTimes className="text-gray-600 dark:text-gray-300 text-lg" />
                ) : (
                  <FaBars className="text-gray-600 dark:text-gray-300 text-lg" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-300 ${
                        isActive
                          ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`
                    }
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </NavLink>
                ))}

                {User && (
                  <NavLink
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-300 ${
                        isActive
                          ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`
                    }
                  >
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                  </NavLink>
                )}

                {!User && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center w-full p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300"
                    >
                      Login
                    </Link>
                    <Link
                      to="/registration"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center w-full p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg transition-all duration-300"
                    >
                      Register
                    </Link>
                  </div>
                )}

                {User && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-3 w-full p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-300"
                    >
                      <FaSignOutAlt />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
