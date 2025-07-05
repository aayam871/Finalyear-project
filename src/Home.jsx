import React, { useState } from "react";
import Hero from "./Hero";
import Features from "./Features";
import Banner from "./Banner";
import Download from "./Download";
import SplashScreen from "./SplashScreen";
import Review from "./Review";

const Home = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <>
          <Hero />
          <Features />
          <Banner />
          <Review />
          <Download />
        </>
      )}
    </>
  );
};

export default Home;
