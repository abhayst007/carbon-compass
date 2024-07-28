import React from "react";
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const links = ["Home", "About Us", "Services","Support"];
  const navigate = useNavigate();
  return (
    <div className="w-full border-b-2 h-16 items-center transition-all ease-in flex px-36 justify-between select-none bg-[#F9FFE0] relative overflow-hidden">
      <img src="clovers_left.png" alt="clover" className="absolute left-0" />
      <img src="clovers_right.png" alt="clover" className="absolute right-0" />

      <img src="logo.svg" alt="logo" className="w-60" />

      {/* <div className="flex gap-14 items-center"> */}
        {/* NavLinks */}
        <div className="flex gap-7">
          {links.map((data, index) => {
            return (
              <a
                className="text-[14px] cursor-pointer "
                key={index}
                href={`/#${data}`}
              >
                {data}
              </a>
            );
          })}
        </div>

        {/* Action Button */}
        <div 
        onClick={() => navigate('sign-in')}
        className="bg-black text-white text-[12px]  transition-all ease-in px-[24px] py-[5px] rounded-lg hover:bg-black/70 cursor-pointer"
>
          <p>Sign In</p>
        </div>
      {/* </div> */}
    </div>
  );
}

export default Navbar;
