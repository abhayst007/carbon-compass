import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import LocationBar from "../../components/LocationBar";
import Overview from "./Overview";
import RouteOptimization from "./Route";
import CostSavings from "./Cost";
import EmissionAnalytics from "./Emission";
import CarPooling from "./Carpooling";
import WeatherAirQuality from "./Weather";
import GreenTravelTips from "./Travel";
import SustainabilityReport from "./Report";

function Dashboard() {
  const [selectedComponent, setSelectedComponent] =
    useState("route-optimization");
  const [mileage, setMileage] = useState("");
  const [vehicleCost, setVehicleCost] = useState(null);
  const [carpoolCost, setCarpoolCost] = useState(null);
  const [carpoolEmission, setCarpoolEmission] = useState(null);
  const [privateVehicleEmission, setPrivateVehicleEmission] = useState(null);
  const [location, setLocation] = useState("Route Optimization");
  const [globalLocation, setGlobalLocation] = useState({
    start: "-",
    end: "-",
    distance: 0,
    duration: [0, 0],
  });

  const renderComponent = () => {
    switch (selectedComponent) {
      case "overview":
        return (
          <Overview
            mileage={mileage}
            distance={globalLocation.distance}
            vehicleCost={vehicleCost}
            carpoolCost={carpoolCost}
            vehicleEmission={privateVehicleEmission}
            carpoolEmission={carpoolEmission}
          />
        );
      case "route-optimization":
        return (
          <RouteOptimization
            globalLocal={globalLocation}
            setGlobalLocal={setGlobalLocation}
          />
        );
      case "cost-savings":
        return (
          <CostSavings
            distance={globalLocation.distance}
            selection={setSelectedComponent}
            setLocation={setLocation}
            mileage={mileage}
            setMileage={setMileage}
            vehicleCost={vehicleCost}
            setVehicleCost={setVehicleCost}
            carpoolCost={carpoolCost}
            setCarpoolCost={setCarpoolCost}
          />
        );
      case "emission-analytics":
        return (
          <EmissionAnalytics
            distance={globalLocation.distance}
            selection={setSelectedComponent}
            setLocation={setLocation}
            mileage={mileage}
            setMileage={setMileage}
            privateVehicleEmission={privateVehicleEmission}
            setPrivateVehicleEmission={setPrivateVehicleEmission}
            carpoolEmission={carpoolEmission}
            setCarpoolEmission={setCarpoolEmission}
          />
        );
      case "carpooling":
        return <CarPooling globalLocal={globalLocation} />;
      case "weather-air-quality":
        return <WeatherAirQuality />;
      case "green-travel-tips":
        return <GreenTravelTips />;
      case "sustainability-report":
        return <SustainabilityReport />;
      default:
        return (
          <Overview
            mileage={mileage}
            distance={globalLocation.distance}
            vehicleCost={vehicleCost}
            carpoolCost={carpoolCost}
            vehicleEmission={privateVehicleEmission}
            carpoolEmission={carpoolEmission}
          />
        );
    }
  };

  return (
    <div className="flex">
      <Sidebar selection={setSelectedComponent} setLocation={setLocation} />
      <div className="flex flex-col flex-grow">
        <LocationBar location={location} />
        <div className="px-7 py-5">{renderComponent()}</div>
      </div>
    </div>
  );
}

export default Dashboard;
