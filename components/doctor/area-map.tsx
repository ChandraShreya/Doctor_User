
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CircularProgress,
  MenuItem,
} from "@mui/material";

import { useNearbyDiagnosticsQuery } from "@/customhooks/query/areaMap.query.hooks";


const Map = dynamic(() => import("./mapComponent"), { ssr: false });

const nearestDistanceOptions = [1000, 2000, 5000, 10000];

interface AreaMapProps {
  onSignup?: () => void;
  onSignin?: () => void;
}

const AreaMap = ({ onSignup, onSignin }: AreaMapProps) => {
  const [geoError, setGeoError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [radius, setRadius] = useState<number>(5000);
  const [locationQuery, setLocationQuery] = useState("");
  const [isSearchLoading, setIsSearchLoading] = useState(false);


  const [selectedId, setSelectedId] = useState<string | null>(null);


  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        setGeoError("Allow location access or search manually.");
      }
    );
  }, []);


  const handleSearchByLocation = async () => {
    if (!locationQuery.trim()) {
      setGeoError("Enter a location name.");
      return;
    }

    setGeoError(null);
    setIsSearchLoading(true);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          locationQuery
        )}&limit=1`
      );
      const data = await res.json();

      if (data.length === 0) {
        setGeoError("Location not found.");
      } else {
        setLocation({
          lat: Number(data[0].lat),
          lng: Number(data[0].lon),
        });
      }
    } catch {
      setGeoError("Search failed.");
    } finally {
      setIsSearchLoading(false);
    }
  };


  const {
    data: mapData,
    isLoading,
    refetch,
  } = useNearbyDiagnosticsQuery({
    lat: location?.lat ?? 0,
    lng: location?.lng ?? 0,
    distance: radius,
  });

  useEffect(() => {
    if (location) refetch();
  }, [location, radius, refetch]);



  return (
  <Box
    sx={{
      mt: "20px",
      px: { xs: 2, md: 6 },
      py: 3,
    }}
  >
    {/* HEADER */}
    <Box textAlign="center" maxWidth="700px" mx="auto" mb={4}>
      <Typography
        fontSize={{ xs: 26, md: 34 }}
        fontWeight={700}
        sx={{ color: "#163c95" }}
      >
        We are available near you
      </Typography>

      <Typography
        mt={1}
        sx={{
          color: "#7b94b8",
          fontSize: "14px",
          lineHeight: 1.6,
        }}
      >
       We are committed to bringing quality healthcare closer to you. Explore our hospital branches across different locations and find the nearest center for trusted, 
       convenient, and timely medical care.
      </Typography>
    </Box>

    {/* SEARCH + FILTER */}
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={2}
      mb={5}
      flexWrap="wrap"
    >
      <TextField
        placeholder="Search location..."
        value={locationQuery}
        onChange={(e) => setLocationQuery(e.target.value)}
        sx={{
          width: { xs: "100%", sm: 700 },
          background: "#fff",
          borderRadius: "999px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "999px",
            height: 56,
            fontSize: 16,
            pr: 2,
          },
          "& .MuiOutlinedInput-input::placeholder": {
            opacity: 0.6,
            fontSize: 16,
          },
        }}
      />

      <Button
        onClick={handleSearchByLocation}
        disabled={isSearchLoading}
        sx={{
          px: 6,
          height: 56,
          borderRadius: "999px",
          background: "#1976d2",
          color: "#fff",
          textTransform: "none",
          fontWeight: 600,
          fontSize: 15,
        }}
      >
        {isSearchLoading ? "Searching..." : "Search"}
      </Button>

      <TextField
        select
        value={radius}
        onChange={(e) => setRadius(Number(e.target.value))}
        sx={{
          minWidth: 140,
          background: "#fff",
          borderRadius: "999px",

          "& .MuiOutlinedInput-root": {
            borderRadius: "999px",
            height: 56,
            fontSize: 15,
          },
        }}
      >
        {nearestDistanceOptions.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt / 1000} km
          </MenuItem>
        ))}
      </TextField>
    </Box>

    {/* ERROR */}
    {geoError && (
      <Typography color="error" mb={2} textAlign="center">
        {geoError}
      </Typography>
    )}

    {/* LOADING */}
    {isLoading && (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    )}

    {/* WRAPPER CONTENT */}
    <Box
      sx={{
        borderRadius: "20px",
        px: { xs: 2, md: 0 },
        mb: 2,
      }}
    >
      {/* MAIN GRID - LEFT: CARDS (2 COLUMNS), RIGHT: MAP (LARGER) */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "1.1fr 1.2fr",
          },
          gap: 3,
          alignItems: "start",
        }}
      >
        {/* LEFT - 2 COLUMN CARD LAYOUT */}
        <Box
        sx={{
          maxHeight: "700px",
          overflowY: "auto",
          pr: 1.5,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
          },
          gap: 2.5,
          alignContent: "start",
        }}
      >
        {mapData?.data?.map((item: any) => {
          const [lng, lat] = item.location?.coordinates ?? [0, 0];
          const isActive = selectedId === item._id;

          return (
            <Card
              key={item._id}
              onClick={() => {
                setLocation({ lat, lng });
                setSelectedId(item._id);
              }}
              sx={{
                borderRadius: "16px",
                cursor: "pointer",
                background: "#fff",
                border: isActive
                  ? "2px solid #163c95"
                  : "1px solid #e2e8f0",
                boxShadow: isActive 
                  ? "0 8px 24px rgba(22, 60, 149, 0.12)"
                  : "0 6px 16px rgba(0,0,0,0.06)",
                transition: "0.3s",
                p: 3,
                minHeight: "220px",
                display: "flex",
                flexDirection: "column",

                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.1)",
                },
              }}
            >
              <Typography fontWeight={700} fontSize={16} sx={{ color: "#163c95" }}>
                {item.name}
              </Typography>

              <Typography fontSize={13} color="#64748b" mt={1} sx={{ flex: 1 }}>
                📍 {item.address}
              </Typography>

              <Typography fontSize={13} mt={1} sx={{ color: "#475569" }}>
                📞 {item.phone}
              </Typography>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={2}
                pt={2}
                sx={{ borderTop: "1px solid #e2e8f0" }}
              >
                <Typography
                  sx={{
                    color: "#2563eb",
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  {(item.distance / 1000).toFixed(2)} km
                </Typography>

                <Button
                  size="small"
                  sx={{
                    textTransform: "none",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#2563eb",
                    "&:hover": {
                      background: "rgba(37, 99, 235, 0.08)",
                    },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLocation({ lat, lng });
                    setSelectedId(item._id);
                  }}
                >
                  On Maps
                </Button>
              </Box>
            </Card>
          );
        })}
      </Box>

      {/* RIGHT - LARGER MAP */}
      <Box
        sx={{
          height: "700px",
          borderRadius: "18px",
          overflow: "hidden",
          background: "#fff",
          border: "1px solid #e2e8f0",
          boxShadow: "0 8px 28px rgba(0,0,0,0.08)",
          position: "sticky",
          top: 20,
        }}
      >
        <Map
          data={mapData?.data}
          center={location}
          selectedId={selectedId}
        />
      </Box>
    </Box>
    {/* END OF WRAPPER */}
    </Box>
  </Box>
);
};

export default AreaMap;