import React, { useState } from "react";
function Sidebar({ selection, setLocation }) {
  const [links, setLinks] = useState([
    {
      name: "Route Optimization",
      icon: "mingcute_location-line.svg",
      path: "route-optimization",
      active: true,
    },
    {
      name: "Car Pooling",
      icon: "hugeicons_car-03.svg",
      path: "carpooling",
      active: false,
    },
    {
      name: "Cost Savings",
      icon: "solar_dollar-linear.svg",
      path: "cost-savings",
      active: false,
    },
    {
      name: "Emission Analytics",
      icon: "hugeicons_factory.svg",
      path: "emission-analytics",
      active: false,
    },

    {
      name: "Weather and Air Quality",
      icon: "fluent_weather-haze-24-regular.svg",
      path: "weather-air-quality",
      active: false,
    },
    {
      name: "Green Travel Tips",
      icon: "material-symbols_travel-explore.svg",
      path: "green-travel-tips",
      active: false,
    },
    // {
    //   name: "Sustainability Report",
    //   icon: "mdi_file-report-outline.svg",
    //   path: "sustainability-report",
    //   active: false,
    // },
    {
      name: "Overview",
      icon: "ChartPieSlice.svg",
      path: "overview",
      active: false,
    },
  ]);

  const changeState = (path, name) => {
    setLinks(
      links.map((link) =>
        link.path === path
          ? { ...link, active: true }
          : { ...link, active: false }
      )
    );

    selection(path);
    setLocation(name);
  };

  return (
    <div className="h-screen w-64  border-r-2 px-4 py-7">
      {/* Parent */}
      <div className="flex flex-col h-full items-center w-full gap-10 justify-between">
        {/* Logo and Links */}
        <div className="flex flex-col items-center w-full gap-10">
          {/* Logo */}
          <img src="logo.svg" className="w-56 select-none" alt="logo" />

          {/* Links */}

          <div className="w-full flex flex-col gap-2">
            {links.map((data) => {
              return (
                <div
                  key={data.name}
                  onClick={() => changeState(data.path, data.name)}
                  className={
                    data.active
                      ? "flex flex-row items-center rounded-2xl gap-3 select-none cursor-pointer bg-black/5 transition-all py-3 px-[14px] ease-in duration-300"
                      : "flex flex-row items-center rounded-2xl gap-3 select-none cursor-pointer hover:bg-black/5 transition-all py-3 px-[14px] ease-in duration-300"
                  }
                >
                  <img src={data.icon} alt={data.icon} className="w-6" />
                  <p className="font-sans text-sm ">{data.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full items-center flex flex-row rounded-2xl gap-3 select-none cursor-pointer hover:bg-black/5 transition-all py-3 px-[14px] ease-in duration-300">
          <img src="ByeWind.png" alt="profile" />
          <p className="font-sans text-sm ">ByeWind</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
