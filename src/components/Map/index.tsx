import ReactMapGL, { NavigationControl } from "react-map-gl";
import maplibregl from "maplibre-gl";
import DeckGL from "deck.gl";
import { useState } from "react";
import { GeoJsonLayer } from "deck.gl";

const Map = () => {
  const jsonData = require("@/data/N02-20_RailroadSection.json");

  const [viewState, setViewState] = useState({
    longitude: 139.7671365841117,
    latitude: 35.68143950212949,
    zoom: 15,
  });

  const geoJsonLayer = new GeoJsonLayer({
    id: "geojson",
    data: jsonData,
    lineWidthMinPixels: 4,
    getLineColor: [69, 90, 100, 255],
  });

  return (
    <DeckGL
      initialViewState={viewState}
      layers={[geoJsonLayer]}
      style={{ width: "100vw", height: "100vh" }}
      controller={true}
      onViewStateChange={(event) => setViewState(event.viewState)}
    >
      <ReactMapGL mapStyle={process.env.MAP_URL} mapLib={maplibregl}/>
    </DeckGL>
  );
};

export default Map;
