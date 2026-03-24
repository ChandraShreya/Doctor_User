"use client";

import React from "react";
import { Box, Container, Typography } from "@mui/material";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";

import "swiper/css";

import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HealingIcon from "@mui/icons-material/Healing";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import ScienceIcon from "@mui/icons-material/Science";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const services = [
  {
    title: "Emergency Care",
    description: "24/7 immediate medical assistance.",
    icon: <LocalHospitalIcon />,
  },
  {
    title: "Operation & Surgery",
    description: "Advanced surgical procedures.",
    icon: <MedicalServicesIcon />,
  },
  {
    title: "Outdoor Checkup",
    description: "Routine checkups for patients.",
    icon: <HealingIcon />,
  },
  {
    title: "Ambulance Service",
    description: "Fast emergency transport.",
    icon: <AirportShuttleIcon />,
  },
  {
    title: "Medicine & Pharmacy",
    description: "Reliable pharmacy support.",
    icon: <LocalPharmacyIcon />,
  },
  {
    title: "Blood Testing",
    description: "Accurate lab testing.",
    icon: <ScienceIcon />,
  },
];

const ServiceSection = () => {
  return (
    <Box sx={{ py: 10, backgroundColor: "#f9fbfd" }}>
      
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          width: "100%",
          px: { xs: 2, sm: 4, md: 6, lg: 12 }, 
        }}
      >
        {/* Heading */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="subtitle2"
            sx={{
              color: "#1976d2",
              fontWeight: 600,
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            Services
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#1a2a3a",
            }}
          >
            Excellent Medical Services
          </Typography>
        </Box>

        
        <Box
          sx={{
            px: { xs: 1, sm: 2, md: 3 },
          }}
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1.2}
            loop={true}

            
            speed={1200}
            autoplay={{
              delay: 1200,
              disableOnInteraction: false,
            }}

            breakpoints={{
              600: { slidesPerView: 2.2 },
              900: { slidesPerView: 3.2 },
              1200: { slidesPerView: 4.5 }, 
            }}
          >
            {services.map((service, index) => (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    background: "#f4f7fb",
                    height: "100%",

                    display: "flex",
                    flexDirection: "column",

                    transition: "all 0.3s ease",

                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow:
                        "0 12px 30px rgba(25,118,210,0.12)",
                    },
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 55,
                      height: 55,
                      borderRadius: "14px",
                      mb: 2,

                      background:
                        "linear-gradient(135deg, #1ebbd7, #1976d2)",

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      color: "#fff",
                      fontSize: 24,
                    }}
                  >
                    {service.icon}
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      color: "#1a2a3a",
                    }}
                  >
                    {service.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#6b7a90",
                      lineHeight: 1.6,
                    }}
                  >
                    {service.description}
                  </Typography>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>
    </Box>
  );
};

export default ServiceSection;