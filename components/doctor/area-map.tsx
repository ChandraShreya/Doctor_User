"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { useNearbyDiagnosticsQuery } from "@/customhooks/query/areaMap.query.hooks";

const nearestDistanceOptions = [1000, 2000, 5000, 10000];

const AreaMap = () => {
  const [geoError, setGeoError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [radius, setRadius] = useState<number>(5000);
  const [locationQuery, setLocationQuery] = useState<string>("");
  const [isSearchLoading, setIsSearchLoading] = useState(false);

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
      (err) => {
        setGeoError("Unable to retrieve your location. Please allow location access.");
        console.error(err);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  }, []);

  const handleSearchByLocation = async () => {
    if (!locationQuery.trim()) {
      setGeoError("Please enter a location name to search.");
      return;
    }
    setGeoError(null);
    setIsSearchLoading(true);

    try {
      const encoded = encodeURIComponent(locationQuery.trim());
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encoded}&limit=1`);
      const results = await res.json();

      if (!Array.isArray(results) || results.length === 0) {
        setGeoError(`Could not find location for '${locationQuery}'.`);
      } else {
        const place = results[0];
        const lat = Number(place.lat);
        const lng = Number(place.lon);

        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
          setGeoError("Invalid geocode result for specified location.");
        } else {
          setLocation({ lat, lng });
          setGeoError(null);
        }
      }
    } catch (e) {
      console.error(e);
      setGeoError("Unable to resolve location. Check network or try another location.");
    } finally {
      setIsSearchLoading(false);
    }
  };


  const {
    data: mapData,
    isLoading,
    isError,
    refetch,
  } = useNearbyDiagnosticsQuery({
    lat: location?.lat ?? 0,
    lng: location?.lng ?? 0,
    distance: radius,
  });

  useEffect(() => {
    if (location) {
      refetch();
    }
  }, [location, radius, refetch]);

return (
  <Box sx={{ mt: "80px", mb: 6, px: { xs: 2, md: 4 } }}>

    {/* HEADER */}
    <Box textAlign="center" mb={4}>
      <Typography variant="h4" fontWeight={700}>
        Nearby Diagnostics
      </Typography>
      <Typography color="#64748b" mt={1}>
        Find diagnostic centers near your location with real-time distance tracking
      </Typography>
    </Box>

    {/* SEARCH BAR */}
    <Box
      display="flex"
      justifyContent="center"
      gap={2}
      mb={4}
      flexWrap="wrap"
    >
      <TextField
        label="Search location"
        value={locationQuery}
        onChange={(e) => setLocationQuery(e.target.value)}
        sx={{ minWidth: 280 }}
      />
      <Button
        variant="contained"
        onClick={handleSearchByLocation}
        disabled={isSearchLoading}
        sx={{
          px: 3,
          borderRadius: "10px",
          background: "linear-gradient(90deg,#5e72e4,#4f63d6)",
        }}
      >
        {isSearchLoading ? "Searching..." : "Search"}
      </Button>
    </Box>

    {/* FILTER */}
    <Box
      display="flex"
      justifyContent="center"
      gap={2}
      mb={4}
      flexWrap="wrap"
    >
      {nearestDistanceOptions.map((option) => (
        <Button
          key={option}
          variant={radius === option ? "contained" : "outlined"}
          onClick={() => setRadius(option)}
          sx={{
            borderRadius: "20px",
            px: 3,
          }}
        >
          {option / 1000} km
        </Button>
      ))}
    </Box>

    {/* STATUS */}
    {geoError && (
      <Typography color="error" textAlign="center" mb={2}>
        {geoError}
      </Typography>
    )}

    {isLoading && (
      <Box display="flex" justifyContent="center" mb={3}>
        <CircularProgress />
      </Box>
    )}

    {/* RESULTS */}
    <Box mt={4}>
      {mapData?.data?.length === 0 ? (
        <Typography textAlign="center" color="#64748b">
          No centers found nearby
        </Typography>
      ) : (
        mapData?.data?.map((item) => {
          const [lng, lat] = item.location?.coordinates ?? [0, 0];

          return (
            <Card
              key={item._id}
              sx={{
                mb: 3,
                borderRadius: 4,
                boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "1fr 1fr",
                  },
                }}
              >

                {/* LEFT INFO */}
                <CardContent>
                  <Typography fontWeight={700} fontSize={18}>
                    {item.name}
                  </Typography>

                  <Typography color="#64748b" mt={1}>
                    {item.address}
                  </Typography>

                  <Typography mt={1}>
                    📞 {item.phone}
                  </Typography>

                  <Typography
                    mt={1}
                    sx={{
                      color: "#5e72e4",
                      fontWeight: 600,
                    }}
                  >
                    {(item.distance / 1000).toFixed(2)} km away
                  </Typography>

                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      mt: 2,
                      borderRadius: "8px",
                      background:
                        "linear-gradient(90deg,#5e72e4,#4f63d6)",
                    }}
                    onClick={() => {
                      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
                      window.open(url, "_blank");
                    }}
                  >
                    Get Directions
                  </Button>
                </CardContent>

                {/* RIGHT MAP */}
                <Box
                  sx={{
                    width: "100%",
                    height: { xs: 200, md: "100%" },
                  }}
                >
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
                  />
                </Box>

              </Box>
            </Card>
          );
        })
      )}
    </Box>
  </Box>
);

};

export default AreaMap;
