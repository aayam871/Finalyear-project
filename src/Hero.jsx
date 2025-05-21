import React from "react";
import Agent from "./images/Agent.png";

const Hero = () => {
  return (
    <section className="relative bg-orange-400 py-28 px-6 md:px-20 overflow-hidden">
      {/* Glowing Orange Aura */}
      <div className="absolute top-0 left-5/3 w-[700px] h-[500px] bg-orange-300 blur-[140px] rounded-full -translate-x-1/2 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="md:w-1/2 text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 tracking-tight">
            Knock Knock. <br />
            <span className="text-orange-600">QuickBites</span> at Your Door!
          </h1>
          <p className="text-gray-800 text-lg mb-8 max-w-md leading-relaxed">
            Delicious meals, delivered hot — No delays, No compromises.
          </p>

          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-full overflow-hidden max-w-lg shadow-lg mb-6">
            <input
              type="text"
              placeholder="Search for your cravings..."
              className="flex-grow px-6 py-3 text-gray-800 text-base focus:outline-none bg-transparent"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 md:px-8 py-3 font-semibold transition-all">
              Search
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 mb-10 md:mb-0 flex justify-end">
          <img
            src={Agent}
            alt="Delivery Agent"
            className="w-72 md:w-[22rem] drop-shadow-[0_8px_20px_rgba(255,102,0,0.3)]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
