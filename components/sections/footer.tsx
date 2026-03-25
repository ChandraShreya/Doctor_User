"use client";

import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  LocationOn,
  Email,
  Phone,
} from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#0b1220",
        color: "#94a3b8",
        mt: 10,
        marginLeft: "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)",
        paddingLeft: "calc(50vw - 50%)",
        paddingRight: "calc(50vw - 50%)",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* FLEX WRAPPER */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            justifyContent: "space-between",
          }}
        >
          {/* COLUMN 1 */}
          <Box sx={{ flex: "1 1 220px", minWidth: 220 }}>
            <Typography
              variant="h6"
              sx={{ color: "#e2e8f0", mb: 2, fontWeight: 600 }}
            >
              Get In Touch
            </Typography>

            <Typography sx={{ mb: 3, fontSize: 14 }}>
              We provide trusted healthcare services with expert doctors and
              modern facilities for better care.
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
              <LocationOn sx={{ color: "#3b82f6", mr: 1 }} />
              <Typography variant="body2">
                Kolkata, India
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
              <Email sx={{ color: "#3b82f6", mr: 1 }} />
              <Typography variant="body2">
                info@example.com
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Phone sx={{ color: "#3b82f6", mr: 1 }} />
              <Typography variant="body2">
                +91 98765 43210
              </Typography>
            </Box>
          </Box>

          {/* COLUMN 2 */}
          <Box sx={{ flex: "1 1 180px", minWidth: 180 }}>
            <Typography
              variant="h6"
              sx={{ color: "#e2e8f0", mb: 2, fontWeight: 600 }}
            >
              Quick Links
            </Typography>

            {["Home", "About", "Services", "Doctors", "Contact"].map(
              (item) => (
                <Typography
                  key={item}
                  sx={{
                    mb: 1,
                    fontSize: 14,
                    cursor: "pointer",
                    transition: "0.2s",
                    "&:hover": { color: "#3b82f6" },
                  }}
                >
                  {item}
                </Typography>
              )
            )}
          </Box>

          {/* COLUMN 3 */}
          <Box sx={{ flex: "1 1 180px", minWidth: 180 }}>
            <Typography
              variant="h6"
              sx={{ color: "#e2e8f0", mb: 2, fontWeight: 600 }}
            >
              Services
            </Typography>

            {[
              "Appointments",
              "Emergency Care",
              "Diagnostics",
              "Consultation",
            ].map((item) => (
              <Typography
                key={item}
                sx={{
                  mb: 1,
                  fontSize: 14,
                  cursor: "pointer",
                  "&:hover": { color: "#3b82f6" },
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>

          {/* COLUMN 4 */}
          <Box sx={{ flex: "1 1 240px", minWidth: 240 }}>
            <Typography
              variant="h6"
              sx={{ color: "#e2e8f0", mb: 2, fontWeight: 600 }}
            >
              Stay Updated
            </Typography>

            <Typography sx={{ fontSize: 14, mb: 2 }}>
              Subscribe to get latest updates and offers.
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                placeholder="Email address"
                size="small"
                fullWidth
                sx={{
                  bgcolor: "#111827",
                  borderRadius: 1,
                  input: { color: "#fff" },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#3b82f6",
                  textTransform: "none",
                  px: 3,
                }}
              >
                Join
              </Button>
            </Box>

            {/* SOCIAL */}
            <Box sx={{ display: "flex", gap: 1.5, mt: 3 }}>
              {[Twitter, Facebook, LinkedIn, Instagram].map((Icon, i) => (
                <IconButton
                  key={i}
                  sx={{
                    bgcolor: "#111827",
                    color: "#cbd5f5",
                    "&:hover": { bgcolor: "#3b82f6", color: "#fff" },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>

      {/* BOTTOM */}
      <Box
        sx={{
          textAlign: "center",
          py: 2,
          color: "#64748b",
          fontSize: 13,
        }}
      >
        © {new Date().getFullYear()} MediCore. Crafted with care.
      </Box>
    </Box>
  );
}