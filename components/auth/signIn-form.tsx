"use client";

import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSignInMutation } from "@/customhooks/query/auth.query.hooks";
import ResetPasswordModal from "./resetpassword-modal";


interface Props {
  open: boolean;
  handleClose: () => void;
  onSwitchToSignup?: () => void;
}

const SignIn: React.FC<Props> = ({ open, handleClose, onSwitchToSignup }) => {
  const { register, handleSubmit } = useForm();
  const { mutateAsync, isPending } = useSignInMutation();
  const [openReset, setOpenReset] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      await mutateAsync(data);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        BackdropProps={{
          sx: {
            background: "rgba(10, 20, 40, 0.6)",
            backdropFilter: "blur(14px)",
          },
        }}
        PaperProps={{
          sx: {
            borderRadius: "22px",
            overflow: "hidden",
            boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>

          {/* HEADER */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #1976d2, #42a5f5)",
              color: "#fff",
              textAlign: "center",
              py: 4,
              position: "relative",
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 12,
                top: 12,
                color: "#fff",
              }}
            >
              <CloseIcon />
            </IconButton>

            <Box
              sx={{
                width: 60,
                height: 60,
                mx: "auto",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <LocalHospitalIcon />
            </Box>

            <Typography fontSize="22px" fontWeight={600}>
              Welcome Back
            </Typography>

            <Typography fontSize="13px" sx={{ opacity: 0.85 }}>
              Login to your Averon account
            </Typography>
          </Box>

          {/* BODY */}
          <Box sx={{ px: 4, py: 3 }}>
            {/* GOOGLE */}
            <Button
              fullWidth
              startIcon={<GoogleIcon />}
              sx={{
                mb: 2,
                height: 46,
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 500,
                background: "#fff",
                color: "#444",
                border: "1px solid #e0e0e0",
                "&:hover": {
                  background: "#f7f7f7",
                },
              }}
            >
              Continue with Google
            </Button>

            <Divider sx={{ my: 2 }}>OR</Divider>

            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                {/* INPUT ROW */}
                <Box sx={{ display: "flex", gap: 2 }}>

                  {/* EMAIL */}
                  <TextField
                    {...register("email")}
                    placeholder="Email Address"
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{
                      flex: 1,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        backgroundColor: "#fff",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid #cbd5e1",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid #1976d2",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid #1976d2",
                      },
                    }}
                  />

                  {/* PASSWORD */}
                  <TextField
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{
                      flex: 1,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        backgroundColor: "#fff",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid #cbd5e1",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid #1976d2",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid #1976d2",
                      },
                    }}
                  />

                </Box>

                {/* FORGOT PASSWORD */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: -1,
                  }}
                >
                  <Typography
                    fontSize="13px"
                    sx={{
                      cursor: "pointer",
                      color: "#1976d2",
                      fontWeight: 600,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                    onClick={() => setOpenReset(true)}
                  >
                    Forgot Password?
                  </Typography>
                </Box>

              </Box>

              {/* LOGIN BUTTON */}
              <Button
                type="submit"
                fullWidth
                disabled={isPending}
                sx={{
                  mt: 3,
                  height: 48,
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 600,
                  background: "linear-gradient(90deg, #1976d2, #42a5f5)",
                  boxShadow: "0 8px 24px rgba(25,118,210,0.4)",
                  color: "#fff",
                  fontSize: "16px",

                  "&:hover": {
                    background: "linear-gradient(90deg, #1565c0, #1e88e5)",
                  },

                  "&.Mui-disabled": {
                    background: "#90caf9",
                    color: "#e3f2fd",
                  },


                  "@keyframes wave": {
                    "0%, 60%, 100%": {
                      transform: "translateY(0)",
                      opacity: 0.5,
                    },
                    "30%": {
                      transform: "translateY(-6px)",
                      opacity: 1,
                    },
                  },
                }}
              >
                {isPending ? (
                  <Box display="flex" gap={0.6} alignItems="center" justifyContent="center">
                    {[0, 1, 2].map((i) => (
                      <Box
                        key={i}
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#fff",
                          animation: "wave 1.2s infinite",
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </Box>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* FOOTER */}
            <Typography
              mt={2}
              fontSize="13px"
              textAlign="center"
              color="text.secondary"
            >
              Don’t have an account?{" "}
              <Box
                component="span"
                onClick={() => {
                  handleClose();
                  onSwitchToSignup?.();
                }}
                sx={{
                  fontWeight: 600,
                  cursor: "pointer",
                  color: "#1976d2",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Sign Up
              </Box>
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>

      {/*  RESET PASSWORD MODAL */}
      <ResetPasswordModal
        open={openReset}
        handleClose={() => setOpenReset(false)}
      />
    </>
  );
};

export default SignIn;