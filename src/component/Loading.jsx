import React from "react";
import { motion } from "framer-motion";
import { FaUtensils, FaAppleAlt, FaCarrot, FaBreadSlice } from "react-icons/fa";

const Loading = () => {
  const foodIcons = [FaUtensils, FaAppleAlt, FaCarrot, FaBreadSlice];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center z-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-6xl">🍎</div>
        <div className="absolute top-20 right-20 text-4xl">🥕</div>
        <div className="absolute bottom-20 left-20 text-5xl">🍞</div>
        <div className="absolute bottom-10 right-10 text-3xl">🥗</div>
        <div className="absolute top-1/2 left-1/4 text-4xl">🍌</div>
        <div className="absolute top-1/3 right-1/3 text-5xl">🥦</div>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Main Loading Animation */}
        <div className="relative mb-8">
          {/* Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="w-24 h-24 border-4 border-blue-200 border-t-blue-600 rounded-full"
          />
          
          {/* Inner Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute inset-2 w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full"
          />
          
          {/* Center Icon */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <FaUtensils className="text-white text-sm" />
            </div>
          </motion.div>
        </div>

        {/* Floating Food Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {foodIcons.map((Icon, index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 3 + index * 0.5,
                delay: index * 0.5,
                ease: "easeInOut"
              }}
              className={`absolute text-2xl ${
                index === 0 ? 'top-1/4 left-1/4 text-blue-500' :
                index === 1 ? 'top-1/4 right-1/4 text-red-500' :
                index === 2 ? 'bottom-1/4 left-1/4 text-orange-500' :
                'bottom-1/4 right-1/4 text-green-500'
              }`}
            >
              <Icon />
            </motion.div>
          ))}
        </div>

        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-6"
        >
          <motion.h1
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent mb-2"
            style={{ backgroundSize: "200% 200%" }}
          >
            NutriTrack
          </motion.h1>
          <p className="text-gray-600 font-medium">Loading your food journey...</p>
        </motion.div>

        {/* Loading Dots */}
        <div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
              className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-8 w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            animate={{
              x: ["-100%", "100%"]
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
            className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          />
        </div>

        {/* Loading Text */}
        <motion.p
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
          className="mt-4 text-sm text-gray-500 font-medium"
        >
          Preparing your dashboard...
        </motion.p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(index) * 50, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 4 + index,
              delay: index * 0.5,
              ease: "easeInOut"
            }}
            className={`absolute w-2 h-2 rounded-full ${
              index % 3 === 0 ? 'bg-blue-400' :
              index % 3 === 1 ? 'bg-purple-400' : 'bg-indigo-400'
            }`}
            style={{
              left: `${10 + index * 15}%`,
              top: `${20 + index * 10}%`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
