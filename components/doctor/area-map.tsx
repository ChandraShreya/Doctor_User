// // "use client";

// // import { useEffect, useState } from "react";
// // import {
// //   Box,
// //   Typography,
// //   Button,
// //   TextField,
// //   Card,
// //   CardContent,
// //   CircularProgress,
// // } from "@mui/material";
// // import { useNearbyDiagnosticsQuery } from "@/customhooks/query/areaMap.query.hooks";

// // const nearestDistanceOptions = [1000, 2000, 5000, 10000];

// // const AreaMap = () => {
// //   const [geoError, setGeoError] = useState<string | null>(null);
// //   const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
// //   const [radius, setRadius] = useState<number>(5000);
// //   const [locationQuery, setLocationQuery] = useState<string>("");
// //   const [isSearchLoading, setIsSearchLoading] = useState(false);

// //   useEffect(() => {
// //     if (!navigator.geolocation) {
// //       setGeoError("Geolocation is not supported by your browser.");
// //       return;
// //     }

// //     navigator.geolocation.getCurrentPosition(
// //       (pos) => {
// //         setLocation({
// //           lat: pos.coords.latitude,
// //           lng: pos.coords.longitude,
// //         });
// //       },
// //       (err) => {
// //         setGeoError("Unable to retrieve your location. Please allow location access.");
// //         console.error(err);
// //       },
// //       { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
// //     );
// //   }, []);

// //   const handleSearchByLocation = async () => {
// //     if (!locationQuery.trim()) {
// //       setGeoError("Please enter a location name to search.");
// //       return;
// //     }
// //     setGeoError(null);
// //     setIsSearchLoading(true);

// //     try {
// //       const encoded = encodeURIComponent(locationQuery.trim());
// //       const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encoded}&limit=1`);
// //       const results = await res.json();

// //       if (!Array.isArray(results) || results.length === 0) {
// //         setGeoError(`Could not find location for '${locationQuery}'.`);
// //       } else {
// //         const place = results[0];
// //         const lat = Number(place.lat);
// //         const lng = Number(place.lon);

// //         if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
// //           setGeoError("Invalid geocode result for specified location.");
// //         } else {
// //           setLocation({ lat, lng });
// //           setGeoError(null);
// //         }
// //       }
// //     } catch (e) {
// //       console.error(e);
// //       setGeoError("Unable to resolve location. Check network or try another location.");
// //     } finally {
// //       setIsSearchLoading(false);
// //     }
// //   };


// //   const {
// //     data: mapData,
// //     isLoading,
// //     isError,
// //     refetch,
// //   } = useNearbyDiagnosticsQuery({
// //     lat: location?.lat ?? 0,
// //     lng: location?.lng ?? 0,
// //     distance: radius,
// //   });

// //   useEffect(() => {
// //     if (location) {
// //       refetch();
// //     }
// //   }, [location, radius, refetch]);

// // return (
// //   <Box sx={{ mt: "80px", mb: 6, px: { xs: 2, md: 4 } }}>

// //     {/* HEADER */}
// //     <Box textAlign="center" mb={4}>
// //       <Typography variant="h4" fontWeight={700}>
// //         Nearby Diagnostics
// //       </Typography>
// //       <Typography color="#64748b" mt={1}>
// //         Find diagnostic centers near your location with real-time distance tracking
// //       </Typography>
// //     </Box>

// //     {/* SEARCH BAR */}
// //     <Box
// //       display="flex"
// //       justifyContent="center"
// //       gap={2}
// //       mb={4}
// //       flexWrap="wrap"
// //     >
// //       <TextField
// //         label="Search location"
// //         value={locationQuery}
// //         onChange={(e) => setLocationQuery(e.target.value)}
// //         sx={{ minWidth: 280 }}
// //       />
// //       <Button
// //         variant="contained"
// //         onClick={handleSearchByLocation}
// //         disabled={isSearchLoading}
// //         sx={{
// //           px: 3,
// //           borderRadius: "10px",
// //           background: "linear-gradient(90deg,#5e72e4,#4f63d6)",
// //         }}
// //       >
// //         {isSearchLoading ? "Searching..." : "Search"}
// //       </Button>
// //     </Box>

