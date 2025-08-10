import axios from "axios";
import { isBefore, parseISO, format } from "date-fns";
import React, { use, useEffect, useState } from "react";
import { Link } from "react-router";
import Loading from "../component/Loading";
import { AuthContext } from "../Context/AuthContext";
import { FaSearch, FaFilter, FaSortAmountDown, FaSortAmountUp, FaCalendarAlt, FaTag, FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Fridge = () => {
  const { loading, setloading, User } = use(AuthContext);
  const [result, setresult] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // asc or desc
  const [sortBy, setSortBy] = useState("FoodTitle"); // FoodTitle, ExpiryDate, category
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // fetch data
  useEffect(() => {
    const loadFood = async () => {
      setloading(true);
      const res = await axios.get("http://localhost:3000/foods");
      setresult(res.data);
      setloading(false);
    };

    loadFood();
  }, [setloading]);

  const Today = new Date();

  const handlesearch = async (e) => {
    e.preventDefault();
    setloading(true);
    const form = e.target.searchText.value;
    const res = await axios.get(`http://localhost:3000/foods/search?q=${form}`);
    setresult(res.data);
    setCurrentPage(1); // Reset to first page after search
    setloading(false);
  };

  if (loading) return <Loading></Loading>;

  // filter category
  const filtercategory = selectedCategory
    ? result.filter((food) => food.category === selectedCategory)
    : result;

  // Sort functionality
  const sortedData = [...filtercategory].sort((a, b) => {
    let aValue, bValue;
    
    if (sortBy === "ExpiryDate") {
      aValue = new Date(a.ExpiryDate);
      bValue = new Date(b.ExpiryDate);
    } else {
      aValue = a[sortBy]?.toLowerCase() || "";
      bValue = b[sortBy]?.toLowerCase() || "";
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sortedData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("asc");
    }
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="w-11/12 md:w-10/12 mx-auto py-8">
        {/* Header */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <span className="animate-pulse">🥗</span>
            <span>FOOD COLLECTION</span>
            <span className="animate-pulse">🥗</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 mb-4 drop-shadow-sm">
            Food Fridge
          </h1>
          
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Discover and manage your delicious food collection with advanced filtering and sorting
          </p>
          
          <div className="mt-6 flex justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Fresh Items</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Expired Items</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Total: {sortedData.length} items</span>
            </div>
          </div>
        </section>

        {/* Enhanced Filter & Search Section */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-blue-100 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaFilter className="text-blue-500" />
                Filter by Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full p-3 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700 bg-white"
              >
                <option value="">🌟 All Categories</option>
                <option value="Fruits 🍎🍌">🍎 Fruits</option>
                <option value="Vegetables 🥦🥕">🥦 Vegetables</option>
                <option value="Dairy 🥛🧀">🥛 Dairy</option>
                <option value="Sweets & Snacks 🍩🍫">🍩 Sweets & Snacks</option>
                <option value="Proteins 🍗🥩">🍗 Proteins</option>
                <option value="Fast Food & Junk Food 🍕🍔">🍕 Fast Food</option>
                <option value="Grains 🍚🍞">🍚 Grains</option>
                <option value="Beverages ☕🥤">☕ Beverages</option>
              </select>
            </div>

            {/* Sort Options */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                {sortOrder === "asc" ? <FaSortAmountUp className="text-green-500" /> : <FaSortAmountDown className="text-orange-500" />}
                Sort by
              </label>
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700 bg-white"
                >
                  <option value="FoodTitle">📝 Name</option>
                  <option value="ExpiryDate">📅 Expiry Date</option>
                  <option value="category">🏷️ Category</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  className="px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105"
                >
                  {sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaSearch className="text-purple-500" />
                Search Foods
              </label>
              <form onSubmit={handlesearch} className="flex gap-2">
                <input
                  type="text"
                  name="searchText"
                  placeholder="Search by name or category..."
                  className="flex-1 p-3 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-md hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                >
                  <FaSearch />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Food Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentItems?.map((food) => {
            const isExpired = isBefore(parseISO(food.ExpiryDate), Today);
            const expiryDate = parseISO(food.ExpiryDate);
            const daysUntilExpiry = Math.ceil((expiryDate - Today) / (1000 * 60 * 60 * 24));

            return (
              <div
                key={food._id}
                className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200 hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 overflow-hidden relative"
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-10">
                  {isExpired ? (
                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      Expired
                    </span>
                  ) : daysUntilExpiry <= 3 ? (
                    <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      Expires Soon
                    </span>
                  ) : (
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                      Fresh
                    </span>
                  )}
                </div>

                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={food?.FoodImage}
                    alt={food?.FoodTitle}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h2 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                    {food?.FoodTitle}
                  </h2>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaTag className="text-blue-500" />
                      <span className="font-medium">Category:</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                        {food?.category?.split(' ')[0]}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-medium">Quantity:</span>
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold">
                        {food?.Quantity}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaCalendarAlt className="text-purple-500" />
                      <span className="font-medium">Expires:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        isExpired ? 'bg-red-100 text-red-800' : 
                        daysUntilExpiry <= 3 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {format(expiryDate, 'MMM dd, yyyy')}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link to={`/fooddetails/${food._id}`}>
                    <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-4 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 font-semibold">
                      <FaEye />
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </section>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-blue-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, sortedData.length)} of {sortedData.length} items
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <FaChevronLeft />
                </button>

                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    const isCurrentPage = page === currentPage;
                    
                    // Show first page, last page, current page, and pages around current page
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                            isCurrentPage
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-110'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:scale-105'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span key={page} className="px-2 py-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* No Results Message */}
        {currentItems.length === 0 && (
          <section className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No foods found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSelectedCategory("");
                setCurrentPage(1);
                document.querySelector('input[name="searchText"]').value = "";
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl shadow-md hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
            >
              Clear All Filters
            </button>
          </section>
        )}
      </div>
    </div>
  );
};

export default Fridge;
