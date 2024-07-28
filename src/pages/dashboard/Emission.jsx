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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Emission({ distance, selection, setLocation, mileage, setMileage,carpoolEmission,setCarpoolEmission,privateVehicleEmission,setPrivateVehicleEmission }) {
  // const [mileage, setMileage] = useState("");
  // const [privateVehicleEmission, setPrivateVehicleEmission] = useState(null);
  // const [carpoolEmission, setCarpoolEmission] = useState(null);


  const [emissionSavings, setEmissionSavings] = useState(null);
  const [emissionData, setEmissionData] = useState(null);

  const emissionPerLitre = 2.31; // kg CO2 per litre of fuel
  const carpoolEmissionPerKm = 0.1; // kg CO2 per km for carpooling

  const calculatePrivateVehicleEmission = (distance, mileage) => {
    return (distance / mileage) * emissionPerLitre;
  };

  const calculateCarpoolEmission = (distance) => {
    return distance * carpoolEmissionPerKm;
  };

  useEffect(() => {
    if (mileage && distance) {
      handleAnalyze();
    }
  }, [mileage, distance]);

  const handleAnalyze = () => {
    if (mileage && distance) {
      const distances = Array.from({ length: distance + 1 }, (_, i) => i);
      const privateEmissions = distances.map((d) =>
        calculatePrivateVehicleEmission(d, mileage)
      );
      const carpoolEmissions = distances.map(calculateCarpoolEmission);

      setPrivateVehicleEmission(privateEmissions[privateEmissions.length - 1]);
      setCarpoolEmission(carpoolEmissions[carpoolEmissions.length - 1]);
      setEmissionSavings(
        privateEmissions[privateEmissions.length - 1] -
          carpoolEmissions[carpoolEmissions.length - 1]
      );

      setEmissionData({
        labels: distances,
        datasets: [
          {
            label: "Emission Using Private Vehicle",
            data: privateEmissions,
            borderColor: "red",
            backgroundColor: "red",
            borderWidth: 2,
            pointRadius: (context) =>
              context.dataIndex === distances.length - 1 ? 6 : 0, // Bigger point on the last data point
          },
          {
            label: "Emission Using Carpool",
            data: carpoolEmissions,
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
          text: "Emission (kg CO2)",
        },
        ticks: {
          callback: function (value) {
            return value + " kg CO2";
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
        {/* Mileage Input */}
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
      {emissionData && (
        <div className="w-full mt-6">
          <Line data={emissionData} options={options} />
        </div>
      )}

      {/* Text Data */}
      {emissionData && (
        <div className="flex flex-row gap-14 justify-between">
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-semibold tracking-wide">
              Total Emission Using Private Vehicle
            </p>
            <div className="flex relative h-10 w-fit text-base gap-2 rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <p className="text-xl font-semibold text-red-500">
                {privateVehicleEmission?.toFixed(2)} kg CO2
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-semibold tracking-wide">
              Total Emission Using Carpool
            </p>
            <div className="flex relative h-10 w-fit text-base gap-2 rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <p className="text-xl font-semibold text-green-700">
                {carpoolEmission?.toFixed(2)} kg CO2
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-semibold tracking-wide">
              Emission Savings Using Carpool
            </p>
            <div className="flex relative h-10 w-fit text-base gap-2 rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <p className="text-xl font-semibold text-green-700">
                {emissionSavings?.toFixed(2)} kg CO2
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Button */}
      {emissionSavings !== null && (
        <div className="flex justify-center mt-6">
          <button
            className="border-2 border-green-600 text-black text-md font-medium rounded-md px-4 py-2 cursor-pointer hover:bg-green-600 hover:text-white transition-all ease-in select-none"
            onClick={() => {
              setLocation("Car Pooling");
              selection("carpooling");
            }}
          >
            Save{" "}
            <span className="font-bold">
              {emissionSavings.toFixed(2)} kg CO2
            </span>{" "}
            by carpooling!
          </button>
        </div>
      )}
    </div>
  );
}

export default Emission;
