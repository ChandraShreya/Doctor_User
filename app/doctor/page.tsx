"use client";

import { useState } from "react";
import DoctorListPage from "@/components/doctor/doctor-list";
import { Box, Container } from "@mui/material";
import SignIn from "@/components/auth/signIn-form";
import Register from "@/components/auth/register-form";
import OtpModal from "@/components/auth/otp-form";

export default function DoctorPage() {
  const [signupOpen, setSignupOpen] = useState(false);
  const [signinOpen, setSigninOpen] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpData, setOtpData] = useState({
    email: "",
    userId: "",
  });

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
          <DoctorListPage onSignup={() => setSignupOpen(true)} onSignin={() => setSigninOpen(true)} />
        </Container>
      </Box>

      {/* SIGNUP */}
      <Register
        open={signupOpen}
        handleClose={() => setSignupOpen(false)}
        onSuccess={({ email, userId }) => {
          setOtpData({ email, userId });
          setOtpOpen(true);
        }}
        onSwitchToLogin={() => {
          setSignupOpen(false);
          setSigninOpen(true);
        }}
      />

      {/* OTP */}
      <OtpModal
        open={otpOpen}
        handleClose={() => setOtpOpen(false)}
        email={otpData.email}
        userId={otpData.userId}
        onSuccess={() => {
          setOtpOpen(false);
          setSigninOpen(true);
        }}
      />

      {/* SIGNIN */}
      <SignIn
        open={signinOpen}
        handleClose={() => setSigninOpen(false)}
        onSwitchToSignup={() => {
          setSigninOpen(false);
          setSignupOpen(true);
        }}
      />
    </Box>
  );
}