// //     {/* FILTER */}
// //     <Box
// //       display="flex"
// //       justifyContent="center"
// //       gap={2}
// //       mb={4}
// //       flexWrap="wrap"
// //     >
// //       {nearestDistanceOptions.map((option) => (
// //         <Button
// //           key={option}
// //           variant={radius === option ? "contained" : "outlined"}
// //           onClick={() => setRadius(option)}
// //           sx={{
// //             borderRadius: "20px",
// //             px: 3,
// //           }}
// //         >
// //           {option / 1000} km
// //         </Button>
// //       ))}
// //     </Box>

// //     {/* STATUS */}
// //     {geoError && (
// //       <Typography color="error" textAlign="center" mb={2}>
// //         {geoError}
// //       </Typography>
// //     )}

// //     {isLoading && (
// //       <Box display="flex" justifyContent="center" mb={3}>
// //         <CircularProgress />
// //       </Box>
// //     )}

// //     {/* RESULTS */}
// //     <Box mt={4}>
// //       {mapData?.data?.length === 0 ? (
// //         <Typography textAlign="center" color="#64748b">
// //           No centers found nearby
// //         </Typography>
// //       ) : (
// //         mapData?.data?.map((item) => {
// //           const [lng, lat] = item.location?.coordinates ?? [0, 0];

// //           return (
// //             <Card
// //               key={item._id}
// //               sx={{
// //                 mb: 3,
// //                 borderRadius: 4,
// //                 boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
// //                 overflow: "hidden",
// //               }}
// //             >
// //               <Box
// //                 sx={{
// //                   display: "grid",
// //                   gridTemplateColumns: {
// //                     xs: "1fr",
// //                     md: "1fr 1fr",
// //                   },
// //                 }}
// //               >

// //                 {/* LEFT INFO */}
// //                 <CardContent>
// //                   <Typography fontWeight={700} fontSize={18}>
// //                     {item.name}
// //                   </Typography>

// //                   <Typography color="#64748b" mt={1}>
// //                     {item.address}
// //                   </Typography>

// //                   <Typography mt={1}>
// //                     📞 {item.phone}
// //                   </Typography>

// //                   <Typography
// //                     mt={1}
// //                     sx={{
// //                       color: "#5e72e4",
// //                       fontWeight: 600,
// //                     }}
// //                   >
// //                     {(item.distance / 1000).toFixed(2)} km away
// //                   </Typography>

// //                   <Button
// //                     variant="contained"
// //                     size="small"
// //                     sx={{
// //                       mt: 2,
// //                       borderRadius: "8px",
// //                       background:
// //                         "linear-gradient(90deg,#5e72e4,#4f63d6)",
// //                     }}
// //                     onClick={() => {
// //                       const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
// //                       window.open(url, "_blank");
// //                     }}
// //                   >
// //                     Get Directions
// //                   </Button>
// //                 </CardContent>

// //                 {/* RIGHT MAP */}
// //                 <Box
// //                   sx={{
// //                     width: "100%",
// //                     height: { xs: 200, md: "100%" },
// //                   }}
// //                 >
// //                   <iframe
// //                     width="100%"
// //                     height="100%"
// //                     style={{ border: 0 }}
// //                     loading="lazy"
// //                     src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
// //                   />
// //                 </Box>

// //               </Box>
// //             </Card>
// //           );
// //         })
// //       )}
// //     </Box>
// //   </Box>
// // );

// // };

// // export default AreaMap;


// "use client";

// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// import {
//   Box,
//   Typography,
//   Button,
//   TextField,
//   Card,
//   CardContent,
//   CircularProgress,
// } from "@mui/material";

// import { useNearbyDiagnosticsQuery } from "@/customhooks/query/areaMap.query.hooks";

// // Prevent SSR issue for map
// const Map = dynamic(() => import("./mapComponent"), { ssr: false });

// const nearestDistanceOptions = [1000, 2000, 5000, 10000];

// const AreaMap = () => {
//   const [geoError, setGeoError] = useState<string | null>(null);
//   const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
//   const [radius, setRadius] = useState<number>(5000);
//   const [locationQuery, setLocationQuery] = useState("");
//   const [isSearchLoading, setIsSearchLoading] = useState(false);

//   // 📍 Get current location
//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setGeoError("Geolocation is not supported by your browser.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setLocation({
//           lat: pos.coords.latitude,
//           lng: pos.coords.longitude,
//         });
//       },
//       () => {
//         setGeoError("Allow location access or search manually.");
//       }
//     );
//   }, []);

