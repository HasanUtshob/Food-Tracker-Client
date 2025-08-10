import React, { useContext } from "react";
import { Link } from "react-router";
import { Home, Search, ChefHat, Apple, Cookie, Pizza, Coffee, Utensils } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { ThemeContext } from "../Context/ThemeContext";

const NotFound = () => {
  const { darkmode } = useContext(ThemeContext);

  // Floating food icons data
  const floatingFoods = [
    { icon: Apple, delay: 0, x: 100, y: 50 },
    { icon: Cookie, delay: 0.5, x: -80, y: 80 },
    { icon: Pizza, delay: 1, x: 120, y: -60 },
    { icon: Coffee, delay: 1.5, x: -100, y: -40 },
    { icon: ChefHat, delay: 2, x: 80, y: 100 },
    { icon: Utensils, delay: 2.5, x: -120, y: 60 },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const buttonHoverVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Floating Food Icons Background */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingFoods.map((food, index) => {
          const IconComponent = food.icon;
          return (
            <motion.div
              key={index}
              className="absolute opacity-10 dark:opacity-5"
              style={{
                left: `calc(50% + ${food.x}px)`,
                top: `calc(50% + ${food.y}px)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: darkmode ? 0.05 : 0.1, scale: 1 }}
              transition={{ delay: food.delay, duration: 1 }}
              variants={floatingVariants}
              whileInView="animate"
            >
              <IconComponent size={60} className="text-blue-500 dark:text-blue-400" />
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 404 Number with Food Icon */}
        <motion.div
          variants={itemVariants}
          className="relative mb-8"
        >
          <motion.h1
            className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            4
            <motion.span
              className="inline-block mx-2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChefHat className="text-orange-500 dark:text-orange-400 w-16 h-16 md:w-20 md:h-20 inline" />
            </motion.span>
            4
          </motion.h1>
        </motion.div>

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center"
        >
          Oops! Recipe Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center max-w-2xl leading-relaxed"
        >
          Looks like this page went missing from our kitchen! 🍳 
          <br />
          Don't worry, we have plenty of delicious alternatives waiting for you.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <motion.div
            variants={buttonHoverVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link to="/">
              <button className="btn btn-primary btn-lg flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-none shadow-lg">
                <Home size={20} />
                Back to Kitchen
              </button>
            </Link>
          </motion.div>

          <motion.div
            variants={buttonHoverVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link to="/dashboard">
              <button className="btn btn-outline btn-lg flex items-center gap-3 px-8 py-3 border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900">
                <Utensils size={20} />
                My Dashboard
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Or explore these popular sections:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/dashboard/addfood"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm flex items-center gap-1 transition-colors"
              >
                <Search size={14} />
                Add Food
              </Link>
            </motion.div>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/dashboard/myfood"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm flex items-center gap-1 transition-colors"
              >
                <Apple size={14} />
                My Foods
              </Link>
            </motion.div>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm flex items-center gap-1 transition-colors"
              >
                <Coffee size={14} />
                Contact Us
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Fun Message */}
        <motion.div
          variants={itemVariants}
          className="mt-12 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-xl"
        >
          <motion.p
            className="text-center text-gray-700 dark:text-gray-300 font-medium"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            💡 <span className="font-semibold">Pro Tip:</span> Use the search feature to find your favorite recipes!
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
