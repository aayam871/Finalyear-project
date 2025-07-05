import React from "react";
import { motion } from "framer-motion";
import devImg from "./images/dev-working.png";

const Hudaixa = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex flex-col items-center justify-center px-6 py-12">
      
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-extrabold font-serif text-white drop-shadow-lg mb-2 select-none"
      >
        QuickBites App Coming Soon......
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="bg-white rounded-3xl shadow-2xl p-10 max-w-4xl w-full text-center"
      >
        <p className="text-xl text-orange-700 font-semibold mb-2">
          We are working hard to bring the QuickBites app to Play Store and App
          Store with the best experience for you.
        </p>

        <img
          src={devImg}
          alt="Developers working"
          className="mx-auto mb-2 max-w-sm w-auto rounded-xl shadow-lg"
        />

        <p className="text-gray-500 italic">
          Stay tuned. Your cravings will be answered soon!
        </p>
      </motion.div>
    </section>
  );
};

export default Hudaixa;
