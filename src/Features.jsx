import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaBolt, FaUtensils, FaShieldAlt, FaLeaf } from "react-icons/fa";
import BannerBg from "./images/BannerBg.jpg";

const features = [
  {
    icon: <FaBolt />,
    title: " Fast Delivery",
    description:
      "Freshly prepared and delivered fast, piping hot to your door — savor every bite, exactly when you want it, every time.",
  },
  {
    icon: <FaUtensils />,
    title: "Unique Recipes",
    description:
      "Crafted with creativity, served with consistency — every dish on your plate whispers a story.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Safe & Secure",
    description:
      "Built on strength and trust, secured with care — every payment and piece of data guarded beyond compare.",
  },
  {
    icon: <FaLeaf />,
    title: "Fresh & Organic",
    description:
      "Only the freshest, cleanest, greenest, and healthiest ingredients  make it to your plate.",
  },
];

const Features = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y =
    (useTransform(scrollYProgress, [0, 1], [0, 120]),
    {
      stiffness: 60,
      damping: 15,
    });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-28 pb-20 px-6 md:px-16 font-sans"
    >
      <motion.div
        style={{
          y,
          backgroundImage: `url(${BannerBg})`,
          backgroundPosition: "top center",
          filter: "brightness(1.1) contrast(1.3)",
          backgroundSize: "100% 200%",
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
        className="absolute inset-0 z-0 w-full h-full bg-cover bg-center"
      />
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Why{" "}
            <span className="bg-orange-500 rounded-xl px-4 py-1 text-gray-900 shadow-lg">
              QuickBites?
            </span>
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group bg-orange-100 hover:bg-orange-300 backdrop-blur-lg border border-orange-400/40 hover:border-orange-600 rounded-2xl shadow-xl p-8 md:p-8 transition-all duration-300 transform hover:-translate-y-1 text-center"
            >
              <div
                className="text-5xl text-gray-800 mb-4 group-hover:scale-110 group-hover:rotate-1 transition-transform duration-300 drop-shadow-lg"
                aria-hidden="true"
              >
                {feature.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-orange-900 group-hover:text-orange-900">
                {feature.title}
              </h3>
              <p className="text-sm md:text-lg text-gray-700 mb-4 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
