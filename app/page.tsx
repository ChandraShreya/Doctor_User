"use client";

import { useState } from "react";
import HeroBanner from "@/components/sections/banner";
import AboutSection from "@/components/sections/about";
import Navbar from "@/components/sections/navbar";
import Register from "@/components/auth/register-form";
import OtpModal from "@/components/auth/otp-form";
import SignIn from "@/components/auth/signIn-form";
import DepartmentSection from "@/components/sections/departmentList";
import ServiceSection from "@/components/sections/service";
// import OtpModal from "@/components/auth/otp-form";
// import Register from "@/components/auth/register-form";
// import SignIn from "@/components/auth/signIn-form";
// import DepartmentSection from "@/components/sections/departmentList";
// import ServiceSection from "@/components/sections/service";


export default function Home() {
  const [signupOpen, setSignupOpen] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [signinOpen, setSigninOpen] = useState(false);

  const [otpData, setOtpData] = useState({
    email: "",
    userId: "",
  });

  return (
    <>
      <Navbar onSignupClick={() => setSignupOpen(true)} />

      {/* SIGNUP */}
      <Register
        open={signupOpen}
        handleClose={() => setSignupOpen(false)}
        onSuccess={({ email, userId }) => {
          console.log("parent received", email, userId);
          setOtpData({ email, userId });
          setOtpOpen(true);
        }}

        onSwitchToLogin={() => {
          setSignupOpen(false);  // close register
          setSigninOpen(true);   // open login modal
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

      <SignIn
        open={signinOpen}
        handleClose={() => setSigninOpen(false)}
      />
      <HeroBanner />
      <AboutSection />
      <DepartmentSection/>
      <ServiceSection/>
    </>
  );
}
