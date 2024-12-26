import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null); // Reference to the map instance
  const [pins, setPins] = useState([]); // Store pin locations

  useEffect(() => {
    // Initialize the map
    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [-74.5, 40], // Initial center [lng, lat]
      zoom: 9,
    });

    // Add a click event listener to add pins
    mapRef.current.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      setPins((prevPins) => [...prevPins, { lng, lat }]);
    });

    return () => {
      mapRef.current.remove(); // Cleanup the map instance on unmount
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Add markers for all pins
    pins.forEach((pin, index) => {
      const markerElement = document.createElement("div");
      markerElement.className = "marker";
      markerElement.style.width = "20px";
      markerElement.style.height = "20px";
      markerElement.style.backgroundColor = "red";
      markerElement.style.borderRadius = "50%";
      markerElement.style.cursor = "pointer";

      // Create a marker for each pin
      new maplibregl.Marker(markerElement)
        .setLngLat([pin.lng, pin.lat])
        .setPopup(
          new maplibregl.Popup().setText(`Pin #${index + 1} at [${pin.lng}, ${pin.lat}]`)
        ) // Optional popup
        .addTo(mapRef.current);
    });
  }, [pins]);

  return (
    <div
      ref={mapContainerRef}
      style={{ width: "100%", height: "800px", border: "5px solid #ccc" }}
    />
  );
};

export default MapComponent;
