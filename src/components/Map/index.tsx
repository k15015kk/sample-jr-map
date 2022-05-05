import ReactMapGL, { NavigationControl } from "react-map-gl";
import maplibregl from "maplibre-gl";
import {DeckGL, GeoJsonLayer} from "deck.gl";
import { useEffect, useState} from "react";
import type * as GeoJSON from 'geojson';

const Map = () => {

  const [jsonData, setJsonData] = useState<GeoJSON.Feature[]>()

  useEffect (() => {
    const data = require("@/data/N02-20_RailroadSection.json");
    setJsonData(data.features)
  }, [])

  const [viewState, setViewState] = useState({
    longitude: 139.7671365841117,
    latitude: 35.68143950212949,
    zoom: 15
  });

  const geoJsonLayer = new GeoJsonLayer({
    id: "geojson",
    data: jsonData,
    lineWidthMinPixels: 4,
    getLineColor: (data) => {

      const properties = (data as GeoJSON.Feature).properties

      if (properties) {
        switch (properties.N02_004) {
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
            return [0, 0, 0, 0];
            break;
        }
      } else {
        return [0, 0, 0, 0]
      }
    },
  });

  return (
    <>
      <DeckGL
        initialViewState={viewState}
        layers={[geoJsonLayer]}
        style={{ width: "100vw", height: "100vh" }}
        controller={true}
        onViewStateChange={(event) => setViewState(event.viewState)}
      >
        <ReactMapGL mapStyle={process.env.MAP_URL} mapLib={maplibregl} />
      </DeckGL>
    </>
  );
};

export default Map;
