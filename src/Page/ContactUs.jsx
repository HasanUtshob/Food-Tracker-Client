import { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 md:p-8">
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-lg p-6 md:p-10">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-green-700 mb-2">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Have questions or feedback? We'd love to hear from you.
        </p>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
          <div className="flex flex-col items-center">
            <FaEnvelope className="text-green-600 text-2xl mb-2" />
            <p className="font-medium">shutshob@gmail.com</p>
          </div>
          <div className="flex flex-col items-center">
            <FaPhoneAlt className="text-green-600 text-2xl mb-2" />
            <p className="font-medium">+8801601949074</p>
          </div>
          <div className="flex flex-col items-center">
            <FaMapMarkerAlt className="text-green-600 text-2xl mb-2" />
            <p className="font-medium">Jamalpur Town</p>
          </div>
        </div>

        {/* Form + Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition"
            >
              Send Message
            </button>
          </form>

          {/* Map */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28945.18577265285!2d89.92727747486842!3d24.927020052737948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fd7f432d79ab59%3A0xba4e9a6ed6f6682c!2sJamalpur!5e0!3m2!1sen!2sbd!4v1754732791579!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "300px" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
