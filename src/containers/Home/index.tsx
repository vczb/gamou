import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import React from "react";

import "./styles.css";
import Wave1 from "@/icons/Wave1";
import HowItWorks from "@/components/HowItWorks";
import Advantages from "@/components/Advantages";
import Pricing from "@/components/Pricing";
import Wave2 from "@/icons/Wave2";
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <main className="leading-normal tracking-normal text-white gradient">
      <Navbar />
      <Hero />
      <div className="relative -mt-12 lg:-mt-24">
        <Wave1 />
      </div>
      <HowItWorks />
      <Advantages />
      <Pricing />
      <Wave2 />
      <GetStarted />
      <Footer />
    </main>
  );
};
export default Home;
