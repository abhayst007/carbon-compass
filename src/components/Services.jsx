import React from "react";

function Services() {
  return (
    <div
      className="mx-36 my-20 h-fit  flex flex-col items-center gap-10 py-14"
       id="Services"
    >
      <h1 className="expanded text-[44px] text-[#093014]">Services</h1>

      <div className=" gap-4 flex flex-row w-full justify-between">
        <div className="flex flex-col gap-10 justify-center  rounded-3xl items-center drop-shadow-lg bg-[#FCFFEA] w-[340px] h-[350px]">
          <img src="gis_route.svg" alt="services" className="w-40" />
          <p className="tracking-wide text-[26px] text-center font-extrabold text-[#113E1E]">
            Route <br />
            Optimisation
          </p>
        </div>
        <div className="flex flex-col gap-10 justify-center  rounded-3xl items-center drop-shadow-lg bg-[#FCFFEA] w-[340px] h-[350px]">
          <img src="carpooling.svg" alt="services" className="w-28" />
          <p className="tracking-wide text-[26px] text-center font-extrabold text-[#113E1E]">
            Car Pooling <br />
            Services
          </p>
        </div>
        <div className="flex flex-col gap-10 justify-center  rounded-3xl items-center drop-shadow-lg bg-[#FCFFEA] w-[340px] h-[350px]">
          <img src="ruppee.svg" alt="services" className="w-32" />
          <p className="tracking-wide text-[26px] text-center font-extrabold text-[#113E1E]">
            Cost <br /> Savings
          </p>
        </div>
      </div>

      <div className=" flex flex-row w-full gap-20 justify-center">
        <div className="flex flex-col gap-10 justify-center  rounded-3xl items-center drop-shadow-lg bg-[#FCFFEA] w-[340px] h-[350px]">
          <img src="factory.svg" alt="services" className="w-32" />
          <p className="tracking-wide text-[26px] text-center font-extrabold text-[#113E1E]">
            Emission <br />
            Analytics
          </p>
        </div>
        <div className="flex flex-col gap-10 justify-center  rounded-3xl items-center drop-shadow-lg bg-[#FCFFEA] w-[340px] h-[350px]">
          <img src="gtt.svg" alt="services" className="w-32" />
          <p className="tracking-wide text-[26px] text-center font-extrabold text-[#113E1E]">
            Green Travel <br />
            Tips
          </p>
        </div>
      </div>
    </div>
  );
}

export default Services;
