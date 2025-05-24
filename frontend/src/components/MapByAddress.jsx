import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

// 🔧 Corrección de íconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

function MapByAddress({ city, neighborhood }) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const address = `${neighborhood}, ${city}`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          setPosition([parseFloat(lat), parseFloat(lon)]);
        } else {
          alert("No se encontró la ubicación");
        }
      })
      .catch(() => alert("Error al buscar la ubicación"));
  }, [city, neighborhood]);

  if (!position) return <p>Cargando mapa...</p>;

  return (
    <MapContainer center={position} zoom={14} style={{ height: "150px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>{neighborhood}, {city}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapByAddress;
