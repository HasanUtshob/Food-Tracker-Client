import React from "react";
import { FaGavel, FaUserCheck, FaExclamationTriangle, FaHandshake, FaBalanceScale, FaEnvelope } from "react-icons/fa";

const ServiceTerms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 py-16">
      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
            <FaGavel className="animate-pulse" />
            <span>LEGAL TERMS</span>
            <FaGavel className="animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-teal-500 to-blue-500 mb-6 drop-shadow-sm">
            Terms of Service
          </h1>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            Please read these terms carefully before using our Food Tracker service.
          </p>
          
          <div className="text-sm text-gray-500 mt-4">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-green-100 space-y-8">
          {/* Acceptance of Terms */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl text-white shadow-lg">
                <FaHandshake size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Acceptance of Terms</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                By accessing and using the Food Tracker service, you accept and agree to be bound by 
                the terms and provision of this agreement. If you do not agree to abide by the above, 
                please do not use this service.
              </p>
              <p>
                These terms apply to all visitors, users, and others who access or use the service.
              </p>
            </div>
          </section>

          {/* Description of Service */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl text-white shadow-lg">
                <FaUserCheck size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Description of Service</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Food Tracker is a web-based application that helps users track food items, 
                monitor expiration dates, and reduce food waste.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Track food inventory and expiration dates</li>
                <li>Receive notifications about expiring foods</li>
                <li>Access food management statistics</li>
                <li>Educational content about food waste prevention</li>
              </ul>
            </div>
          </section>

          {/* User Responsibilities */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl text-white shadow-lg">
                <FaBalanceScale size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">User Responsibilities</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>As a user of our service, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use the service only for lawful purposes</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
                <li>Not interfere with or disrupt the service</li>
                <li>Respect the intellectual property rights of others</li>
              </ul>
            </div>
          </section>

          {/* Account Terms */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl text-white shadow-lg">
                <FaUserCheck size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Account Terms</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You must be 13 years or older to use this service</li>
                <li>You are responsible for maintaining account security</li>
                <li>You are responsible for all activities under your account</li>
                <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
                <li>One person or legal entity may maintain no more than one free account</li>
              </ul>
            </div>
          </section>

          {/* Prohibited Uses */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl text-white shadow-lg">
                <FaExclamationTriangle size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Prohibited Uses</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>You may not use our service:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations or laws</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
              </ul>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white shadow-lg">
                <FaBalanceScale size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Intellectual Property Rights</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The service and its original content, features, and functionality are and will remain 
                the exclusive property of Food Tracker and its licensors.
              </p>
              <p>
                The service is protected by copyright, trademark, and other laws. Our trademarks 
                and trade dress may not be used in connection with any product or service without our prior written consent.
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl text-white shadow-lg">
                <FaExclamationTriangle size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Disclaimer</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The information on this service is provided on an "as is" basis. To the fullest extent 
                permitted by law, this Company excludes all representations, warranties, conditions, 
                and terms whether express or implied.
              </p>
              <p>
                <strong>Food Safety Notice:</strong> While our service helps track expiration dates, 
                always use your judgment and follow food safety guidelines when consuming food items.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-gray-500 to-gray-600 rounded-2xl text-white shadow-lg">
                <FaBalanceScale size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Limitation of Liability</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                In no event shall Food Tracker, nor its directors, employees, partners, agents, 
                suppliers, or affiliates, be liable for any indirect, incidental, special, 
                consequential, or punitive damages, including without limitation, loss of profits, 
                data, use, goodwill, or other intangible losses.
              </p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-teal-500 to-green-500 rounded-2xl text-white shadow-lg">
                <FaGavel size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Changes to Terms</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl text-white shadow-lg">
                <FaEnvelope size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
            </div>
            <div className="text-gray-700 leading-relaxed">
              <p>
                If you have any questions about these Terms of Service, please contact us at:
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

export default ServiceTerms;
