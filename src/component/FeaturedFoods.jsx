import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import axios from "axios";
import { FaStar, FaEye, FaClock, FaUtensils } from "react-icons/fa";

const Countdown = ({ expiry }) => {
  const calculateTimeLeft = () => {
    const diff = +new Date(expiry) - +new Date();
    if (diff <= 0) return null;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
  useEffect(() => {
    if (!timeLeft) return;
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);
      if (!updated) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [expiry, timeLeft]);

  if (!timeLeft)
    return (
      <span className="text-red-500 font-bold text-xs bg-red-100 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded-full transition-colors duration-300">
        Expired
      </span>
    );

  return (
    <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full transition-colors duration-300">
      <FaClock size={10} />
      <span>
        {timeLeft.days > 0 && <>{timeLeft.days}d </>}
        {timeLeft.hours.toString().padStart(2, "0")}:
        {timeLeft.minutes.toString().padStart(2, "0")}:
        {timeLeft.seconds.toString().padStart(2, "0")}
      </span>
    </div>
  );
};

const FeaturedFoods = () => {
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFoods() {
      try {
        setLoading(true);
        const res = await axios.get("https://food-tracker-server-six.vercel.app/foods");
        const valid = res.data.filter(food => new Date(food.ExpiryDate) > new Date());
        const shuffled = valid.sort(() => 0.5 - Math.random());
        setFeaturedFoods(shuffled.slice(0, 6));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchFoods();
  }, []);

  if (loading)
    return (
      <div className="w-full bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 transition-colors duration-300">
        <div className="w-11/12 md:w-10/12 mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block animate-pulse bg-gray-300 dark:bg-gray-600 h-12 w-80 rounded-lg mb-4"></div>
            <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-6 w-96 mx-auto rounded"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl shadow-lg bg-white dark:bg-gray-800 h-80 p-6 transition-colors duration-300">
                <div className="bg-gray-300 dark:bg-gray-600 h-40 rounded-xl mb-4"></div>
                <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 dark:bg-gray-700 h-3 rounded w-3/4 mb-4"></div>
                <div className="bg-gray-200 dark:bg-gray-700 h-8 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <div className="w-full bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 relative overflow-hidden transition-colors duration-300">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 text-6xl">🍎</div>
        <div className="absolute top-20 right-20 text-4xl">🥗</div>
        <div className="absolute bottom-20 left-20 text-5xl">🍊</div>
        <div className="absolute bottom-10 right-10 text-3xl">🥕</div>
      </div>

      <div className="w-11/12 md:w-10/12 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
            <FaStar className="animate-pulse" />
            <span>FEATURED SELECTION</span>
            <FaStar className="animate-pulse" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 mb-6 drop-shadow-sm">
            Premium Foods
          </h2>
          
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium transition-colors duration-300">
            Discover our handpicked selection of premium foods that are fresh, nutritious, and absolutely delicious! 
            Each item is carefully selected for quality and taste.
          </p>
        </motion.div>

        {featuredFoods.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16 bg-white dark:bg-gray-800 rounded-3xl shadow-xl transition-colors duration-300"
          >
            <div className="text-8xl mb-6">🍽️</div>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4 transition-colors duration-300">No Featured Foods Available</h3>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-6 transition-colors duration-300">Our chefs are preparing something amazing!</p>
            <p className="text-gray-400 dark:text-gray-500 transition-colors duration-300">Check back soon for incredible food selections</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredFoods.map((food, i) => (
              <motion.article
                key={food._id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.15, duration: 0.7, type: "spring" }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-orange-100 dark:border-gray-700 p-6 flex flex-col cursor-pointer hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
                
                {/* Featured Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg z-20 transform group-hover:scale-110 transition-transform duration-300">
                  <FaStar size={12} className="animate-pulse" />
                  Featured
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
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                  {food.FoodTitle}
                </h3>

                {/* Category and Quantity */}
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-800 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 transition-colors duration-300">
                    <FaUtensils size={12} />
                    {food.category}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 font-medium text-sm transition-colors duration-300">Qty: {food.Quantity}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 leading-relaxed flex-grow transition-colors duration-300">
                  {food.Description || "Fresh and delicious food item perfect for your daily nutrition needs. Made with premium ingredients and prepared with care."}
                </p>

                {/* Footer */}
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 transition-colors duration-300">
                  <Countdown expiry={food.ExpiryDate} />
                  
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
            className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white px-10 py-4 rounded-2xl hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 transition-all duration-300 text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1"
          >
            <span className="text-2xl">🔍</span>
            Explore All Foods
            <span className="text-2xl">✨</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedFoods;