//   // 🔍 Search by place name
//   const handleSearchByLocation = async () => {
//     if (!locationQuery.trim()) {
//       setGeoError("Enter a location name.");
//       return;
//     }

//     setGeoError(null);
//     setIsSearchLoading(true);

//     try {
//       const res = await fetch(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//           locationQuery
//         )}&limit=1`
//       );
//       const data = await res.json();

//       if (data.length === 0) {
//         setGeoError("Location not found.");
//       } else {
//         setLocation({
//           lat: Number(data[0].lat),
//           lng: Number(data[0].lon),
//         });
//       }
//     } catch {
//       setGeoError("Search failed.");
//     } finally {
//       setIsSearchLoading(false);
//     }
//   };

//   // 📡 Fetch nearby centers
//   const {
//     data: mapData,
//     isLoading,
//     refetch,
//   } = useNearbyDiagnosticsQuery({
//     lat: location?.lat ?? 0,
//     lng: location?.lng ?? 0,
//     distance: radius,
//   });

//   useEffect(() => {
//     if (location) refetch();
//   }, [location, radius, refetch]);

//   return (
//     <Box sx={{ mt: "80px", px: { xs: 2, md: 4 }, mb: 6 }}>
      
//       {/* HEADER */}
//       <Box textAlign="center" mb={4}>
//         <Typography variant="h4" fontWeight={700}>
//           Nearby Diagnostics
//         </Typography>
//         <Typography color="#64748b" mt={1}>
//           Find diagnostic centers near you
//         </Typography>
//       </Box>

//       {/* SEARCH */}
//       <Box display="flex" justifyContent="center" gap={2} mb={3} flexWrap="wrap">
//         <TextField
//           label="Search location"
//           value={locationQuery}
//           onChange={(e) => setLocationQuery(e.target.value)}
//           sx={{ minWidth: 280 }}
//         />

//         <Button
//           variant="contained"
//           onClick={handleSearchByLocation}
//           disabled={isSearchLoading}
//           sx={{
//             borderRadius: "10px",
//             background: "linear-gradient(90deg,#5e72e4,#4f63d6)",
//           }}
//         >
//           {isSearchLoading ? "Searching..." : "Search"}
//         </Button>
//       </Box>

//       {/* FILTER */}
//       <Box display="flex" justifyContent="center" gap={2} mb={3}>
//         {nearestDistanceOptions.map((opt) => (
//           <Button
//             key={opt}
//             variant={radius === opt ? "contained" : "outlined"}
//             onClick={() => setRadius(opt)}
//             sx={{ borderRadius: "20px" }}
//           >
//             {opt / 1000} km
//           </Button>
//         ))}
//       </Box>

//       {/* ERROR */}
//       {geoError && (
//         <Typography color="error" textAlign="center" mb={2}>
//           {geoError}
//         </Typography>
//       )}

//       {/* LOADING */}
//       {isLoading && (
//         <Box display="flex" justifyContent="center">
//           <CircularProgress />
//         </Box>
//       )}

//       {/* MAIN LAYOUT */}
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: { xs: "1fr", md: "1fr 1.5fr" },
//           gap: 3,
//         }}
//       >
//         {/* LEFT: CARDS */}
//         <Box sx={{ maxHeight: "600px", overflowY: "auto" }}>
//           {mapData?.data?.map((item: any) => {
//             const [lng, lat] = item.location?.coordinates ?? [0, 0];

//             return (
//               <Card
//                 key={item._id}
//                 sx={{
//                   mb: 2,
//                   borderRadius: 3,
//                   cursor: "pointer",
//                   transition: "0.3s",
//                   "&:hover": {
//                     transform: "translateY(-4px)",
//                     boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
//                   },
//                 }}
//                 onClick={() => setLocation({ lat, lng })}
//               >
//                 <CardContent>
//                   <Typography fontWeight={700}>
//                     {item.name}
//                   </Typography>

//                   <Typography color="#64748b" fontSize={14}>
//                     {item.address}
//                   </Typography>

//                   <Typography mt={1}>
//                     📞 {item.phone}
//                   </Typography>

//                   <Typography sx={{ color: "#5e72e4", fontWeight: 600 }}>
//                     {(item.distance / 1000).toFixed(2)} km away
//                   </Typography>

