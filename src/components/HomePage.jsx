import React from "react";
import Features from "./Features";
import FAQ from "./FAQ";
import Footer from "./Footer";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";

const HomePage = () => {
  return (
    <div
      className="flex flex-col min-h-screen w-full overflow-x-hidden z-10"
      style={{
        backgroundImage: "url('/mesh-gradient-1.png')", // Public folder path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar />
      <HeroSection />
      <Features />
      <FAQ />
      <Footer />
    </div>
  );
};

export default HomePage;
