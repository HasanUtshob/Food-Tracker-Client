import React from "react";
import { FaShieldAlt, FaLock, FaUserShield, FaDatabase, FaCookieBite, FaEnvelope } from "react-icons/fa";

const PrivacyInfo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16">
      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
            <FaShieldAlt className="animate-pulse" />
            <span>PRIVACY & SECURITY</span>
            <FaShieldAlt className="animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 mb-6 drop-shadow-sm">
            Privacy Policy
          </h1>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          
          <div className="text-sm text-gray-500 mt-4">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-blue-100 space-y-8">
          {/* Information We Collect */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl text-white shadow-lg">
                <FaDatabase size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Information We Collect</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We collect information you provide directly to us, such as when you create an account, 
                add food items to your tracker, or contact us for support.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Account Information:</strong> Name, email address, and password</li>
                <li><strong>Food Data:</strong> Food items, expiration dates, quantities, and categories</li>
                <li><strong>Usage Information:</strong> How you interact with our service</li>
                <li><strong>Device Information:</strong> Browser type, operating system, and IP address</li>
              </ul>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl text-white shadow-lg">
                <FaUserShield size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">How We Use Your Information</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide, maintain, and improve our food tracking services</li>
                <li>Send you notifications about expiring foods</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Protect against fraudulent or illegal activity</li>
              </ul>
            </div>
          </section>

          {/* Information Sharing */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white shadow-lg">
                <FaLock size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Information Sharing</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties. 
                We may share information in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>With your consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and safety</li>
                <li>In connection with a business transfer</li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl text-white shadow-lg">
                <FaShieldAlt size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Data Security</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Secure data storage and backup procedures</li>
              </ul>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl text-white shadow-lg">
                <FaCookieBite size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Cookies and Tracking</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We use cookies and similar technologies to enhance your experience, analyze usage, 
                and provide personalized content. You can control cookie settings through your browser.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl text-white shadow-lg">
                <FaUserShield size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Your Rights</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access and update your personal information</li>
                <li>Delete your account and associated data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request data portability</li>
                <li>Lodge a complaint with supervisory authorities</li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl text-white shadow-lg">
                <FaEnvelope size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
            </div>
            <div className="text-gray-700 leading-relaxed">
              <p>
                If you have any questions about this Privacy Policy or our data practices, 
                please contact us at:
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

export default PrivacyInfo;