//                   <Button
//                     size="small"
//                     sx={{ mt: 1 }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       window.open(
//                         `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
//                         "_blank"
//                       );
//                     }}
//                   >
//                     Directions
//                   </Button>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </Box>

//         {/* RIGHT: MAP */}
//         <Box
//           sx={{
//             height: "600px",
//             borderRadius: 3,
//             overflow: "hidden",
//           }}
//         >
//           <Map data={mapData?.data} center={location} />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AreaMap;



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
} from "@mui/material";

import { useNearbyDiagnosticsQuery } from "@/customhooks/query/areaMap.query.hooks";

// ✅ Disable SSR for map
const Map = dynamic(() => import("./mapComponent"), { ssr: false });

const nearestDistanceOptions = [1000, 2000, 5000, 10000];

const AreaMap = () => {
  const [geoError, setGeoError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [radius, setRadius] = useState<number>(5000);
  const [locationQuery, setLocationQuery] = useState("");
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  // ✅ NEW: selected card
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 📍 Get user location
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

  // 🔍 Search location
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

  // 📡 Fetch nearby diagnostics
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

//   return (
//     <Box sx={{ mt: "80px", px: { xs: 2, md: 4 }, mb: 6 }}>
      
//       {/* HEADER */}
//       <Box textAlign="center" mb={4}>
//         <Typography variant="h4" fontWeight={700}>
//           Nearby Diagnostics
//         </Typography>
//         <Typography color="#64748b" mt={1}>
//           Find diagnostic centers near you
//         </Typography>
//       </Box>

//       {/* SEARCH */}
//       <Box display="flex" justifyContent="center" gap={2} mb={3} flexWrap="wrap">
//         <TextField
//           label="Search location"
//           value={locationQuery}
//           onChange={(e) => setLocationQuery(e.target.value)}
//           sx={{ minWidth: 280 }}
//         />

//         <Button
//           variant="contained"
//           onClick={handleSearchByLocation}
//           disabled={isSearchLoading}
//           sx={{
//             borderRadius: "10px",
//             background: "linear-gradient(90deg,#5e72e4,#4f63d6)",
//           }}
//         >
//           {isSearchLoading ? "Searching..." : "Search"}
//         </Button>
//       </Box>

//       {/* FILTER */}
//       <Box display="flex" justifyContent="center" gap={2} mb={3}>
//         {nearestDistanceOptions.map((opt) => (
//           <Button
//             key={opt}
//             variant={radius === opt ? "contained" : "outlined"}
//             onClick={() => setRadius(opt)}
//             sx={{ borderRadius: "20px" }}
//           >
//             {opt / 1000} km
//           </Button>
//         ))}
//       </Box>

//       {/* ERROR */}
//       {geoError && (
//         <Typography color="error" textAlign="center" mb={2}>
//           {geoError}
//         </Typography>
//       )}

//       {/* LOADING */}
//       {isLoading && (
//         <Box display="flex" justifyContent="center">
//           <CircularProgress />
//         </Box>
//       )}

//       {/* MAIN LAYOUT */}
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: { xs: "1fr", md: "1fr 1.5fr" },
//           gap: 3,
//         }}
//       >
//         {/* LEFT: CARDS */}
//         <Box sx={{ maxHeight: "600px", overflowY: "auto" }}>
//           {mapData?.data?.map((item: any) => {
//             const [lng, lat] = item.location?.coordinates ?? [0, 0];
//             const isActive = selectedId === item._id;

//             return (
//               <Card
//                 key={item._id}
//                 sx={{
//                   mb: 2,
//                   borderRadius: 3,
//                   cursor: "pointer",
//                   border: isActive ? "2px solid #5e72e4" : "none",
//                   transition: "0.3s",
//                   "&:hover": {
//                     transform: "translateY(-4px)",
//                     boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
//                   },
//                 }}
//                 onClick={() => {
//                   setLocation({ lat, lng });
//                   setSelectedId(item._id);
//                 }}
//               >
//                 <CardContent>
//                   <Typography fontWeight={700}>
//                     {item.name}
//                   </Typography>

//                   <Typography color="#64748b" fontSize={14}>
//                     {item.address}
//                   </Typography>

//                   <Typography mt={1}>
//                     📞 {item.phone}
//                   </Typography>

//                   <Typography sx={{ color: "#5e72e4", fontWeight: 600 }}>
//                     {(item.distance / 1000).toFixed(2)} km away
//                   </Typography>

//                   <Button
//                     size="small"
//                     sx={{ mt: 1 }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       window.open(
//                         `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
//                         "_blank"
//                       );
//                     }}
//                   >
//                     Directions
//                   </Button>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </Box>

//         {/* RIGHT: MAP */}
//         <Box
//   sx={{
//     height: "600px",
//     width: "100%",
//     position: "relative",
//     borderRadius: 3,
//     overflow: "hidden",
//   }}
// >
//           <Map
//             data={mapData?.data}
//             center={location}
//             selectedId={selectedId}
//           />
//         </Box>
//       </Box>
//     </Box>
//   );



return (
  <Box
    sx={{
      mt: "40px", // 🔥 reduced top space
      px: { xs: 2, md: 6 },
      py: 3,
      background: "#f8fbff",
      minHeight: "100vh",
    }}
  >
    {/* HEADER + DESCRIPTION */}
    <Box maxWidth="900px" mx="auto" mb={4}>
      <Typography fontSize={{ xs: 26, md: 34 }} fontWeight={700}>
        Nearby Diagnostics
      </Typography>

      <Typography color="#64748b" mt={1}>
        Easily find trusted diagnostic centers near your location. Compare distances,
        explore facilities, and get directions instantly — all in one place.
      </Typography>
    </Box>

    {/* SEARCH */}
    <Box display="flex" gap={2} mb={3} flexWrap="wrap">
      <TextField
        placeholder="Search location..."
        value={locationQuery}
        onChange={(e) => setLocationQuery(e.target.value)}
        sx={{
          minWidth: 280,
          background: "#fff",
          borderRadius: "10px",
        }}
      />

      <Button
        onClick={handleSearchByLocation}
        disabled={isSearchLoading}
        sx={{
          px: 4,
          borderRadius: "10px",
          background: "#1976d2",
          color: "#fff",
          fontWeight: 600,
        }}
      >
        {isSearchLoading ? "Searching..." : "Search"}
      </Button>
    </Box>

    {/* FILTER */}
    <Box display="flex" gap={2} mb={4}>
      {nearestDistanceOptions.map((opt) => (
        <Button
          key={opt}
          onClick={() => setRadius(opt)}
          sx={{
            borderRadius: "999px",
            px: 3,
            background: radius === opt ? "#1976d2" : "#fff",
            color: radius === opt ? "#fff" : "#1976d2",
            border: "1px solid #e2e8f0",
          }}
        >
          {opt / 1000} km
        </Button>
      ))}
    </Box>

    {/* ERROR */}
    {geoError && (
      <Typography color="error" mb={2}>
        {geoError}
      </Typography>
    )}

    {/* LOADING */}
    {isLoading && (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    )}

    {/* MAIN GRID */}
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr" }, // 🔥 map smaller
        gap: 4,
      }}
    >
      {/* LEFT: BIG CARDS */}
      <Box sx={{ maxHeight: "650px", overflowY: "auto", pr: 1 }}>
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
                mb: 3,
                borderRadius: "18px",
                cursor: "pointer",
                background: "#fff",
                border: isActive
                  ? "2px solid #1976d2"
                  : "1px solid #e2e8f0",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography fontWeight={700} fontSize={18}>
                  {item.name}
                </Typography>

                <Typography color="#64748b" mt={0.5}>
                  {item.address}
                </Typography>

                <Typography mt={1}>
                  📞 {item.phone}
                </Typography>

                <Typography
                  mt={1}
                  sx={{ color: "#1976d2", fontWeight: 600 }}
                >
                  {(item.distance / 1000).toFixed(2)} km away
                </Typography>

                <Button
                  sx={{
                    mt: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    color: "#1976d2",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
                      "_blank"
                    );
                  }}
                >
                  Get Directions →
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      {/* RIGHT: MAP (COMPRESSED) */}
      <Box
        sx={{
          height: "550px", // 🔥 slightly smaller
          borderRadius: "16px",
          overflow: "hidden",
          background: "#fff",
          border: "1px solid #e2e8f0",
        }}
      >
        <Map
          data={mapData?.data}
          center={location}
          selectedId={selectedId}
        />
      </Box>
    </Box>
  </Box>
);
};

export default AreaMap;