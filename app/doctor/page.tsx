"use client";

import DoctorListPage from "@/components/doctor/doctor-list";
import { Box, Container } from "@mui/material";
// import DoctorListPage from "@/components/doctor/doctor-form";

export default function DoctorPage() {
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom,#f8fafc,#eef2ff)", 
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          py: { xs: 4, md: 6 },
        }}
      >
        <Container
          maxWidth={false} 
          sx={{
            maxWidth: "1700px", 
            mx: "auto",
            px: { xs: 2, md: 3 },
          }}
        >
          <DoctorListPage />
        </Container>
      </Box>
    </Box>
  );
}