"use client";

import {
  Dialog,
  DialogContent,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import { useForm } from "react-hook-form";
import { useResetLinkMutation } from "@/customhooks/query/auth.query.hooks";


interface Props {
  open: boolean;
  handleClose: () => void;
}

const ResetPasswordModal: React.FC<Props> = ({ open, handleClose }) => {
  const { register, handleSubmit } = useForm();
  const { mutate, isPending } = useResetLinkMutation();

  const onSubmit = (data: any) => {
    mutate(
      { email: data.email },
      {
        onSuccess: () => {
          handleClose();
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      BackdropProps={{
        sx: {
          background: "rgba(10, 20, 40, 0.6)",
          backdropFilter: "blur(14px)",
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: "20px",
          overflow: "hidden",
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
              width: 50,
              height: 50,
              mx: "auto",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1,
            }}
          >
            <EmailIcon />
          </Box>

          <Typography fontSize="20px" fontWeight={600}>
            Reset Password
          </Typography>

          <Typography fontSize="13px" sx={{ opacity: 0.9 }}>
            Enter your email to receive reset link
          </Typography>
        </Box>

        {/* BODY */}
        <Box sx={{ px: 3, py: 3 }}>
          <form onSubmit={handleSubmit(onSubmit)}>

            <TextField
              {...register("email")}
              placeholder="Enter your email"
              fullWidth
              variant="outlined"
              size="small"
              sx={{
                mb: 3,
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

            <Button
              type="submit"
              fullWidth
              disabled={isPending}
              sx={{
                height: 45,
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
                background: "linear-gradient(90deg, #1976d2, #42a5f5)",
                boxShadow: "0 6px 20px rgba(25,118,210,0.4)",
                color: "#fff",
              }}
            >
              {isPending ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

                  <Box sx={{ display: "flex", gap: "4px" }}>
                    {[0, 1, 2].map((i) => (
                      <Box
                        key={i}
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          backgroundColor: "#fff",
                          animation: "wave 1.2s infinite ease-in-out",
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              ) : (
                "Send Reset Link"
              )}


              <style jsx>{`
    @keyframes wave {
      0%, 60%, 100% {
        transform: translateY(0);
        opacity: 0.6;
      }
      30% {
        transform: translateY(-6px);
        opacity: 1;
      }
    }
  `}</style>
            </Button>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordModal;