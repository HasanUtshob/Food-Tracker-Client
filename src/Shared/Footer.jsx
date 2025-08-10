import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="w-11/12 md:w-10/12 mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <motion.h3
                className="text-2xl font-extrabold"
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
              </motion.h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your smart companion for tracking food freshness, reducing waste, and maintaining a healthy lifestyle. Keep your kitchen organized and your food fresh!
            </p>
            <div className="flex space-x-4">
              {[
                { icon: FaFacebook, color: "hover:text-blue-500", url: "https://www.facebook.com/Shahriahasanutshob/" },
                { icon: FaTwitter, color: "hover:text-sky-400", url: "https://x.com/" },
                { icon: FaInstagram, color: "hover:text-pink-500", url: "https://instagram.com/" },
                { icon: FaLinkedin, color: "hover:text-blue-600", url: "https://www.linkedin.com/in/md-hasan-utshob/" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`text-gray-400 ${social.color} transition-all duration-300 p-2 rounded-full bg-gray-800 hover:bg-gray-700`}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-bold text-white border-b border-gray-700 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "Dashboard", path: "/dashboard" },
                { name: "My Foods", path: "/dashboard/myfood" },
                { name: "Add Food", path: "/dashboard/addfood"},
                { name: "Fridge", path: "/fridge" },
                { name: "Contact Us", path: "/contactus" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-blue-500 rounded-full group-hover:w-2 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-bold text-white border-b border-gray-700 pb-2">
              Features
            </h4>
            <ul className="space-y-2">
              {[
                "🔔 Expiry Notifications",
                "📊 Food Analytics",
                "🍽️ Recipe Suggestions",
                "📱 Mobile Friendly",
                "🌙 Dark Mode",
                "🔒 Secure & Private",
              ].map((feature, index) => (
                <li key={index} className="text-gray-300 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-bold text-white border-b border-gray-700 pb-2">
              Contact Info
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300 text-sm">
                <FaMapMarkerAlt className="text-red-400 flex-shrink-0" />
                <span>123 Food Street, Nutrition City, NC 12345</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 text-sm">
                <FaPhone className="text-green-400 flex-shrink-0" />
                <span>+8801601949074</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 text-sm">
                <FaEnvelope className="text-blue-400 flex-shrink-0" />
                <span>shutshob@gmail.com</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-white mb-2">Newsletter</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-l-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors duration-300"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-colors duration-300 text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="w-11/12 md:w-10/12 mx-auto py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-400 text-sm text-center md:text-left"
            >
              © 2024 NutriTrack. All rights reserved. Made with ❤️ for a healthier world.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-6 text-sm"
            >
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="text-gray-400 hover:text-white transition-colors duration-300">
                Cookie Policy
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
