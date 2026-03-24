"use client";

import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
// import { useBookAppointmentMutation, useDoctorSlotsQuery } from "@/customHooks/query/doctor.query.hooks";
import { toast } from "sonner";
import { useBookAppointmentMutation, useDoctorSlotsQuery } from "@/customhooks/query/doctor.query.hooks";


interface Props {
  open: boolean;
  onClose: () => void;
  doctor: any;
}

const AppointmentModal = ({ open, onClose, doctor }: Props) => {
  const [date, setDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  // Fetch slots using the correct query hook
  const { data: slotData, isLoading } = useDoctorSlotsQuery(
    doctor?._id || "",
    date
  );

 const slots = Array.from(
  new Map(
    (slotData?.data || [])
      .map((slot: any) => (slot.time || slot).toLowerCase())
      .filter((time: string) => time.includes("am"))
      .map((time: string) => {
        const formatted = time
          .replace(/am/i, "AM")
          .replace(/pm/i, "PM");
        return [formatted, formatted];
      })
  ).values()
);

  //  Book mutation
  const { mutate: bookAppointment, isPending } =
    useBookAppointmentMutation();

  //  Auto set today's date when modal opens
  useEffect(() => {
    if (open) {
      const today = new Date().toISOString().split("T")[0];
      setDate(today);
      setSelectedSlot("");
    }
  }, [open]);

  //  Book handler
const handleBook = () => {
  if (!date || !selectedSlot) {
    alert("Please select date & slot");
    return;
  }

  // Get user data from localStorage
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName") || localStorage.getItem("email");

  if (!userId || !userName) {
    alert("User not logged in");
    return;
  }

  bookAppointment(
    {
      userId,
      name: userName,
      doctorId: doctor._id,
      date,
      time: selectedSlot,
    },
    {
      onSuccess: (response) => {
        if (response?.status) {
          toast.success("Appointment booked successfully ");
          onClose();
        } else {
          toast.error(response?.message || "Booking failed ");
        }
      },
      onError: (error) => {
        console.error("Booking error:", error);
        toast.error("Booking failed ");
      },
    }
  );
};
return (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth="md"
    fullWidth
    PaperProps={{
      sx: {
        borderRadius: "28px",
        overflow: "hidden",
        boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
      },
    }}
    BackdropProps={{
      sx: {
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(15,23,42,0.35)",
      },
    }}
  >
    <DialogContent
      sx={{
        p: 0,
        display: "flex",
        background: "linear-gradient(145deg,#ffffff,#f8fafc)",
      }}
    >
      <Box display="flex" width="100%">
        
        {/* LEFT SIDE */}
        <Box
          sx={{
            width: "45%",
            p: 4,
            background: "linear-gradient(180deg,#f8fafc,#eef2f7)",
            borderRight: "1px solid rgba(148,163,184,0.2)",
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 20,
              background:
                "linear-gradient(135deg,#2563eb,#3b82f6)",
              color: "#fff",
              mb: 2,
              boxShadow: "0 10px 25px rgba(37,99,235,0.3)",
            }}
          >
            {doctor?.name?.charAt(0)}
          </Box>

          <Typography fontWeight={700} fontSize={18} color="#0f172a">
            {doctor?.name}
          </Typography>

          <Typography fontSize={13} color="#64748b" mb={2}>
            {doctor?.department?.name}
          </Typography>

          <Box
            sx={{
              mt: 2,
              p: 2,
              borderRadius: "14px",
              background: "#ffffff",
              boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
            }}
          >
            <Typography fontSize={13} color="#475569" mb={1}>
              • MediCore Hospital
            </Typography>

            <Typography fontSize={13} color="#475569" mb={1}>
              • Specialization: {doctor?.department?.name}
            </Typography>

            <Typography fontSize={13} color="#475569">
              • Fees: ₹{doctor?.fees}
            </Typography>
          </Box>
        </Box>

        {/* RIGHT SIDE */}
        <Box
          sx={{
            width: "55%",
            p: 4,
            position: "relative",
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            fontWeight={700}
            fontSize={20}
            mb={3}
            color="#0f172a"
          >
            Book Appointment
          </Typography>

          {/* PATIENT NAME */}
          <Box mb={2}>
            <Typography fontSize={12} mb={0.5} color="#475569">
              Patient Name
            </Typography>

            <TextField
              fullWidth
              placeholder="Enter patient name"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  background: "#f8fafc",
                  transition: "0.3s",
                  "&:hover": {
                    background: "#f1f5f9",
                  },
                  "&.Mui-focused": {
                    background: "#ffffff",
                    boxShadow: "0 0 0 2px rgba(37,99,235,0.15)",
                  },
                },
              }}
            />
          </Box>

          {/* DATE */}
          <Box mb={2}>
            <Typography fontSize={12} mb={0.5} color="#475569">
              Date
            </Typography>

            <TextField
  fullWidth
  type="date"
  value={date}
  onChange={(e) => {
    setDate(e.target.value);
    setSelectedSlot("");
  }}
  inputProps={{
    min: new Date().toISOString().split("T")[0], 
    max: new Date(
      new Date().setDate(new Date().getDate() + 7)
    )
      .toISOString()
      .split("T")[0], 
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      background: "#f8fafc",
      transition: "0.3s",
      "&:hover": {
        background: "#f1f5f9",
      },
      "&.Mui-focused": {
        background: "#ffffff",
        boxShadow: "0 0 0 2px rgba(37,99,235,0.15)",
      },
    },
  }}
/>
          </Box>

          {/* SLOT */}
          <Box mb={3}>
            <Typography fontSize={12} mb={1} color="#475569">
              Select Slot
            </Typography>

            {isLoading ? (
              <CircularProgress size={24} />
            ) : slots.length === 0 ? (
              <Typography fontSize={13} color="#94a3b8">
                No slots available
              </Typography>
            ) : (
              <Box display="flex" flexWrap="wrap" gap={1}>
                {slots.map((slot: any) => (
                  <Button
                    key={slot.time || slot}
                    onClick={() => setSelectedSlot(slot.time || slot)}
                    sx={{
                      px: 2,
                      py: 0.8,
                      borderRadius: "10px",
                      background:
                        selectedSlot === (slot.time || slot)
                          ? "linear-gradient(135deg,#2563eb,#3b82f6)"
                          : "#f1f5f9",
                      color:
                        selectedSlot === (slot.time || slot)
                          ? "#fff"
                          : "#334155",
                      textTransform: "none",
                      fontSize: "13px",
                      transition: "0.2s",
                      "&:hover": {
                        background:
                          selectedSlot === (slot.time || slot)
                            ? "linear-gradient(135deg,#1d4ed8,#2563eb)"
                            : "#e2e8f0",
                      },
                    }}
                  >
                    {slot.time || slot}
                  </Button>
                ))}
              </Box>
            )}
          </Box>

          {/* BUTTON */}
          <Button
            fullWidth
            onClick={handleBook}
            disabled={!selectedSlot || isPending}
            sx={{
              height: 46,
              borderRadius: "12px",
              background:
                "linear-gradient(135deg,#2563eb,#3b82f6)",
              color: "#ffffff",
              fontWeight: 600,
              textTransform: "none",

              "&:hover": {
                background:
                  "linear-gradient(135deg,#1d4ed8,#2563eb)",
              },

              "&.Mui-disabled": {
                color: "#e5e7eb",
                background: "#93c5fd",
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
              <Box display="flex" gap={0.6} alignItems="center">
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
              "Confirm Appointment"
            )}
          </Button>
        </Box>
      </Box>
    </DialogContent>
  </Dialog>
);
};

export default AppointmentModal;