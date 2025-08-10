import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaClock, FaEye, FaExclamationTriangle, FaUtensils, FaCalendarAlt, FaHourglassHalf } from "react-icons/fa";

const NearlyExpire = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFood = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://food-tracker-server-six.vercel.app/nearly-expire");
        setFoods(res.data);
      } catch (error) {
        console.error("Error fetching nearly expired foods:", error);
      } finally {
        setLoading(false);
      }
    };
    loadFood();
  }, []);

  // Enhanced Countdown Component
  const CountdownTimer = ({ expiryDate }) => {
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
      const calculateTimeLeft = () => {
        const diff = +new Date(expiryDate) - +new Date();
        if (diff <= 0) return null;
        return {
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        };
      };

      const updateTimer = () => {
        const time = calculateTimeLeft();
        setTimeLeft(time);
      };

      updateTimer();
      const timer = setInterval(updateTimer, 1000);
      return () => clearInterval(timer);
    }, [expiryDate]);

    if (!timeLeft) {
      return (
        <div className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-2 rounded-full text-sm font-bold">
          <FaExclamationTriangle className="animate-pulse" />
          <span>EXPIRED</span>
        </div>
      );
    }

    const isUrgent = timeLeft.days === 0 && timeLeft.hours < 12;
    const isCritical = timeLeft.days === 0 && timeLeft.hours < 6;

    return (
      <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-bold ${
        isCritical 
          ? 'bg-red-100 text-red-700 animate-pulse' 
          : isUrgent 
          ? 'bg-orange-100 text-orange-700' 
          : 'bg-yellow-100 text-yellow-700'
      }`}>
        <FaHourglassHalf className={isCritical ? 'animate-spin' : 'animate-pulse'} />
        <span>
          {timeLeft.days > 0 && `${timeLeft.days}d `}
          {timeLeft.hours.toString().padStart(2, "0")}:
          {timeLeft.minutes.toString().padStart(2, "0")}:
          {timeLeft.seconds.toString().padStart(2, "0")}
        </span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-full bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 py-16 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 text-6xl">⏰</div>
          <div className="absolute top-20 right-20 text-4xl">⚠️</div>
          <div className="absolute bottom-20 left-20 text-5xl">🍎</div>
          <div className="absolute bottom-10 right-10 text-3xl">⏳</div>
        </div>

        <div className="w-11/12 md:w-10/12 mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block animate-pulse bg-gradient-to-r from-yellow-300 to-red-300 h-12 w-80 rounded-2xl mb-4"></div>
            <div className="animate-pulse bg-gradient-to-r from-orange-200 to-yellow-200 h-6 w-96 mx-auto rounded-xl"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse rounded-3xl shadow-2xl bg-white p-6">
                <div className="bg-gradient-to-br from-yellow-200 to-orange-200 h-48 rounded-2xl mb-4"></div>
                <div className="bg-gradient-to-r from-yellow-200 to-red-200 h-6 rounded-xl mb-3"></div>
                <div className="bg-gradient-to-r from-orange-200 to-yellow-200 h-4 rounded-lg mb-2 w-3/4"></div>
                <div className="bg-gradient-to-r from-red-200 to-orange-200 h-4 rounded-lg mb-4 w-1/2"></div>
                <div className="bg-gradient-to-r from-yellow-200 to-red-200 h-10 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 py-16 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 text-6xl">⏰</div>
        <div className="absolute top-20 right-20 text-4xl">⚠️</div>
        <div className="absolute bottom-20 left-20 text-5xl">🍎</div>
        <div className="absolute bottom-10 right-10 text-3xl">⏳</div>
      </div>

      <div className="w-11/12 md:w-10/12 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
            <FaExclamationTriangle className="animate-pulse" />
            <span>URGENT ATTENTION</span>
            <FaExclamationTriangle className="animate-pulse" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-orange-500 to-red-500 mb-6 drop-shadow-sm">
            Nearly Expiring Foods
          </h2>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            Act fast! These foods are approaching their expiration dates. 
            Don't let good food go to waste - consume or preserve them soon!
          </p>
        </motion.div>

        {foods.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-yellow-100"
          >
            <div className="text-8xl mb-6">✅</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">All Foods Are Fresh!</h3>
            <p className="text-xl text-gray-500 mb-6">No foods are nearing expiration at the moment.</p>
            <p className="text-gray-400">Keep up the great food management!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {foods.map((food, index) => (
              <motion.article
                key={food._id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.15, duration: 0.7, type: "spring" }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white rounded-3xl shadow-2xl border border-orange-100 p-6 flex flex-col cursor-pointer hover:shadow-3xl transition-all duration-500 overflow-hidden"
              >
                {/* Urgency Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
                
                {/* Warning Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg z-20 transform group-hover:scale-110 transition-transform duration-300">
                  <FaExclamationTriangle size={12} className="animate-pulse" />
                  Expiring Soon
                </div>

                {/* Food Image */}
                <div className="relative rounded-2xl overflow-hidden h-48 mb-6 group-hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={food.FoodImage}
                    alt={food.FoodTitle}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Floating Action Button */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <Link
                      to={`/fooddetails/${food._id}`}
                      className="bg-white text-orange-600 p-3 rounded-full shadow-lg hover:bg-orange-50 transition-colors duration-200"
                      aria-label={`View details of ${food.FoodTitle}`}
                    >
                      <FaEye size={16} />
                    </Link>
                  </div>
                </div>

                {/* Food Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                  {food.FoodTitle}
                </h3>

                {/* Category and Quantity */}
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <FaUtensils size={12} />
                    {food.category}
                  </span>
                  <span className="text-gray-600 font-medium text-sm">Qty: {food.Quantity}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed flex-grow">
                  {food.Description || "This food item is approaching its expiration date. Please consume or preserve it soon to avoid waste."}
                </p>

                {/* Countdown Timer */}
                <div className="mb-6">
                  <CountdownTimer expiryDate={food.ExpiryDate} />
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaCalendarAlt size={12} />
                    <span>Expires: {new Date(food.ExpiryDate).toLocaleDateString()}</span>
                  </div>
                  
                  <Link
                    to={`/fooddetails/${food._id}`}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl px-4 py-2 shadow-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 font-semibold text-sm"
                    aria-label={`See details of ${food.FoodTitle}`}
                  >
                    <FaEye size={14} />
                    View Details
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-16"
        >
          <Link
            to="/fridge"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white px-10 py-4 rounded-2xl hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 transition-all duration-300 text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1"
          >
            <span className="text-2xl">🔍</span>
            Check All Foods
            <span className="text-2xl">⚡</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NearlyExpire;
