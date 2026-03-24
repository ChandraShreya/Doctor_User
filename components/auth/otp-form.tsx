

"use client";

import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

// import { useOtpMutation } from "@/customHooks/query/auth.query.hooks";
// import { useForm } from "react-hook-form";
import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useOtpMutation } from "@/customhooks/query/auth.query.hooks";


interface Props {
  open: boolean;
  handleClose: () => void;
  email: string;
  userId: string;
  onSuccess: () => void;
}

const OtpModal: React.FC<Props> = ({
  open,
  handleClose,
  email,
  userId,
  onSuccess
}) => {
  const { handleSubmit } = useForm();
  const { mutate, isPending } = useOtpMutation();

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputsRef.current[0]?.focus();
      }, 200);
    }
  }, [open]);

  
  const handleChange = (e: any, index: number) => {
    const value = e.target.value.replace(/\D/g, "").slice(-1);
    e.target.value = value;

    if (value && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  
  const handleKeyDown = (e: any, index: number) => {
    if (e.key === "Backspace" && !e.target.value) {
      inputsRef.current[index - 1]?.focus();
    }
  };

 
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    pasteData.split("").forEach((char, index) => {
      if (inputsRef.current[index]) {
        inputsRef.current[index]!.value = char;
      }
    });

    const nextIndex = pasteData.length < 6 ? pasteData.length : 5;
    inputsRef.current[nextIndex]?.focus();
  };

const onSubmit = () => {
  const otpValue = inputsRef.current
    .map((input) => input?.value || "")
    .join("");

  mutate(
    {
      userId,
      otp: otpValue,
    },
    {
      onSuccess: (res) => {
        if (res?.status) {
          onSuccess(); 
        }
      },
    }
  );
};

  return (
    <Dialog
      open={open}
      maxWidth="xs"
      fullWidth
      BackdropProps={{
        sx: {
          background: "rgba(10, 20, 40, 0.6)",
          backdropFilter: "blur(12px)",
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        
        <Box
          sx={{
            background: "linear-gradient(135deg, #1976d2, #42a5f5)",
            color: "#fff",
            textAlign: "center",
            py: 3,
            position: "relative",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 10,
              top: 10,
              color: "#fff",
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box
            sx={{
              width: 56,
              height: 56,
              mx: "auto",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1.5,
            }}
          >
            <LocalHospitalIcon />
          </Box>

          <Typography fontWeight={600}>OTP Verification</Typography>

          <Typography fontSize="13px" sx={{ opacity: 0.9 }}>
            Sent to {email}
          </Typography>
        </Box>

        {/* BODY */}
        <Box sx={{ px: 4, py: 3, textAlign: "center" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1.5,
                mb: 3,
              }}
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  maxLength={1}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  style={{
                    width: 45,
                    height: 50,
                    textAlign: "center",
                    fontSize: "18px",
                    borderRadius: "10px",
                    border: "1px solid #e0e0e0",
                    background: "#f9fbfd",
                    outline: "none",
                  }}
                />
              ))}
            </Box>

            <Button
  type="submit"
  fullWidth
  disabled={isPending}
  sx={{
    height: 46,
    borderRadius: "10px",
    textTransform: "none",
    fontWeight: 600,
    color: "#fff",
    background: "linear-gradient(90deg, #1976d2, #42a5f5)",
    boxShadow: "0 6px 20px rgba(25,118,210,0.35)",

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
    "Verify OTP"
  )}
</Button>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default OtpModal;
