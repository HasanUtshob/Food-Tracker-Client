import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { AuthContext } from "../Context/AuthContext";
import Loading from "./Loading";

const ExtraSection = () => {
  const [expiringFoods, setExpiringFoods] = useState([]);
  const [stats, setStats] = useState({ total: 0, expired: 0, safe: 0 });
  const { loading, setloading } = use(AuthContext);

  useEffect(() => {
    // Load Expiring Soon Foods (3 days)
    const loadExpiringFoods = async () => {
      const res = await axios.get(
        "https://food-tracker-server-six.vercel.app/expiring-soon"
      );
      setExpiringFoods(res.data);
      setloading(false);
    };

    // Load Statistics
    const loadStats = async () => {
      const res = await axios.get(
        "https://food-tracker-server-six.vercel.app/food-stats"
      );
      setStats(res.data);
      setloading(false);
    };

    loadExpiringFoods();
    loadStats();
  }, [setloading]);

  if (loading) return <Loading></Loading>;

  return (
    <div className="w-11/12 md:w-10/12 mx-auto my-12">
      {/* Section 1: Expiring Soon */}
      <h2 className="text-4xl font-extrabold mb-8 text-center text-yellow-700 drop-shadow-md">
        ⏳ Expiring Soon (Next 3 Days)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {expiringFoods.map((food, index) => (
          <motion.div
            key={food._id}
            className="p-5 bg-yellow-100 border border-yellow-300 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <img
              src={food.FoodImage}
              alt={food.FoodTitle}
              className="h-36 w-full object-cover rounded-xl mb-3 shadow-md"
            />
            <h3 className="font-semibold text-xl text-yellow-900">
              {food.FoodTitle}
            </h3>
            <p className="text-sm text-yellow-800 mb-2">
              Expires: {new Date(food.ExpiryDate).toLocaleDateString()}
            </p>
            <span className="inline-block bg-yellow-600 text-white text-xs px-3 py-1 rounded-full font-semibold tracking-wide">
              Expiring Soon
            </span>
          </motion.div>
        ))}
      </div>

      {/* Section 2: Food Waste Statistics */}
      <motion.div
        className="bg-blue-50 p-8 rounded-2xl shadow-xl text-center"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-extrabold mb-8 text-blue-700 drop-shadow-md">
          📊 Food Waste Statistics
        </h2>
        <div className="flex justify-center gap-12 text-xl font-semibold">
          <motion.div
            whileHover={{ scale: 1.15 }}
            className="text-blue-600 cursor-default"
          >
            <CountUp end={stats.total} duration={2} />
            <p>Total Foods</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.15 }}
            className="text-red-600 cursor-default"
          >
            <CountUp end={stats.expire} duration={2} />
            <p>Expired Foods</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.15 }}
            className="text-green-600 cursor-default"
          >
            <CountUp end={stats.safe} duration={2} />
            <p>Safe Foods</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ExtraSection;
