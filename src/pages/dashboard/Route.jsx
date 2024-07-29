import React from "react";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Map as MapLibreMap } from "maplibre-gl";
import debounce from "lodash/debounce";
import "maplibre-gl/dist/maplibre-gl.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Route({ globalLocal, setGlobalLocal }) {
  const api_key = "rc6M42Nm9j98C08qT53xlBUhKMAMMGrMpoqsytwU";

  const [mapReady, setMapReady] = useState(false);

  const [viewState, setViewState] = useState({
    longitude: 75.87585692146915,
    latitude: 22.712447834285197,
    zoom: 15,
  });

  const [routeData, setRouteData] = useState({
    distance: "-",
    duration: [0, 0],
  });

  const cardData = [
    {
      heading: "Distance",
      data:
        globalLocal.distance !== 0 ? globalLocal.distance : routeData.distance,
      prefix_1: "",
      prefix_2: "KM",
    },
    {
      heading: "Duration",
      data:
        globalLocal.duration[0] !== 0
          ? globalLocal.duration
          : routeData.duration,
      prefix_1: "Hours",
      prefix_2: "minutes",
    },
  ];

  const [suggestionsStart, setSuggestionsStart] = useState({ predictions: [] });
  const [suggestionsEnd, setSuggestionsEnd] = useState({ predictions: [] });
  const [location, setLocation] = useState({
    start: [0, 0],
    end: [0, 0],
    startName: "",
    destination: "",
  });

  const [inputStart, setInputStart] = useState("");
  const [inputEnd, setInputEnd] = useState("");

  function getCoordinates(steps) {
    const coordinates = [];
    steps.forEach((step) => {
      coordinates.push([step.start_location.lng, step.start_location.lat]);
      coordinates.push([step.end_location.lng, step.end_location.lat]);
    });
    return coordinates;
  }

  const getAutoComplete = async (keyword, setSuggestionObj) => {
    await axios
      .get("https://api.olamaps.io/places/v1/autocomplete", {
        params: {
          input: keyword,
          api_key: api_key,
        },
      })
      .then((res) => {
        setSuggestionObj(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const debouncedAutoComplete = useCallback(
    debounce(
      (keyword, setSuggestionObj) => getAutoComplete(keyword, setSuggestionObj),
      500
    ),
    []
  );

  function splitTimeString(timeString) {
    const timeArray = timeString.split(" ");
    const hours = parseInt(timeArray[0]);
    const minutes = parseInt(timeArray[2]);
    return [hours, minutes];
  }
  // const notify = () => toast("Wow so easy !");
  useEffect(() => {
    if (!mapReady) return;

    const map = new MapLibreMap({
      container: "central-map",
      center:
        location.start[0] !== 0
          ? [location.start[1], location.start[0]]
          : [77.216721, 28.6448],
      zoom: 8,
      maxTileCacheSize: 30,
      maxTileCacheZoomLevels: 10,
      minZoom: 5,
      maxZoom: 16,
      cancelPendingTileRequestsWhileZooming: true,
      maplibreLogo: false,
      style:
        "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
      transformRequest: (url, resourceType) => {
        url = url.includes("?")
          ? `${url}&api_key=${api_key}`
          : `${url}?api_key=${api_key}`;
        return { url, resourceType };
      },
    });

    map.on("load", async () => {
      if (location.start[0] === 0 || location.end[0] === 0) return;

      const response = await axios
        .post(
          // "https://api.olamaps.io/routing/v1/directions?origin=22.711833%2C%2075.877299&destination=22.726673%2C%2075.821215&alternatives=false&steps=true&overview=full&language=en&traffic_metadata=true&api_key=rc6M42Nm9j98C08qT53xlBUhKMAMMGrMpoqsytwU"
          // `https://api.olamaps.io/routing/v1/directions?origin=22.711833%2C%2075.877299&destination=22.726673%2C%2075.821215&alternatives=false&steps=true&overview=full&language=en&traffic_metadata=true&api_key=rc6M42Nm9j98C08qT53xlBUhKMAMMGrMpoqsytwU`
          `https://api.olamaps.io/routing/v1/directions?origin=${location.start[0]},${location.start[1]}&destination=${location.end[0]},${location.end[1]}&alternatives=false&steps=true&overview=full&language=en&traffic_metadata=true&api_key=${api_key}`
        )
        .then((response) => {
          setGlobalLocal({
            ...globalLocal,
            distance: response.data.routes[0].legs[0].readable_distance,
            duration: splitTimeString(
              response.data.routes[0].legs[0].readable_duration
            ),
          });
          setRouteData({
            distance: response.data.routes[0].legs[0].readable_distance,
            duration: splitTimeString(
              response.data.routes[0].legs[0].readable_duration
            ),
          });
          return response.data;
        })
        .catch((err) => console.log(err));

      const steps = response.routes[0].legs[0].steps;
      const coordinates = getCoordinates(steps);

      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: coordinates,
          },
        },
      });
      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#095724",
          "line-width": 4,
          "line-opacity": 0.75,
        },
      });
    });
  }, [mapReady, location]);

  return (
    <div className="flex flex-col gap-4 ">
      {/* Input Boxes */}
      <div className="flex gap-14">
        {/* Start Location */}
        <div className="flex flex-col w-full gap-1 relative">
          <p className="text-sm font-semibold tracking-wide">Starting Point</p>
          <input
            placeholder={globalLocal !== "-" ? globalLocal.start : "Indore..."}
            value={inputStart}
            className="flex relative h-10 w-full text-base rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) => {
              setInputStart(e.target.value);
              if (e.target.value.trim() !== "")
                debouncedAutoComplete(e.target.value, setSuggestionsStart);
            }}
          ></input>

          {/* Suggestions Box */}
          <div className="z-10 w-full absolute flex flex-col mt-16 bg-white cursor-pointer">
            {/* Suggestion Element */}
            {suggestionsStart.predictions.map((data) => (
              <div
                className="px-2 pt-3 flex flex-col gap-2 text-black/50 hover:bg-black/5 hover:text-black cursor-default"
                key={data.structured_formatting.main_text}
                onClick={() => {
                  setLocation({
                    ...location,
                    start: [
                      data.geometry.location.lat,
                      data.geometry.location.lng,
                    ],
                    startName: data.structured_formatting.main_text,
                  });
                  setGlobalLocal({
                    ...globalLocal,
                    start: data.structured_formatting.main_text,
                  });
                  setInputStart(data.structured_formatting.main_text);
                  setSuggestionsStart({ predictions: [] });
                }}
              >
                <p className="">
                  {data.structured_formatting.main_text}{" "}
                  {data.structured_formatting.secondary_text}
                </p>
                <div className="w-full h-[2px] bg-black/5 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
        {/* End Location */}
        <div className="flex flex-col w-full gap-1 relative">
          <p className="text-sm font-semibold tracking-wide">Destination</p>
          <input
            placeholder={globalLocal !== "-" ? globalLocal.end : "Bhopal..."}
            value={inputEnd}
            className="flex relative h-10 w-full text-base rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) => {
              setInputEnd(e.target.value);
              if (e.target.value.trim() !== "")
                debouncedAutoComplete(e.target.value, setSuggestionsEnd);
            }}
          ></input>

          {/* Suggestions Box */}
          <div className="z-10 w-full absolute flex flex-col mt-16 bg-white">
            {/* Suggestion Element */}
            {suggestionsEnd.predictions.map((data) => (
              <div
                className="px-2 pt-3 flex flex-col gap-2 text-black/50 hover:bg-black/5 hover:text-black cursor-default"
                key={data.structured_formatting.main_text}
                onClick={() => {
                  setLocation({
                    ...location,
                    end: [
                      data.geometry.location.lat,
                      data.geometry.location.lng,
                    ],
                    destination: data.structured_formatting.main_text,
                  });
                  setGlobalLocal({
                    ...globalLocal,
                    end: data.structured_formatting.main_text,
                  });
                  setInputEnd(data.structured_formatting.main_text);
                  setSuggestionsEnd({ predictions: [] });
                }}
              >
                <p className="">
                  {data.structured_formatting.main_text}{" "}
                  {data.structured_formatting.secondary_text}
                </p>
                <div className="w-full h-[2px] bg-black/5 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button */}
      {/* <div>
        <div
          onClick={() => {
            console.log(location);
          }}
          className="bg-black text-white text-sm rounded-md w-fit px-3 py-2 cursor-pointer hover:bg-black/70 transition-all ease-in select-none"
        >
          <p>Get Route</p>
        </div>
      </div> */}

      {/* Map */}
      <div
        className="w-full h-[500px] rounded-2xl overflow-hidden "
        ref={() => setMapReady(true)}
        id="central-map"
      />

      {/* Cards */}

      <div className="flex flex-wrap gap-7">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md p-3 w-64 h-32 items-center flex flex-col gap-3"
          >
            <h2 className="text-2xl text-gray-600 font-normal">
              {card.heading}
            </h2>
            <div className="flex items-baseline gap-3">
              {card.heading === "Duration" ? (
                <div className="flex items-baseline gap-2">
                  <div className="flex items-baseline">
                    <p className="text-black text-4xl font-semibold">
                      {card.data[0]}
                    </p>
                    <p className="text-slate-700 text-base font-thin ">
                      {card.prefix_1}
                    </p>
                  </div>

                  <div className="flex items-baseline">
                    <p className="text-black text-4xl font-semibold">
                      {card.data[1]}
                    </p>
                    <p className="text-slate-700 text-base font-thin">
                      {card.prefix_2}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-black text-4xl font-semibold">
                    {card.data}
                  </p>
                  <p className="text-slate-700 text-base font-thin">
                    {card.prefix_2}
                  </p>
                </>
              )}
            </div>
          </div>
        ))}

        {/* <div
          className="bg-white shadow-md rounded-md p-3 w-64 h-32 items-center flex flex-col gap-3"
        >
          <p className="text-black text-4xl font-semibold"></p>
          <p className="text-slate-700 text-base font-thin">{card.prefix_2}</p>
        </div> */}
      </div>
    </div>
  );
}

export default Route;
