import React from "react";

function Carpooling({ globalLocal }) {
  const carpoolList = [
    {
      start: "Indore",
      end: "Bhopal",
      start_time: "14:40",
      end_time: "18:30",
      total_time: "3h50",
      driver_name: "Krishna",
      price: 450,
    },
    {
      start: "Indore",
      end: "Bhopal",
      start_time: "09:15",
      end_time: "12:45",
      total_time: "3h30",
      driver_name: "Ravi",
      price: 480,
    },
    {
      start: "Indore",
      end: "Bhopal",
      start_time: "07:00",
      end_time: "10:50",
      total_time: "3h50",
      driver_name: "Priya",
      price: 440,
    },
    {
      start: "Indore",
      end: "Bhopal",
      start_time: "16:30",
      end_time: "20:20",
      total_time: "3h50",
      driver_name: "Suresh",
      price: 490,
    },
    {
      start: "Indore",
      end: "Bhopal",
      start_time: "11:00",
      end_time: "14:45",
      total_time: "3h45",
      driver_name: "Anjali",
      price: 430,
    },
    {
      start: "Indore",
      end: "Bhopal",
      start_time: "18:00",
      end_time: "21:40",
      total_time: "3h40",
      driver_name: "Vijay",
      price: 460,
    },
  ];

  return (
    <div className="flex flex-col gap-4 ">
      {/* Text Content */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-sm font-light tracking-wide">Initial Location</p>
          <h2 className="font-semibold text-lg">
            {globalLocal !== undefined ? globalLocal.start : ""}
          </h2>
        </div>

        {/* <div className="flex-grow h-[2px] bg-slate-500/40 mx-9 rounded-2xl" /> */}

        <div className="flex flex-col items-end">
          <p className="text-sm font-light tracking-wide">Destination</p>
          <h2 className="font-semibold text-lg">
            {globalLocal !== undefined ? globalLocal.end : ""}
          </h2>
        </div>
      </div>

      {/* Cards Container */}

      <div className="flex flex-col items-center gap-4">
        {carpoolList.map((data, index) => {
          return (
            <>
              <div
                className="bg-white shadow-md rounded-md flex flex-col w-full "
                key={index}
              >
                <div className="flex p-3 items-center justify-between">
                  <div className="flex flex-row items-center">
                    <div className="flex flex-col">
                      <p className="text-xs font-semibold text-black/70">
                        {data.start_time}
                      </p>
                      <p className="text-black text-sm font-semibold">
                        {globalLocal.start}
                      </p>
                    </div>
                    <div className="h-[2px] w-full bg-[#0a510995] rounded-2xl mx-2" />
                    <p className="text-xs font-medium w-[120px] text-black/50">
                      {data.total_time}
                    </p>
                    <div className="h-[2px] w-full bg-[#0a510995] rounded-2xl mx-2" />
                    <div className="flex flex-col ">
                      <p className="text-black/70 font-semibold text-xs">
                        {data.end_time}
                      </p>
                      <p className="text-black text-sm font-semibold w-[200px]">
                        {globalLocal.end}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row">
                    <p className="text-xl font-bold">₹{data.price}</p>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-slate-500/20 rounded-2xl" />

                <div className="flex p-3 items-center gap-4 justify-between">
                  <div className="flex gap-6">
                    <div className="flex gap-1 items-center">
                      <img src="car.svg" alt="car" className="w-6 opacity-70" />
                      <p className="text-[10px] font-bold text-[#5ff216]">EV</p>
                    </div>

                    <div className="flex gap-2 items-center text-black/80">
                      <img src="ByeWind.png" alt="car" className="w-6" />
                      <p className="text-xs ">{data.driver_name}</p>
                    </div>
                  </div>

                  <div>
                    <div className="bg-black text-white text-sm rounded-md w-fit px-3 py-2 cursor-pointer hover:bg-black/70 transition-all ease-in select-none">
                      <a
                        href="https://www.blablacar.in/ride-sharing/indore/bhopal"
                        className="text-[10px] font-bold"
                      >
                        Book Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Carpooling;
