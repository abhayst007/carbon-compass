import React from 'react';

const blogs = [
  {
    title: "10 Tips for Sustainable Travel",
    content: "Discover practical tips to make your travels more eco-friendly, from packing light to choosing sustainable accommodations...",
    link: "https://sustainabletravel.org/top-10-tips-for-sustainable-travel/"
  },
  {
    title: "How to Reduce Your Carbon Footprint on Vacation",
    content: "Learn how to minimize your environmental impact while enjoying your vacation with these simple strategies...",
    link: "https://online.jwu.edu/blog/travel-tips-how-reduce-your-carbon-footprint/"
  },
  {
    title: "Green Travel: Eco-Friendly Transportation Options",
    content: "Explore various eco-friendly transportation options that can help you travel green, from biking to using public transit...",
    link: "https://www.itilite.com/in/blog/sustainable-travel-options/"
  }
];

function Travel() {
  return (
    <div className=" w-full min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Green Travel Tips</h1>
      <div className="flex flex-col gap-8 w-full max-w-3xl">
        {blogs.map((blog, index) => (
          <div key={index} className="bg-[#ffffff] p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <h2 className="text-xl font-semibold mb-4">{blog.title}</h2>
            <p className="text-base mb-4">{blog.content}</p>
            <a 
              href={blog.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-500 hover:underline"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Travel;
