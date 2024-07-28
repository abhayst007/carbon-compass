import React from "react";

function Footer() {
  const links = ["Privacy", "Terms", "Contact"];

  return (
    <div className="px-36 h-20 w-full bg-[#FBFFE5] flex items-center justify-between">
      <img src="logo.svg" alt="logo" className="w-56" />
      <div className="flex gap-7">
        {links.map((data, index) => {
          return (
            <a
              className="text-[15px] cursor-pointer tracking-wider"
              key={index}
              href={`#${data}`}
            >
              {data}
            </a>
          );
        })}
      </div>
      <img src="Socials.svg" alt="logo" className="w-32 hover:cursor-pointer" />
    </div>
  );
}

export default Footer;
