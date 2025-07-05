import React from "react";
import { useNavigate } from "react-router-dom";
import googlePlay from "./images/Playstore.png";
import appleStore from "./images/Appstore.png";
import sideImage from "./images/screen.png";

const Download = () => {
  const navigate = useNavigate();
  
  return (
    <section className="bg-white py-10 px-5 md:px-20 flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2 mb-10 md:mb-0">
        <h1 className="text-3xl md:text-4xl font-extrabold leading-snug mb-5 text-black font-serif">
          <div>
            <span className="text-orange-500">QuickBites-</span>
          </div>
          <div>Nepal’s Top Food Delivery App</div>
        </h1>

        <p className="text-gray-600 text-lg mb-3 font-serif">
          Enjoy exclusive deals and get your favorite food delivered fast.
        </p>
        <p className="text-gray-600 text-lg mb-3 font-serif">
          Discover top-rated restaurants and explore menus in seconds.
        </p>
        <p className="text-orange-500 text-lg font-semibold mb-6">
          Download the QuickBites App today – It’s fast, free, and delicious!
        </p>

        <div className="flex space-x-4">
          <button onClick={() => navigate("/hudaixa")}>
            <img
              src={googlePlay}
              alt="Get it on Google Play"
              className="h-12 cursor-pointer"
            />
          </button>
          <button onClick={() => navigate("/hudaixa")}>
            <img
              src={appleStore}
              alt="Download on the App Store"
              className="h-12 cursor-pointer"
            />
          </button>
        </div>
      </div>

      
      <div className="md:w-1/2">
        <img
          src={sideImage}
          alt="App preview"
          className="w-full max-w-md mx-auto"
        />
      </div>
    </section>
  );
};

export default Download;
