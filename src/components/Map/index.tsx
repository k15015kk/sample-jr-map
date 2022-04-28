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
    getLineColor: (data) => {
      switch (data.properties.N02_004) {
        case "北海道旅客鉄道":
          return [3, 193, 61, 255];
          break;
        case "東日本旅客鉄道":
          return [55, 134, 64, 255];
          break;
        case "東海旅客鉄道":
          return [255, 126, 28, 255];
          break;
        case "西日本旅客鉄道":
          return [0, 114, 186, 255];
          break;
        case "四国旅客鉄道":
          return [0, 172, 209, 255];
          break;
        case "九州旅客鉄道":
          return [246, 46, 54, 255];
          break;
        default:
          return [192, 192, 192, 0];
          break;
      }
    },
  });

  return (
    <DeckGL
      initialViewState={viewState}
      layers={[geoJsonLayer]}
      style={{ width: "100vw", height: "100vh" }}
      controller={true}
      onViewStateChange={(event) => setViewState(event.viewState)}
    >
      <ReactMapGL mapStyle={process.env.MAP_URL} mapLib={maplibregl} />
    </DeckGL>
  );
};

export default Map;
