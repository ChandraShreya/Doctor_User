"use client";

import { Box, CircularProgress, Typography } from "@mui/material";

interface PageLoaderProps {
  message?: string;
  fullPage?: boolean;
}

export default function PageLoader({
  message = "Loading...",
  fullPage = true,
}: PageLoaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        ...(fullPage
          ? {
              position: "fixed",
              inset: 0,
              background: "linear-gradient(135deg,rgba(255,255,255,0.95),rgba(248,250,252,0.95))",
              zIndex: 9999,
              backdropFilter: "blur(4px)",
            }
          : {
              minHeight: "400px",
            }),
      }}
    >
      {/* ANIMATED LOADER */}
      <Box
        sx={{
          position: "relative",
          width: 80,
          height: 80,
        }}
      >
        <CircularProgress
          size={80}
          thickness={4}
          sx={{
            color: "#2563eb",
            "& circle": {
              strokeLinecap: "round",
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 24,
            background: "linear-gradient(135deg,#2563eb,#3b82f6)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          M
        </Box>
      </Box>

      {/* LOADING TEXT */}
      <Typography
        sx={{
          color: "#334155",
          fontSize: 16,
          fontWeight: 600,
          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          "@keyframes pulse": {
            "0%, 100%": {
              opacity: 1,
            },
            "50%": {
              opacity: 0.5,
            },
          },
        }}
      >
        {message}
      </Typography>

      {/* LOADING DOTS */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          mt: 2,
        }}
      >
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#2563eb",
              animation: "wave 1.2s infinite",
              animationDelay: `${i * 0.2}s`,
              "@keyframes wave": {
                "0%, 60%, 100%": {
                  transform: "translateY(0)",
                  opacity: 0.5,
                },
                "30%": {
                  transform: "translateY(-10px)",
                  opacity: 1,
                },
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
