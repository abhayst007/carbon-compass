import React from "react";

function Hero() {
  return (
    <div className="h-fit mt-10 px-36 relative flex items-center justify-between " id="Home">
      
      
      {/* Text Content */}
      <div className="flex flex-col gap-4">
        <h1 className="changeme  text-5xl">
          Greener <span className="text-[#398225] changeme">Routes</span>
          <br /> Smarter Choices
        </h1>
        <h2 className="font-semibold">Optimize Your Journey for a Sustainable Future</h2>
        <p className="font-medium">
          Transform your transport operations with intelligent route planning,<br/>
          fuel-saving insights, and eco-friendly practices.Make every move count<br/>
          towards a greener tomorrow.
        </p>
      </div>
      {/* Image  */}
      <img src="gps.png" alt="gps" className="w-[500px]" />
    </div>
  );
}

export default Hero;
