import React, { useState, useEffect, use } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { 
  FaPlus, 
  FaEye, 
  FaChartLine, 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaClock, 
  FaUtensils,
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown,
  FaArrowRight,
  FaBoxOpen,
  FaLeaf,
  FaHeart
} from 'react-icons/fa';
import { format } from 'date-fns';

const DashboardHome = () => {
  const { User } = use(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    fresh: 0,
    expiringSoon: 0,
    expired: 0
  });

  useEffect(() => {
    const fetchUserFoods = async () => {
      if (!User?.email || !User?.accessToken) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`https://food-tracker-server-six.vercel.app/myfoods?email=${User.email}`, {
          headers: {
            Authorization: `Bearer ${User.accessToken}`,
          },
        });
        const userFoods = response.data;
        setFoods(userFoods);
        
        // Calculate statistics with consistent date logic
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to start of day for consistent comparison
        
        const fresh = userFoods.filter(food => {
          const expiryDate = new Date(food.ExpiryDate);
          expiryDate.setHours(0, 0, 0, 0); // Set to start of day
          const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
          return daysUntilExpiry > 3;
        });
        
        const expiringSoon = userFoods.filter(food => {
          const expiryDate = new Date(food.ExpiryDate);
          expiryDate.setHours(0, 0, 0, 0); // Set to start of day
          const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
          return daysUntilExpiry >= 0 && daysUntilExpiry <= 3;
        });
        
        const expired = userFoods.filter(food => {
          const expiryDate = new Date(food.ExpiryDate);
          expiryDate.setHours(0, 0, 0, 0); // Set to start of day
          const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
          return daysUntilExpiry < 0;
        });

        setStats({
          total: userFoods.length,
          fresh: fresh.length,
          expiringSoon: expiringSoon.length,
          expired: expired.length
        });
      } catch (error) {
        console.error('Error fetching user foods:', error);
        // Reset to empty state on error
        setFoods([]);
        setStats({
          total: 0,
          fresh: 0,
          expiringSoon: 0,
          expired: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserFoods();
  }, [User]);

  const recentFoods = foods.slice(0, 6);
  const expiringSoonFoods = foods.filter(food => {
    const expiryDate = new Date(food.ExpiryDate);
    const today = new Date();
    expiryDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry >= 0 && daysUntilExpiry <= 3;
  }).slice(0, 4);

  const StatCard = ({ icon: IconComponent, title, value, subtitle, color, trend }) => ( // eslint-disable-line react/prop-types
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color} shadow-lg`}>
          <IconComponent className="text-white text-xl" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${
            trend > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend > 0 ? <FaArrowUp /> : <FaArrowDown />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-1">{value}</h3>
      <p className="text-gray-600 font-medium">{title}</p>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );

  const QuickActionCard = ({ icon: IconComponent, title, description, to, color }) => ( // eslint-disable-line react/prop-types
    <Link to={to}>
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] group cursor-pointer">
        <div className={`p-4 rounded-xl ${color} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <IconComponent className="text-white text-2xl" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        <div className="flex items-center gap-2 mt-4 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
          <span>Get Started</span>
          <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <FaUtensils className="animate-pulse" />
            <span>DASHBOARD OVERVIEW</span>
            <FaUtensils className="animate-pulse" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 mb-4">
            Welcome back, {User?.displayName || 'Food Tracker'}! 👋
          </h1>
          
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Here's your food management overview and quick actions to keep your kitchen organized
          </p>
          
          <div className="mt-6 text-sm text-gray-600">
            <span className="bg-white/80 px-4 py-2 rounded-full shadow-md">
              📅 {format(new Date(), 'EEEE, MMMM do, yyyy')}
            </span>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={FaBoxOpen}
            title="Total Foods"
            value={stats.total}
            subtitle="Items in your inventory"
            color="bg-gradient-to-r from-blue-500 to-indigo-500"
            trend={12}
          />
          <StatCard
            icon={FaCheckCircle}
            title="Fresh Items"
            value={stats.fresh}
            subtitle="Good for more than 3 days"
            color="bg-gradient-to-r from-green-500 to-emerald-500"
            trend={8}
          />
          <StatCard
            icon={FaClock}
            title="Expiring Soon"
            value={stats.expiringSoon}
            subtitle="Within 3 days"
            color="bg-gradient-to-r from-yellow-500 to-orange-500"
            trend={-5}
          />
          <StatCard
            icon={FaExclamationTriangle}
            title="Expired"
            value={stats.expired}
            subtitle="Need immediate attention"
            color="bg-gradient-to-r from-red-500 to-pink-500"
            trend={-15}
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-blue-100 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <FaChartLine className="text-white text-lg" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <QuickActionCard
              icon={FaPlus}
              title="Add New Food"
              description="Add fresh items to your inventory."
              to="/dashboard/addfood"
              color="bg-gradient-to-r from-green-500 to-emerald-500"
            />
            <QuickActionCard
              icon={FaEye}
              title="View My Foods"
              description="Browse and manage all your food items in one place"
              to="/dashboard/myfood"
              color="bg-gradient-to-r from-blue-500 to-indigo-500"
            />
            <QuickActionCard
              icon={FaUtensils}
              title="Browse Fridge"
              description="Explore all available foods and discover new items"
              to="/fridge"
              color="bg-gradient-to-r from-purple-500 to-pink-500"
            />
            <QuickActionCard
              icon={FaHeart}
              title="My Profile"
              description="Update your personal information and preferences"
              to="/dashboard/myprofile"
              color="bg-gradient-to-r from-orange-500 to-red-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Foods */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-blue-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                  <FaLeaf className="text-white text-lg" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Recent Foods</h2>
              </div>
              <Link 
                to="/dashboard/myfood" 
                className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all duration-300"
              >
                View All <FaArrowRight />
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentFoods.length > 0 ? (
                recentFoods.map((food) => {
                  const expiryDate = new Date(food.ExpiryDate);
                  const today = new Date();
                  expiryDate.setHours(0, 0, 0, 0);
                  today.setHours(0, 0, 0, 0);
                  const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
                  const isExpired = daysUntilExpiry < 0;
                  
                  return (
                    <div key={food._id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                      <img 
                        src={food.FoodImage} 
                        alt={food.FoodTitle}
                        className="w-12 h-12 rounded-lg object-cover shadow-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 line-clamp-1">{food.FoodTitle}</h3>
                        <p className="text-sm text-gray-600">{food.category?.split(' ')[0]}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          isExpired ? 'bg-red-100 text-red-800' :
                          daysUntilExpiry <= 3 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {isExpired ? 'Expired' : 
                           daysUntilExpiry <= 3 ? `${daysUntilExpiry}d left` : 
                           'Fresh'}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">📦</div>
                  <p className="text-gray-600 mb-4">No foods added yet</p>
                  <Link 
                    to="/dashboard/addfood"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300"
                  >
                    <FaPlus /> Add Your First Food
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Expiring Soon */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-blue-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl">
                  <FaCalendarAlt className="text-white text-lg" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Expiring Soon</h2>
              </div>
              <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                {expiringSoonFoods.length} items
              </span>
            </div>
            
            <div className="space-y-4">
              {expiringSoonFoods.length > 0 ? (
                expiringSoonFoods.map((food) => {
                  const expiryDate = new Date(food.ExpiryDate);
                  const today = new Date();
                  expiryDate.setHours(0, 0, 0, 0);
                  today.setHours(0, 0, 0, 0);
                  const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={food._id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                      <img 
                        src={food.FoodImage} 
                        alt={food.FoodTitle}
                        className="w-12 h-12 rounded-lg object-cover shadow-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 line-clamp-1">{food.FoodTitle}</h3>
                        <p className="text-sm text-gray-600">Expires {format(expiryDate, 'MMM dd')}</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {daysUntilExpiry === 0 ? 'Today' : `${daysUntilExpiry}d`}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">✅</div>
                  <p className="text-gray-600">All foods are fresh!</p>
                  <p className="text-sm text-gray-500 mt-1">No items expiring soon</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Health Tips */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-8 shadow-2xl text-white">
          <div className="flex items-center gap-3 mb-4">
            <FaHeart className="text-2xl" />
            <h2 className="text-2xl font-bold">💡 Food Management Tip</h2>
          </div>
          <p className="text-lg leading-relaxed opacity-90">
            "First In, First Out (FIFO) - Always use older items before newer ones to minimize food waste. 
            Check your expiring items regularly and plan meals around them!"
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
