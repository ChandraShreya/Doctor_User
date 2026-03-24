"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";


const images = [
  "/images/Surgery.jpg",      
  "/images/DoctorConsultation.jpg", 
  "/images/patientCare.jpg",           
];

const HeroBanner = () => {
  const [bgIndex, setBgIndex] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "75vh", md: "90vh" },
        display: "flex",
        alignItems: "center",
        px: { xs: 3, md: 10 },
        color: "#fff",
        backgroundImage: `url(${images[bgIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1.2s ease-in-out",
      }}
    >
      {/* OVERLAY */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
        }}
      />

      {/*  CONTENT */}
      <Box sx={{ position: "relative", maxWidth: "700px" }}>
        <Typography
          sx={{
            fontSize: { xs: "13px", md: "15px" },
            letterSpacing: "2px",
            mb: 2,
            opacity: 0.85,
          }}
        >
          TRUSTED HEALTHCARE
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "30px", md: "56px" },
            fontWeight: 700,
            lineHeight: 1.2,
            mb: 3,
          }}
        >
          Expert Care You Can Trust, Every Day
        </Typography>

        {/*  BUTTONS */}
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 600,
              background:
                "linear-gradient(135deg, #1976d2, #42a5f5)",
              boxShadow: "0 6px 20px rgba(25,118,210,0.4)",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #1565c0, #1e88e5)",
              },
            }}
          >
            Appointment
          </Button>

          <Link href="/doctor" style={{ textDecoration: "none" }}>
  <Button
    variant="outlined"
    sx={{
      px: 4,
      py: 1.5,
      borderRadius: "10px",
      textTransform: "none",
      fontWeight: 600,
      color: "#fff",
      borderColor: "rgba(255,255,255,0.6)",
      backdropFilter: "blur(6px)",
      "&:hover": {
        borderColor: "#fff",
        backgroundColor: "rgba(255,255,255,0.1)",
      },
    }}
  >
    Find Doctor
  </Button>
</Link>
        </Stack>
      </Box>
    </Box>
  );
};

export default HeroBanner;