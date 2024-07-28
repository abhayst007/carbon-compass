import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutUs from "../components/AboutUs";
import Services from "../components/Services";
import Footer from "../components/Footer";

import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#EDF1D6] w-full h-full flex flex-col ">
      <Navbar />

      <div className=" relative">
        <img
          src="camp_car.png"
          alt="camp_car.png"
          className="absolute w-[250px] mt-[240px]"
        />
        <Hero />
        <AboutUs />
        <Services />
        <div className="w-full h-[2px] bg-[#00000036]" />

        <div className="flex flex-row justify-between items-start px-36 my-24">
          <h1 className="expanded text-[40px] text-[#000000]">
            Let's Get Started.
          </h1>

          <div className="flex flex-col gap-6 ">
            <p className="text-[#333333] text-[24px]">
              Unlock the potential of sustainable transport with our
              <br /> innovative solutions.
            </p>
            <div
              onClick={() => navigate("sign-in")}
              className="bg-[#AAF593] text-white gap-2 text-[12px] px-[24px] w-fit flex items-center  transition-all ease-in py-[10px] rounded-lg hover:bg-[#AAF59380] cursor-pointer"
            >
              <p className="text-[13px] text-[#000000]  tracking-wider">
                PRODUCTS & SERVICES
              </p>
              <img src="arrow_left.svg" alt="arrow" className="w-[15px]" />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Home;
