import React from "react";
import Features from "./Features";
import FAQ from "./FAQ";
import Footer from "./Footer";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
const HomePage = () => {
  return (
    <div className="flex flex-col space-y-4 max-w-100vw overflow-x-hidden ">
      <Navbar />
      <HeroSection />
      <Features />
      <FAQ />
      <Footer />
    </div>
  );
};

export default HomePage;
