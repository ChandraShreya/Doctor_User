


"use client";

import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Divider,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import { useForm } from "react-hook-form";

import { toast } from "sonner";
import { useSignUpMutation } from "@/customhooks/query/auth.query.hooks";
import React from "react";

interface Props {
  open: boolean;
  handleClose: () => void;
  onSuccess:(data: { email: string; userId: string }) => void;
  onSwitchToLogin: () => void; 
}

const Register: React.FC<Props> = ({
  open,
  handleClose,
  onSuccess, 
  onSwitchToLogin
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isPending } = useSignUpMutation();
  const password = watch("password");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

const onSubmit = async (data: any) => {
  try {
    const res = await mutateAsync(data);

    const apiData = res?.data || res;
    const email = apiData?.data?.email || apiData?.email;
    const userId = apiData?.data?.id || apiData?.id;

    console.log("API response:", res);
    console.log("EMAIL:", email);
    console.log("USER ID:", userId);

    if (!email || !userId) {
      toast.error("Registration completed but user details are missing. Please try logging in.");
      return;
    }

    handleClose(); 
    console.log("before call")
    
    onSuccess?.({ email, userId });
    console.log("after call")

  } catch (err: any) {
    console.log("Registration submission error:", err);
    const errorMessage = err?.response?.data?.message || err?.message || "An error occurred during registration";
    toast.error(errorMessage);
  }
};

  return (
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
            background:
              "linear-gradient(135deg, #1976d2, #42a5f5)",
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
            Create Account
          </Typography>

          <Typography fontSize="13px" sx={{ opacity: 0.85 }}>
            Access better healthcare with Averon
          </Typography>
        </Box>

        {/* BODY */}
        <Box sx={{ px: 4, py: 3 }}>
          {/* GOOGLE */}
          {/* <Button
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
          </Button> */}

          {/* <Divider sx={{ my: 2 }}>OR</Divider> */}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={2}>
            {/* ROW 1 */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <TextField
                {...register("first_name")}
                placeholder="First Name"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    height: 50,
                    "& fieldset": {
                      borderColor: "#e2e8f0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#3b82f6",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#2563eb",
                    },
                  },
                }}
              />
              <TextField
                {...register("last_name")}
                placeholder="Last Name"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    height: 50,
                    "& fieldset": {
                      borderColor: "#e2e8f0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#3b82f6",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#2563eb",
                    },
                  },
                }}
              />
            </Box>

            {/* ROW 2 */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <TextField
                {...register("email")}
                placeholder="Email Address"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    height: 50,
                    "& fieldset": {
                      borderColor: "#e2e8f0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#3b82f6",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#2563eb",
                    },
                  },
                }}
              />
              <TextField
                {...register("address")}
                placeholder="Address"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    height: 50,
                    "& fieldset": {
                      borderColor: "#e2e8f0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#3b82f6",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#2563eb",
                    },
                  },
                }}
              />
            </Box>

            {/* ROW 3 */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <TextField
                {...register("password")}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    height: 50,
                    "& fieldset": {
                      borderColor: "#e2e8f0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#3b82f6",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#2563eb",
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowPassword((show) => !show)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                {...register("confirm_password", {
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    height: 50,
                    "& fieldset": {
                      borderColor: "#e2e8f0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#3b82f6",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#2563eb",
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowConfirmPassword((show) => !show)}
                        edge="end"
                        size="small"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
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
                color: "#fff",
                background: "linear-gradient(90deg, #1976d2, #42a5f5)",
                boxShadow: "0 8px 24px rgba(25,118,210,0.4)",
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
                "Create Account"
              )}
            </Button>
          </Box>
    <Typography
      mt={2}
      fontSize="13px"
      textAlign="center"
      color="text.secondary"
    >
      Already have an account?{' '}
      <Box
        component="span"
        onClick={() => {
          handleClose();
          onSwitchToLogin();
        }}
        sx={{
          fontWeight: 600,
          cursor: "pointer",
          color: "#1976d2",
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        Sign In
      </Box>
    </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Register;
