"use client";

import AreaMap from "@/components/doctor/area-map";
import { Box, Container } from "@mui/material";

export default function AreaMapPage() {
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
          <AreaMap />
        </Container>
      </Box>
    </Box>
  );
}
