import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      navigate("/dashboard");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="bg-[#EDF1D6] w-full min-h-screen flex flex-col items-center relative overflow-hidden">
      <Navbar />
      <img
        src="camp_car.png"
        alt="camp_car.png"
        className="absolute w-[250px] mt-[240px] left-0"
      />
      <div className="bg-[#FCFFEE] px-8 rounded-3xl drop-shadow-md w-full max-w-md py-12 mt-20">
        <h2 className="text-2xl font-semibold text-center mb-4 expanded">Sign In</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="flex relative h-10 w-full text-base rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="flex relative h-10 w-full text-base rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <button
            onClick={handleLogin}
            className="bg-black text-white text-base font-medium rounded-md px-4 py-2 hover:bg-black/70 transition-all ease-in select-none"
          >
            Login
          </button>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Login;
