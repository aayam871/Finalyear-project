import React from "react";
import { motion } from "framer-motion";
import Backg from "./images/BannerBg.jpg";
import SideImage from "./images/BannerRight.png"; // Import your right side image
import Menu from "./Menu.jsx";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="w-full h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${Backg})`,
        filter: "brightness(1.2) contrast(1.2)",
        backgroundPosition: "bottom center",
        backgroundSize: "100% 200%",
      }}
    >
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 flex items-center justify-between h-full">
        {/* Left Text Content */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-white max-w-xl space-y-6 text-center md:text-left"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-wide text-white drop-shadow-2xl font-serif">
            Discover the Art of Flavor
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-gray-100 font-light drop-shadow-md max-w-xl font-serif">
            Satisfy your hunger with seamless ordering, speedy delivery, amazing
            taste.
          </p>

          <Link to="/menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-20 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-lg transition duration-300 font-serif"
            >
              Explore our Menu
            </motion.button>
          </Link>
        </motion.div>

        {/* Right: Image */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="hidden md:block max-w-md"
        >
          <img
            src={SideImage}
            alt="Delicious food"
            className="rounded-xl shadow-lg object-cover w-full h-auto"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Banner;
