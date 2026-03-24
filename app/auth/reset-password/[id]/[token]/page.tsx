"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { axiosInstance } from "@/api/axios/axios";
import { toast } from "sonner";
import { useResetPasswordMutation } from "@/customhooks/query/auth.query.hooks";
// import { useResetPasswordMutation } from "@/customHooks/query/auth.query.hooks";
// import { toast } from "react-toastify";


const ResetPasswordPage = () => {
  const { id, token } = useParams();
  const router = useRouter();


  const { mutate, isPending } = useResetPasswordMutation();

  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

const onSubmit = (data: any) => {
  if (data.password !== data.confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  mutate(
    {
      id: id as string,
      token: token as string,
      password: data.password,
      confirm_password: data.confirmPassword,
    },
    {
      onSuccess: () => {
        router.push("/");
      },
    }
  );
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "400px",
          p: 4,
          borderRadius: "16px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#fff",
            fontWeight: 600,
            mb: 1,
          }}
        >
          Reset Password
        </Typography>

        <Typography
          fontSize="13px"
          sx={{ color: "#94a3b8", mb: 3 }}
        >
          Enter your new password below
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("password")}
            type="password"
            placeholder="New Password"
            fullWidth
            size="small"
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                backgroundColor: "#fff",
              },
            }}
          />

          <TextField
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
            fullWidth
            size="small"
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                backgroundColor: "#fff",
              },
            }}
          />

          <Button
  type="submit"
  fullWidth
  disabled={loading}
  sx={{
    height: 45,
    borderRadius: "10px",
    textTransform: "none",
    fontWeight: 600,
    background: "linear-gradient(90deg, #1976d2, #42a5f5)",
    color: "#fff",

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
  {loading ? (
    <Box
      display="flex"
      gap={0.6}
      alignItems="center"
      justifyContent="center"
    >
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
    "Reset Password"
  )}
</Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ResetPasswordPage;