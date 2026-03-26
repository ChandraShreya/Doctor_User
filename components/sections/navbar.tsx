"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Container,
  Stack,
  Avatar,
  Modal,
  Fade,
  Backdrop,
  Divider,
  Card,
  CardContent,
  Chip,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { Cookies } from "react-cookie";
import useUserHistory, { useLogoutMutation, useUserProfileQuery } from "@/customhooks/query/auth.query.hooks";


interface NavbarProps {
  onSignupClick?: () => void;
}

//
// NAVBAR COMPONENT
//
const Navbar: React.FC<NavbarProps> = ({ onSignupClick }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{ userId: string; userName: string; email: string } | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const logoutMutation = useLogoutMutation();
  const { data: profileData, refetch: refetchProfile, isLoading: profileLoading } = useUserProfileQuery();
  const { data: historyData, isLoading: historyLoading } = useUserHistory();

  useEffect(() => {
    const checkAuthState = () => {
      const cookies = new Cookies();
      const token = cookies.get("token");
      const userId = localStorage.getItem("userId");
      const userName = localStorage.getItem("userName");
      const email = localStorage.getItem("email");

      if (token && userId && email) {
        const safeName = userName || "User";
        setIsLoggedIn(true);
        setUserData({ userId, userName: safeName, email });
        localStorage.setItem("userName", safeName);
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    };

    
    checkAuthState();

    //  storage changes 
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "userId" || e.key === "userName" || e.key === "email") {
        checkAuthState();
      }
    };

    // custom auth change events
    const handleAuthChange = () => {
      checkAuthState();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  // Update user data when profile loads
  useEffect(() => {
    if (profileData && userData) {
      // Handle different possible response structures
      const profileUser = profileData.data || profileData;
      const fullName = profileUser.name ||
        (profileUser.first_name && profileUser.last_name ? `${profileUser.first_name} ${profileUser.last_name}` :
          profileUser.first_name || profileUser.last_name || userData.userName);

      if (fullName !== userData.userName) {
        const updatedUserData = { ...userData, userName: fullName };
        setUserData(updatedUserData);
        localStorage.setItem("userName", fullName);
      }
    }
  }, [profileData, userData]);

  const handleProfileClick = () => {
    setProfileModalOpen(true);
    // Profile data is already loaded automatically, but we can refetch if needed
    // refetchProfile();
  };

  const handleProfileClose = () => {
    setProfileModalOpen(false);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
    handleProfileClose();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };


  /*appointment history */
  const historyPayload = historyData?.data ?? historyData;
const historyList = Array.isArray(historyPayload)
  ? historyPayload
  : historyPayload?.data ?? [];



  return (
    <>
      <AppBar
        position="absolute"
        elevation={0}
        sx={{
          background: "rgba(15, 23, 42, 0.22)",
          backdropFilter: "blur(10px)",
          color: "#fff",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              minHeight: "70px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* LOGO */}
            <Stack direction="row" spacing={1} alignItems="center">
              <MedicalServicesIcon />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                }}
              >
                Averon
              </Typography>
            </Stack>

            {/*  MENU */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 4,
              }}
            >
              <Link href="/" style={{ textDecoration: "none" }}>
                <Typography sx={menuStyle}>HOME</Typography>
              </Link>


              <Link href="/doctor" style={{ textDecoration: "none" }}>
                <Typography sx={menuStyle}>DOCTORS</Typography>
              </Link>

              <Link href="/area-map" style={{ textDecoration: "none" }}>
                <Typography sx={menuStyle}>LOCATION</Typography>
              </Link>
            </Box>

            {/*  RIGHT SIDE */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              {isLoggedIn && userData ? (
                <>
                  <IconButton
                    onClick={handleProfileClick}
                    sx={{ p: 0 }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#93c5fd",
                        color: "#1e293b",
                        width: 40,
                        height: 40,
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      {getInitials(userData.userName)}
                    </Avatar>
                  </IconButton>

                  {/* PROFILE MODAL */}
                  
<Modal
  open={profileModalOpen}
  onClose={handleProfileClose}
  closeAfterTransition
  slots={{ backdrop: Backdrop }}
  slotProps={{
    backdrop: {
      timeout: 500,
    },
  }}
>
  <Fade in={profileModalOpen}>
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: "90%", sm: "500px" },
        maxHeight: "80vh",
        overflow: "auto",

        bgcolor: "#f8fbff",
        border: "1px solid #e2e8f0",
        boxShadow: "0 20px 40px rgba(30, 64, 175, 0.15)",

        borderRadius: "16px",
        p: 0,
        outline: "none",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          p: 3,
          borderBottom: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          gap: 2,
          bgcolor: "#eff6ff",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "#3b82f6",
            color: "#fff",
            width: 60,
            height: 60,
            fontSize: "20px",
            fontWeight: 600,
          }}
        >
          {getInitials(userData.userName)}
        </Avatar>

        <Box>
          <Typography variant="h6" sx={{ color: "#0f172a", fontWeight: 600 }}>
            {userData.userName}
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b" }}>
            {userData.email}
          </Typography>
        </Box>
      </Box>

      {/* CONTENT */}
      <Box sx={{ p: 3 }}>
        {/* PROFILE INFO */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle1"
            sx={{ color: "#0f172a", fontWeight: 600, mb: 2 }}
          >
            Profile Information
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" sx={{ color: "#64748b" }}>
                User ID:
              </Typography>

              <Chip
                label={userData.userId}
                size="small"
                sx={{
                  bgcolor: "#eff6ff",
                  color: "#2563eb",
                  fontSize: "12px",
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body2" sx={{ color: "#64748b" }}>
                Email:
              </Typography>

              <Typography variant="body2" sx={{ color: "#0f172a" }}>
                {userData.email}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ bgcolor: "#e2e8f0", my: 2 }} />

        {/* RECENT APPOINTMENTS */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle1"
            sx={{ color: "#0f172a", fontWeight: 600, mb: 2 }}
          >
            Recent Appointments
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {historyLoading ? (
              <Card
                sx={{
                  bgcolor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                }}
              >
                <CardContent sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="body2" sx={{ color: "#64748b" }}>
                    Loading appointments...
                  </Typography>
                </CardContent>
              </Card>
            ) : historyList.length > 0 ? (
              historyList.slice(0, 2).map((item, index) => {
                const doctor = item?.doctorId || {};
                const st = (item.status || "").toLowerCase();

                let color = "#f59e0b";
                if (st.includes("complete")) color = "#22c55e";
                else if (st.includes("cancel") || st.includes("reject"))
                  color = "#ef4444";

                return (
                  <Card
                    key={index}
                    sx={{
                      bgcolor: "#ffffff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "10px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#0f172a", fontWeight: 500 }}
                      >
                        Dr. {doctor.name || "Unknown Doctor"}
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{ color: "#64748b", display: "block", mt: 0.5 }}
                      >
                        {item.date} • {item.time}
                      </Typography>

                      <Chip
                        label={item.status || "Scheduled"}
                        size="small"
                        sx={{
                          mt: 1,
                          bgcolor: `${color}15`,
                          color: color,
                          fontSize: "10px",
                          fontWeight: 500,
                        }}
                      />
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Card
                sx={{
                  bgcolor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="body2" sx={{ color: "#64748b" }}>
                    No appointments yet
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>

          {/* VIEW ALL */}
          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Link href="/appointmentHistory" style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  color: "#2563eb",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                View All →
              </Typography>
            </Link>
          </Box>
        </Box>

        <Divider sx={{ bgcolor: "#e2e8f0", my: 2 }} />

        {/* LOGOUT */}
        <Button
          onClick={handleLogout}
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "#ef4444",
            color: "#fff",
            borderRadius: "8px",
            py: 1.5,
            fontWeight: 500,
            textTransform: "none",
            boxShadow: "0 8px 20px rgba(239,68,68,0.2)",
            "&:hover": {
              bgcolor: "#dc2626",
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  </Fade>
</Modal>

                </>
              ) : (
                <Button
                  variant="outlined"
                  onClick={onSignupClick}
                  sx={{
                    px: 3,
                    py: 1,
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: 500,
                    color: "#fff",
                    borderColor: "rgba(255,255,255,0.4)",
                    "&:hover": {
                      borderColor: "#fff",
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  Sign Up
                </Button>
              )}

              {/* MOBILE MENU */}
              <IconButton
                sx={{ display: { xs: "flex", md: "none" }, color: "#fff" }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>


    </>
  );
};

//
//  MENU STYLE
//
const menuStyle = {
  fontSize: "14px",
  fontWeight: 600,
  color: "#fff",
  cursor: "pointer",
  letterSpacing: "0.5px",
  position: "relative",

  "&:hover": {
    color: "#93c5fd",
  },

  "&::after": {
    content: '""',
    position: "absolute",
    width: "0%",
    height: "2px",
    left: 0,
    bottom: "-4px",
    backgroundColor: "#93c5fd",
    transition: "0.3s",
  },

  "&:hover::after": {
    width: "100%",
  },
};

export default Navbar;