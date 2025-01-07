import React, { useState, useEffect } from "react";
import { APIProvider, Map, Marker, Pin, InfoWindow } from "@vis.gl/react-google-maps";

const GoogleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default function Maps({ coord, place, desc }) {
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.9780 });
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [selectedDesc, setSelectedDesc] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (coord.length > 0) {
      setCenter(coord[0]);
    }
  }, [coord]);
  const handleMarkerClick = (position, index) => {
    setCenter(position);
    setSelectedPosition(position);
    setSelectedPlace(place[index]?.place || "");
    setSelectedDesc(desc[index]?.description || "");
    setSelectedIndex(index);
    setOpen(true);
  };

  const handleInfoWindowClose = () => {
    setOpen(false);
  };

  return (
    <APIProvider apiKey={GoogleApiKey}>
      <div
        className="flex justify-center items-center"
        style={{ width: "100%", height: "100vh" }}
      >
        <div style={{ width: "80%", height: "80%" }}>
          <Map defaultZoom={12} center={center}>
            {coord.map((position, index) => (
              <Marker
                key={index}
                position={position}
                onClick={() => handleMarkerClick(position, index)}
              >
                <Pin />
              </Marker>
            ))}
            {open && selectedPosition && (
              <InfoWindow position={selectedPosition} onCloseClick={handleInfoWindowClose}>
                <div>
                  <strong>{`${selectedIndex+1}. `}</strong>
                  <strong>{selectedPlace}</strong>
                  <br />
                  {selectedDesc}
                </div>
              </InfoWindow>
            )}
          </Map>
        </div>
      </div>
    </APIProvider>
  );
}
