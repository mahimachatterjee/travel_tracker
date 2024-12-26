import MapComponent from "./components/Map";

function App() {
  const locations = [
    { coordinates: [-74.5, 40], label: "Marker 1", color: "red" },
    { coordinates: [-74, 40.5], label: "Marker 2", color: "green" },
    { coordinates: [-73.5, 40], label: "Marker 3", color: "blue" },
  ];

 

  return (
    <div>
      <h1>My Map with MapLibre</h1>
      
      <MapComponent locations={locations} />
     
    </div>
  );
}

export default App;
