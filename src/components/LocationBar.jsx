import React from "react";
import { NavLink } from "react-router-dom";

function LocationBar({location}) {
  return (
    <div className="w-full border-b-2 h-16 items-center flex px-7 justify-between select-none">


      {/* Location */}
      <div className="flex gap-4">
      <img src="Sidebar.svg" alt="sidebar"  className="w-6 hover:bg-black/5 cursor-pointer "/>
        <NavLink
          className="text-slate-400 text-base font-thin hover:underline"
          to={"/dashboard"}
        >
          Dashboard
        </NavLink>
        <p>/</p>
        <p className="text-black font-medium">{location}</p>
      </div>

      <img src="Bell.svg" alt="notification"  className="w-6 hover:bg-black/5 cursor-pointer"/>


    </div>
  );
}

export default LocationBar;
