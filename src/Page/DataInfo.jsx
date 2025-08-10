import React from "react";
import { FaCookieBite, FaCog, FaChartBar, FaShieldAlt, FaToggleOn, FaEnvelope } from "react-icons/fa";

const DataInfo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-16">
      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
            <FaCookieBite className="animate-pulse" />
            <span>COOKIE INFORMATION</span>
            <FaCookieBite className="animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 mb-6 drop-shadow-sm">
            Cookie Policy
          </h1>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            Learn about how we use cookies and similar technologies to enhance your experience.
          </p>
          
          <div className="text-sm text-gray-500 mt-4">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-orange-100 space-y-8">
          {/* What Are Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl text-white shadow-lg">
                <FaCookieBite size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">What Are Cookies?</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
                They help websites remember information about your visit, which can make it easier to visit the site again 
                and make the site more useful to you.
              </p>
              <p>
                We use cookies and similar technologies to enhance your experience, analyze site usage, 
                and provide personalized content and advertisements.
              </p>
            </div>
          </section>

          {/* Types of Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl text-white shadow-lg">
                <FaCog size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Types of Cookies We Use</h2>
            </div>
            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FaShieldAlt className="text-green-600" />
                  Essential Cookies
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  These cookies are necessary for the website to function properly. They enable core functionality 
                  such as security, network management, and accessibility.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                  <li>Authentication and login status</li>
                  <li>Security and fraud prevention</li>
                  <li>Load balancing and site performance</li>
                  <li>Accessibility features</li>
                </ul>
                <div className="mt-3 text-sm text-gray-500">
                  <strong>Duration:</strong> Session or up to 1 year
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FaChartBar className="text-blue-600" />
                  Analytics Cookies
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  These cookies help us understand how visitors interact with our website by collecting 
                  and reporting information anonymously.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                  <li>Page views and user interactions</li>
                  <li>Traffic sources and referrals</li>
                  <li>Site performance metrics</li>
                  <li>Error tracking and debugging</li>
                </ul>
                <div className="mt-3 text-sm text-gray-500">
                  <strong>Duration:</strong> Up to 2 years
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FaCog className="text-purple-600" />
                  Functional Cookies
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  These cookies enable enhanced functionality and personalization, such as remembering 
                  your preferences and settings.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                  <li>Language and region preferences</li>
                  <li>Theme and display settings</li>
                  <li>Food tracking preferences</li>
                  <li>Notification settings</li>
                </ul>
                <div className="mt-3 text-sm text-gray-500">
                  <strong>Duration:</strong> Up to 1 year
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FaChartBar className="text-orange-600" />
                  Marketing Cookies
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  These cookies are used to deliver advertisements more relevant to you and your interests.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                  <li>Personalized advertisements</li>
                  <li>Social media integration</li>
                  <li>Campaign effectiveness tracking</li>
                  <li>Cross-site behavioral tracking</li>
                </ul>
                <div className="mt-3 text-sm text-gray-500">
                  <strong>Duration:</strong> Up to 1 year
                </div>
              </div>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl text-white shadow-lg">
                <FaShieldAlt size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Third-Party Cookies</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We may also use third-party services that set cookies on your device. These include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                <li><strong>Social Media Platforms:</strong> For social sharing and login functionality</li>
                <li><strong>Content Delivery Networks:</strong> For faster content delivery</li>
                <li><strong>Customer Support Tools:</strong> For chat and support functionality</li>
              </ul>
              <p>
                These third parties have their own privacy policies and cookie practices, 
                which we encourage you to review.
              </p>
            </div>
          </section>

          {/* Managing Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl text-white shadow-lg">
                <FaToggleOn size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Managing Your Cookie Preferences</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>You have several options for managing cookies:</p>
              
              <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Browser Settings</h3>
                <p className="mb-3">Most web browsers allow you to control cookies through their settings:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Block all cookies</li>
                  <li>Block third-party cookies only</li>
                  <li>Delete cookies when you close your browser</li>
                  <li>Get notified when a cookie is set</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Cookie Consent Manager</h3>
                <p className="mb-3">
                  We provide a cookie consent manager that allows you to:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Accept or reject different types of cookies</li>
                  <li>Change your preferences at any time</li>
                  <li>View detailed information about each cookie</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-2xl border border-yellow-200">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> Disabling certain cookies may affect the functionality of our website 
                  and your user experience.
                </p>
              </div>
            </div>
          </section>

          {/* Updates to Policy */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl text-white shadow-lg">
                <FaCog size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Updates to This Policy</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices 
                or for other operational, legal, or regulatory reasons. We will notify you of any material 
                changes by posting the updated policy on our website.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl text-white shadow-lg">
                <FaEnvelope size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
            </div>
            <div className="text-gray-700 leading-relaxed">
              <p>
                If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
              </p>
                  <div className="mt-4 space-y-2">
                <p><strong>Email:</strong> shutshob@gmail.com</p>
                <p><strong>Address:</strong> 123 Food Street, Nutrition City, FC 12345</p>
                <p><strong>Phone:</strong> +8801601949074</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DataInfo;
