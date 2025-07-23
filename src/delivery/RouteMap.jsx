import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';

const RouteMap = ({ start, end }) => {
  const [route, setRoute] = useState([]);

  useEffect(() => {
    if (start && end) {
      fetch(`/api/route?fromLat=${start.lat}&fromLon=${start.lon}&toLat=${end.lat}&toLon=${end.lon}`)
        .then(res => res.json())
        .then(data => {
          setRoute(data.pathCoordinates); // Set array of [lat, lon]
        })
        .catch(error => {
          console.error('Error fetching route:', error);
        });
    }
  }, [start, end]);

  if (!start || !end) {
    return <div>Loading map...</div>;
  }

  const startPosition = [start.lat, start.lon];
  const endPosition = [end.lat, end.lon];

  return (
    <MapContainer center={startPosition} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='© OpenStreetMap contributors'
      />

      {route.length > 0 && (
        <Polyline positions={route} color="blue" />
      )}

      <Marker position={startPosition}>
        <Popup>Start</Popup>
      </Marker>

      <Marker position={endPosition}>
        <Popup>Destination</Popup>
      </Marker>
    </MapContainer>
  );
};

export default RouteMap;
