import React from "react";

function AboutUs() {
  return (
    <div className="mx-36 mt-20 my-20 h-fit  flex flex-col items-center gap-10 bg-[#FBFFE5] rounded-xl drop-shadow-md py-14"  id="About Us">
      <h1 className="expanded text-[44px] text-[#3BB004]">Our Mission</h1>

      <div className="px-20  gap-6 flex flex-col">
        <p className="tracking-wide text-[18px] text-center text-[#2C2C2C]">
          At CarbonCompass, our mission is to revolutionize the transportation
          industry by providing innovative, sustainable solutions that optimize
          efficiency and reduce environmental impact.
        </p>

        <p className="tracking-wide text-[18px] text-center text-[#2C2C2C]">
          We believe that smarter transport choices can lead to a greener
          planet, and we are dedicated to helping businesses achieve their
          sustainability goals through cutting-edge technology.
        </p>
      </div>

      <div className="flex flex-row  gap-24 items-start">
        <div className="flex flex-col items-center text-center  gap-3">
          <img src="truck.svg" alt="truck" className="w-24" />
          <p className="text-[14px] text-[#4ECB71] font-semibold">
            Green Transport
          </p>
        </div>
        <div className="flex flex-col items-center gap-3    ">
          <img src="co_reduction.svg" alt="reduction" className="w-[70px]" />
          <p className="text-[14px] text-[#4ECB71] font-semibold text-center ">
            Reduction of <br />
            Carbon Footprint
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <img src="money_bag.svg" alt="money" className="w-24" />
          <p className="text-[14px] text-[#4ECB71] font-semibold text-center">
            Cost Savings
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
