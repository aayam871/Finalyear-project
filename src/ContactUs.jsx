import React, { useState } from "react";

const ContactUs = () => {
  const [status, setStatus] = useState("");

  return (
    <section className="max-w-4xl mx-auto px-6 py-12 md:px-20 bg-white rounded-lg shadow-lg">
      <h2 className="text-4xl font-extrabold text-orange-500 mb-8 text-center font-serif">
        Contact Us
      </h2>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Info Section */}
        <div className="md:w-1/2 space-y-6 text-black font-medium font-serif">
          <p className="text-lg">
            <span className="font-semibold">📞 Phone:</span> +977-98420741
          </p>
          <p className="text-lg">
            <span className="font-semibold">📧 Email:</span>{" "}
            madhayaraat@quickbites.com
          </p>
          <p className="text-lg">
            <span className="font-semibold">📍 Location:</span> Rajmarga
            Chauraha,Butwal,Nepal
          </p>
          <p className="text-lg">
            <span className="font-semibold">⏰ Opening Hours:</span> 24 hour
            (Every day)
          </p>
          <p className="text-lg italic text-gray-900">
            Have any questions or requests? We’re here to help! Send us a
            message or call anytime.
          </p>
        </div>

        <form
          action="https://formspree.io/f/xkgbqrpy"
          method="POST"
          className="md:w-1/2 flex flex-col space-y-6"
          onSubmit={() => setStatus("")}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="border border-orange-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="border border-orange-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            rows="5"
            className="border border-orange-300 rounded-md px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-green-600 font-semibold">{status}</p>
    </section>
  );
};

export default ContactUs;
