"use client";

import React from 'react'
import L from 'leaflet'
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerIcon2x from "leaflet/dist/images/layers-2x.png"
import markerIconShadow from "leaflet/dist/images/marker-shadow.png"
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerIconShadow.src
});

interface MapProps {
    center?: number[]
}

const Map: React.FC<MapProps> = ({
    center
}) => {
  return (
    <MapContainer
    attributionControl={false}
    center={center as L.LatLngExpression || [51, -0.09]}
    zoom={center ? 14 : 2}
    scrollWheelZoom={false}
    className='h-[35vh] rounded-lg'
    dragging={false}
    >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {center && (
      <Marker
        position={center as L.LatLngExpression}
        eventHandlers={{
          mouseover: (e) => {
            e.target.openPopup();
          },
          mouseout: (e) => {
            e.target.closePopup();
          },
        }}
      >
        <Popup>
          O Mapa só Representa a Cidade,<br /> NÃO o endereço completo.
        </Popup>
      </Marker>
    )}
    </MapContainer>
  )
}

export default Map
