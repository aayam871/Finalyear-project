import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "./images/QuickBites_Logo_Transparent1.png";

const SplashScreen = ({ onComplete }) => {
  const [animationDone, setAnimationDone] = useState(false);

  return (
    <AnimatePresence>
      {!animationDone && (
        <motion.div
          className="fixed inset-0 bg-white flex items-center justify-center z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src={logo}
            alt="QuickBites Logo"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 2.5, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-32 h-32 object-contain"
            onAnimationComplete={() => {
              setAnimationDone(true);
              onComplete();
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
