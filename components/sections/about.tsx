"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
} from "@mui/material";
// import Grid from "@mui/material/Grid2";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import BiotechIcon from "@mui/icons-material/Biotech";
import VerifiedIcon from "@mui/icons-material/Verified";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

const features = [
  { icon: <GroupsIcon sx={{ fontSize: 36 }} />, title: "Qualified", subtitle: "Doctors" },
  { icon: <BiotechIcon sx={{ fontSize: 36 }} />, title: "Emergency", subtitle: "Services" },
  { icon: <VerifiedIcon sx={{ fontSize: 36 }} />, title: "Accurate", subtitle: "Testing" },
  { icon: <MonitorHeartIcon sx={{ fontSize: 36 }} />, title: "Free", subtitle: "Ambulance" },
];

const points = [
  "Professional Medical Team",
  "24/7 Emergency Support",
  "Modern Equipment",
  "Affordable Pricing",
];

export default function AboutSection() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, background: "#f8fafc" }}>
      <Container maxWidth="lg">

        <Grid container spacing={8} alignItems="center">

          {/* IMAGE */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                borderRadius: "18px",
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src="/images/about.jpg"
                alt="about"
                sx={{
                  width: "100%",
                  height: { xs: 280, md: 420 },
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid>

          {/* CONTENT */}
          <Grid size={{ xs: 12, md: 6 }}>

            {/* TITLE */}
            <Typography
              sx={{
                color: "#0ea5e9",
                fontWeight: 600,
                fontSize: "13px",
                mb: 1,
                textTransform: "uppercase",
              }}
            >
              About Us
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "28px", md: "38px" },
                fontWeight: 700,
                color: "#1e293b",
                lineHeight: 1.3,
                mb: 2,
              }}
            >
              Best Medical Care For You and Your Family
            </Typography>

            <Typography
              sx={{
                color: "#64748b",
                fontSize: "15px",
                lineHeight: 1.7,
                mb: 4,
              }}
            >
              We provide high-quality healthcare services using modern technology
              and experienced professionals to ensure the best outcomes.
            </Typography>

            {/* CHECKLIST */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {points.map((item, i) => (
                <Grid size={{ xs: 12, sm: 6 }} key={i}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CheckCircleIcon sx={{ color: "#0ea5e9", fontSize: 20 }} />
                    <Typography sx={{ fontSize: "14px", color: "#334155" }}>
                      {item}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* CTA */}
            {/* <Button
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                px: 3,
                py: 1.2,
                background: "#0ea5e9",
                boxShadow: "none",
                "&:hover": {
                  background: "#0284c7",
                  boxShadow: "none",
                },
                mb: 5,
              }}
            >
              Book Appointment
            </Button> */}

            <Grid container spacing={4}>
              {features.map((item, i) => (
                <Grid size={{ xs: 6, sm: 3 }} key={i}>
                  <Box sx={{ textAlign: "center" }}>

                    {/* ICON CIRCLE */}
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        background: "#e6f4fb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2,
                        color: "#0284c7",
                      }}
                    >
                      {item.icon}
                      {/* ICON SIZE
          <Box sx={{ fontSize: 36 }}>
            {item.icon}
          </Box> */}
                    </Box>

                    {/* TITLE */}
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#1e293b",   // ⬅️ darker (important)
                        mb: 0.5,
                      }}
                    >
                      {item.title}
                    </Typography>

                    {/* SUBTITLE */}
                    <Typography
                      sx={{
                        fontSize: "13px",
                        color: "#0284c7",  // ⬅️ clearer blue
                        fontWeight: 500,
                      }}
                    >
                      {item.subtitle}
                    </Typography>

                  </Box>
                </Grid>
              ))}
            </Grid>

          </Grid>

        </Grid>

      </Container>
    </Box>
  );
}