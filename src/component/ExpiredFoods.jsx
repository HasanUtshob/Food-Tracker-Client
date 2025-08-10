import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaSkull, FaExclamationCircle, FaUtensils, FaCalendarTimes, FaRecycle } from "react-icons/fa";

const ExpiredFoods = () => {
  const [expiredFoods, setExpiredFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchExpiredFoods = async () => {
      try {
        setLoading(true);
        
       
        let expiredData = [];
        
        
        try {
          const res = await axios.get("http://localhost:3000/expired-foods");
          expiredData = res.data;
        } catch (error) {
          console.log("Expired foods endpoint not available, trying alternatives...");
        }
        
       
        if (expiredData.length === 0) {
          try {
            const res = await axios.get("http://localhost:3000/nearly-expire");
            const now = new Date();
            expiredData = res.data.filter(food => new Date(food.ExpiryDate) < now);
          } catch (error) {
            console.log("Nearly expire endpoint failed, trying foods endpoint...");
          }
        }
        
     
        if (expiredData.length === 0) {
          try {
            const res = await axios.get("http://localhost:3000/foods");
            const now = new Date();
            expiredData = res.data.filter(food => new Date(food.ExpiryDate) < now);
          } catch (error) {
            console.error("All endpoints failed:", error);
          }
        }
        
      
        const now = new Date();
        const validExpiredFoods = expiredData.filter(food => {
          const expiryDate = new Date(food.ExpiryDate);
          return expiryDate < now && food.FoodTitle && food.FoodImage;
        });
        
        setExpiredFoods(validExpiredFoods);
        console.log("Expired foods loaded:", validExpiredFoods.length);
        
      } catch (error) {
        console.error("Error fetching expired foods:", error);
        setExpiredFoods([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExpiredFoods();
  }, []);

  // Calculate how long ago the food expired
  const getExpiredDuration = (expiryDate) => {
    const now = new Date();
    const expired = new Date(expiryDate);
    const diffTime = Math.abs(now - expired);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  if (loading) {
    return (
      <div className="w-full bg-gradient-to-br from-red-50 via-pink-50 to-gray-50 py-16 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 text-6xl">💀</div>
          <div className="absolute top-20 right-20 text-4xl">🗑️</div>
          <div className="absolute bottom-20 left-20 text-5xl">⚠️</div>
          <div className="absolute bottom-10 right-10 text-3xl">❌</div>
        </div>

        <div className="w-11/12 md:w-10/12 mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block animate-pulse bg-gradient-to-r from-red-300 to-gray-300 h-12 w-80 rounded-2xl mb-4"></div>
            <div className="animate-pulse bg-gradient-to-r from-pink-200 to-red-200 h-6 w-96 mx-auto rounded-xl"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse rounded-3xl shadow-2xl bg-white p-6">
                <div className="bg-gradient-to-br from-red-200 to-gray-200 h-48 rounded-2xl mb-4"></div>
                <div className="bg-gradient-to-r from-red-200 to-pink-200 h-6 rounded-xl mb-3"></div>
                <div className="bg-gradient-to-r from-pink-200 to-red-200 h-4 rounded-lg mb-2 w-3/4"></div>
                <div className="bg-gradient-to-r from-gray-200 to-red-200 h-4 rounded-lg mb-4 w-1/2"></div>
                <div className="bg-gradient-to-r from-red-200 to-gray-200 h-10 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-br from-red-50 via-pink-50 to-gray-50 py-16 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 text-6xl">💀</div>
        <div className="absolute top-20 right-20 text-4xl">🗑️</div>
        <div className="absolute bottom-20 left-20 text-5xl">⚠️</div>
        <div className="absolute bottom-10 right-10 text-3xl">❌</div>
      </div>

      <div className="w-11/12 md:w-10/12 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-gray-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
            <FaSkull className="animate-pulse" />
            <span>EXPIRED ITEMS</span>
            <FaSkull className="animate-pulse" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-pink-500 to-gray-500 mb-6 drop-shadow-sm">
            Expired Foods
          </h2>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            These foods have passed their expiration dates. Please dispose of them safely 
            and consider better inventory management to reduce waste in the future.
          </p>
        </motion.div>

        {expiredFoods.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-100"
          >
            <div className="text-8xl mb-6">🎉</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">No Expired Foods!</h3>
            <p className="text-xl text-gray-500 mb-6">Excellent food management! All your foods are still fresh.</p>
            <p className="text-gray-400">Keep up the great work preventing food waste!</p>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {(showAll ? expiredFoods : expiredFoods.slice(0, 6)).map((food, index) => (
              <motion.article
                key={food._id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.15, duration: 0.7, type: "spring" }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white rounded-3xl shadow-2xl border border-red-200 p-6 flex flex-col cursor-pointer hover:shadow-3xl transition-all duration-500 overflow-hidden"
              >
                {/* Expired Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-pink-400 to-gray-400 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
                
                {/* Expired Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-gray-600 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg z-20 transform group-hover:scale-110 transition-transform duration-300">
                  <FaSkull size={12} className="animate-pulse" />
                  EXPIRED
                </div>

                {/* Food Image with Overlay */}
                <div className="relative rounded-2xl overflow-hidden h-48 mb-6 group-hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={food.FoodImage}
                    alt={food.FoodTitle}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-red-500/20 group-hover:bg-red-500/10 transition-colors duration-300"></div>
                  
                  {/* Warning Icon Overlay */}
                  <div className="absolute top-4 left-4 bg-red-600 text-white p-2 rounded-full shadow-lg">
                    <FaExclamationCircle size={16} />
                  </div>
                </div>

                {/* Food Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors duration-300">
                  {food.FoodTitle}
                </h3>

                {/* Category and Quantity */}
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-gradient-to-r from-red-100 to-pink-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <FaUtensils size={12} />
                    {food.category}
                  </span>
                  <span className="text-gray-600 font-medium text-sm">Qty: {food.Quantity}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed flex-grow">
                  {food.Description || "This food item has expired and should be disposed of safely. Please check expiration dates regularly to prevent food waste."}
                </p>

                {/* Expiration Info */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-2 rounded-full text-sm font-bold">
                    <FaCalendarTimes />
                    <span>Expired {getExpiredDuration(food.ExpiryDate)}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-center items-center mt-auto pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaCalendarTimes size={12} />
                    <span>Expired: {new Date(food.ExpiryDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.article>
              ))}
            </div>

            {/* View All Button */}
            {expiredFoods.length > 6 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-center mt-12"
              >
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white px-8 py-4 rounded-2xl hover:from-red-600 hover:via-pink-600 hover:to-red-700 transition-all duration-300 text-lg font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1"
                >
                  <span className="text-2xl">{showAll ? '📋' : '👁️'}</span>
                  {showAll ? 'Show Less Expired Foods' : `View All Expired Foods (${expiredFoods.length})`}
                  <span className="text-2xl">{showAll ? '⬆️' : '⬇️'}</span>
                </button>
              </motion.div>
            )}
          </>
        )}

        {/* Educational Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-100"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
              <FaRecycle className="animate-spin" />
              <span>WASTE PREVENTION TIPS</span>
              <FaRecycle className="animate-spin" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Reduce Food Waste</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">Learn how to better manage your food inventory and prevent waste</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl">
              <div className="text-4xl mb-4">📅</div>
              <h4 className="font-bold text-gray-800 mb-2">Check Dates Regularly</h4>
              <p className="text-sm text-gray-600">Monitor expiration dates and use foods before they expire</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
              <div className="text-4xl mb-4">🥶</div>
              <h4 className="font-bold text-gray-800 mb-2">Proper Storage</h4>
              <p className="text-sm text-gray-600">Store foods correctly to extend their shelf life</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
              <div className="text-4xl mb-4">🍽️</div>
              <h4 className="font-bold text-gray-800 mb-2">Plan Meals</h4>
              <p className="text-sm text-gray-600">Plan your meals to use foods before they expire</p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            to="/fridge"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white px-10 py-4 rounded-2xl hover:from-green-600 hover:via-blue-600 hover:to-purple-600 transition-all duration-300 text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1"
          >
            <span className="text-2xl">🔍</span>
            Manage All Foods
            <span className="text-2xl">🌟</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ExpiredFoods;
