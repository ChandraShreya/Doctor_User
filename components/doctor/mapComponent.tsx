"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import { useEffect, useState } from "react";

// 🔥 Smooth move when location changes
const ChangeView = ({ center }: any) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo([center.lat, center.lng], 14, {
        duration: 1.5,
      });
    }
  }, [center, map]);

  return null;
};

const ResizeMap = () => {
  const map = useMap();

  useEffect(() => {
    const handleResize = () => {
      map.invalidateSize();
    };

    setTimeout(handleResize, 200);
    setTimeout(handleResize, 500);
    setTimeout(handleResize, 1000);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [map]);

  return null;
};

const MapComponent = ({ data, center, selectedId }: any) => {
  const [icons, setIcons] = useState<any>(null);

  useEffect(() => {
    import("leaflet").then((L) => {
      const defaultIcon = new L.Icon({
        iconUrl:
          "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
        iconSize: [25, 41],
      });

      const activeIcon = new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        iconSize: [25, 41],
      });

      setIcons({ defaultIcon, activeIcon });
    });
  }, []);

  if (!center || !icons) return null;

  return (
    <MapContainer
  center={[center.lat, center.lng]}
  zoom={13}
  style={{ height: "100%", width: "100%" }}
>
  <ResizeMap />   {/* ✅ ADD HERE */}

  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ResizeMap />
      <ChangeView center={center} />

      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {data?.map((item: any) => {
        const [lng, lat] = item.location.coordinates;

        const isActive = selectedId === item._id;

        return (
          <Marker
            key={item._id}
            position={[lat, lng]}
            icon={isActive ? icons.activeIcon : icons.defaultIcon}
          >
            <Popup>
              <b>{item.name}</b>
              <br />
              {item.address}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;