import React, { useState, useEffect } from "react";
import RouteMap from "./RouteMap";
import { axiosDelivery } from "../api/axiosDelivery";

const MapNavigation = () => {
<<<<<<< HEAD
  // For demonstration, fetch start and end coordinates from /api/route
  const [start, setStart] = React.useState(null);
  const [end, setEnd] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/route")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched route data:", data);
=======
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const res = await axiosDelivery({ method: "get", url: "/api/route" });
        const data = res.data;
>>>>>>> feat/delivery-api-helper
        if (data && data.length >= 2) {
          setStart({ lat: data[0].lat, lon: data[0].lon });
          setEnd({ lat: data[1].lat, lon: data[1].lon });
        } else {
          console.error("Invalid route data received:", data);
        }
      } catch (error) {
        console.error("Error fetching route coordinates:", error);
      }
    };
    fetchRoute();
  }, []);
  if (!start || !end) {
    return <div>Loading map...</div>;
  }
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Map Navigation</h2>
      <div className="bg-white rounded shadow p-4 mb-4">
        <div className="mb-2">Delivery Route</div>
        <div className="h-64 w-full rounded overflow-hidden">
          <RouteMap start={start} end={end} />
        </div>
      </div>
    </div>
  );
};

export default MapNavigation;
