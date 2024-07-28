import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Cost({ distance, selection, setLocation,mileage,setMileage,vehicleCost,carpoolCost,setVehicleCost,setCarpoolCost}) {
  // const [mileage, setMileage] = useState("");
  // const [vehicleCost, setVehicleCost] = useState(null);
  // const [carpoolCost, setCarpoolCost] = useState(null);
  const [costSavings, setCostSavings] = useState(null);
  const [costData, setCostData] = useState(null);
  const navigate = useNavigate();

  const fuelCostPerLitre = 103.44; 
  const carpoolCostPerKm = 4; // in currency units

  const calculateVehicleCost = (distance, mileage) => {
    return (distance / mileage) * fuelCostPerLitre;
  };

  const calculateCarpoolCost = (distance) => {
    return distance * carpoolCostPerKm;
  };

  useEffect(() => {
    if (mileage && distance) {
      handleAnalyze();
    }
  }, [mileage, distance]);

  const handleAnalyze = () => {
    if (mileage && distance) {
      const distances = Array.from({ length: distance + 1 }, (_, i) => i);
      const vehicleCosts = distances.map((d) =>
        calculateVehicleCost(d, mileage)
      );
      const carpoolCosts = distances.map(calculateCarpoolCost);

      setVehicleCost(vehicleCosts[vehicleCosts.length - 1]);
      setCarpoolCost(carpoolCosts[carpoolCosts.length - 1]);
      setCostSavings(
        vehicleCosts[vehicleCosts.length - 1] -
          carpoolCosts[carpoolCosts.length - 1]
      );

      setCostData({
        labels: distances,
        datasets: [
          {
            label: "Cost Using Vehicle",
            data: vehicleCosts,
            borderColor: "red",
            backgroundColor: "red",
            borderWidth: 2,
            pointRadius: (context) =>
              context.dataIndex === distances.length - 1 ? 6 : 0, // Bigger point on the last data point
          },
          {
            label: "Cost Using Carpool",
            data: carpoolCosts,
            borderColor: "green",
            backgroundColor: "green",
            borderWidth: 2,
            pointRadius: (context) =>
              context.dataIndex === distances.length - 1 ? 6 : 0, // Bigger point on the last data point
          },
        ],
      });
    }
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Distance (Km)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Cost (₹)",
        },
        ticks: {
          callback: function (value) {
            return "₹" + value;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-14">
        {/* Start Location */}
        <div className="flex flex-col w-full gap-3 relative">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold tracking-wide">
              Enter Your Vehicle Mileage
            </p>
            <div className="flex flex-row items-end gap-2">
              <input
                type="number"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                placeholder="12  . . ."
                className="flex relative h-10 w-16 text-base rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <p className="text-xl font-semibold text-black/80">Km/l</p>
            </div>
          </div>

          {/* <div>
            <div
              className="bg-black text-white text-xs font-medium rounded-md w-fit px-3 py-2 cursor-pointer hover:bg-black/70 transition-all ease-in select-none"
              onClick={handleAnalyze}
            >
              <p>Analyze</p>
            </div>
          </div> */}
        </div>
      </div>

      {/* Results */}
      {costData && (
        <div className="w-full mt-6">
          <Line data={costData} options={options} />
        </div>
      )}

      {/* Text Data */}
      {costData && (
        <div className="flex flex-row gap-14 justify-between">
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-semibold tracking-wide">
              Total Cost Using Personal Vehicle
            </p>
            <div className="flex relative h-10 w-fit text-base gap-2 rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <p className="text-xl font-semibold text-red-500">
                <span>₹</span> {vehicleCost?.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-semibold tracking-wide">
              Total Cost Using Carpool
            </p>
            <div className="flex relative h-10 w-fit text-base gap-2 rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <p className="text-xl font-semibold text-green-700">
                ₹ {carpoolCost?.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-semibold tracking-wide">
              Savings Using Carpool
            </p>
            <div className="flex relative h-10 w-fit text-base gap-2 rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <p className="text-xl font-semibold text-green-700">
                ₹ {costSavings?.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Button */}
      {costSavings !== null && (
        <div className="flex justify-center mt-6">
          <button
            className="border-2 border-green-600 text-black text-md font-medium rounded-md px-4 py-2 cursor-pointer hover:bg-green-600 hover:text-white transition-all ease-in select-none"
            onClick={() => {
              setLocation("Car Pooling");
              selection("carpooling");
            }}
          >
            Save <span className="font-bold">₹{costSavings.toFixed(2)}</span> by
            carpooling!
          </button>
        </div>
      )}
    </div>
  );
}

export default Cost;
