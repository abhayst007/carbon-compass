import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Overview({
  mileage,
  distance,
  vehicleCost,
  carpoolCost,
  vehicleEmission,
  carpoolEmission,
}) {
  const costData = {
    labels: ["Personal Vehicle Cost", "Carpool Cost"],
    datasets: [
      {
        data: [vehicleCost, carpoolCost],
        backgroundColor: ["#fc123d", "#00fa36"],
        hoverBackgroundColor: ["#a31731", "#0ca62d"],
      },
    ],
  };

  const emissionData = {
    labels: ["Personal Vehicle Emission", "Carpool Emission"],
    datasets: [
      {
        data: [vehicleEmission, carpoolEmission],
        backgroundColor: ["#fc123d", "#00fa36"],
        hoverBackgroundColor: ["#a31731", "#0ca62d"],
      },
    ],
  };

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col w-full md:w-1/3 p-4 border rounded-lg shadow-md">
        <p className="text-sm font-semibold tracking-wide">Vehicle Mileage</p>
        <p className="text-xl font-semibold text-black/80">{mileage} Km/l</p>
      </div>

      <div className="flex flex-col w-full md:w-1/3 p-4 border rounded-lg shadow-md">
        <p className="text-sm font-semibold tracking-wide">
          Total Distance of Route
        </p>
        <p className="text-xl font-semibold text-black/80">{distance} Km</p>
      </div>

      <div className="flex flex-col w-full md:w-1/3 p-4 border rounded-lg shadow-md">
        <p className="text-sm font-semibold tracking-wide">Cost Analysis</p>
        <Pie data={costData} />
      </div>

      <div className="flex flex-col w-full md:w-1/3 p-4 border rounded-lg shadow-md">
        <p className="text-sm font-semibold tracking-wide">Emission Analysis</p>
        <Pie data={emissionData} />
      </div>
    </div>
  );
}

export default Overview;
