"use client";

import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SchoolIcon from "@mui/icons-material/School";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import StarIcon from "@mui/icons-material/Star";

interface Props {
  open: boolean;
  onClose: () => void;
  onBookAppointment: () => void;
  doctor: any;
}

const DoctorDetailsModal = ({ open, onClose, onBookAppointment, doctor }: Props) => {
  if (!doctor) return null;

  const image = `images/doctor${(Math.floor(Math.random() * 4) + 1)}.jpg`;

  // Static fallback data
  const staticHospitals = [
    { name: "Apollo Hospitals" },
    { name: "Fortis Healthcare" },
    { name: "Max Healthcare" },
  ];

  const staticEducations = [
    "MBBS - Medical Institute",
    "MD - Specialty Medicine",
    "Fellowship - Advanced Specialty",
  ];

  const staticSpecializations = [
    "General Medicine",
    "Cardiology",
    "Orthopedics",
    "Neurology",
  ];

  // Destructure backend data
  const { _id, name, department, fees, specialization, education, hospital, hospitals, experience, rating, bio, schedule } = doctor;

  // Use backend data if available, otherwise use static data
  const hospitalsList = hospitals || hospital || staticHospitals;
  const educationsList = education || staticEducations;
  const specializationText = specialization || "General Practice";
  const yearsExperience = experience || 10;
  const doctorRating = rating || 4.5;
  const consultationFee = fees; // Note: Backend returns 'fees' not 'fee'

  return (
    <>
        <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* HEADER WITH CLOSE */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Doctor Profile
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: "#64748b",
            "&:hover": { background: "#f1f5f9" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* CONTENT */}
      <DialogContent sx={{ p: 3 }}>
        {/* DOCTOR IMAGE & BASIC INFO */}
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Box
            component="img"
            src={image}
            alt={doctor.name}
            sx={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              objectFit: "cover",
              mb: 1,
              border: "3px solid #e2e8f0",
            }}
          />
          <Typography variant="h5" fontWeight={700} sx={{ color: "#163c95" }}>
            {doctor.name || "N/A"}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 1, flexWrap: "wrap" }}>
            <Chip
              label={doctor.department?.name || "N/A"}
              size="small"
              sx={{
                background: "#eff6ff",
                color: "#2563eb",
                fontWeight: 600,
              }}
            />
            <Chip
              label={specializationText}
              size="small"
              sx={{
                background: "#fef3c7",
                color: "#d97706",
                fontWeight: 600,
              }}
            />
          </Box>
          {doctorRating && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 0.5,
                mt: 1,
              }}
            >
              <StarIcon sx={{ color: "#f59e0b", fontSize: 18 }} />
              <Typography fontSize={14} fontWeight={600}>
                {doctorRating}/5
              </Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* EXPERIENCE */}
        <Box sx={{ mb: 2.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <MedicalServicesIcon sx={{ color: "#2563eb", fontSize: 22 }} />
            <Typography fontWeight={700} fontSize={14}>
              Experience
            </Typography>
          </Box>
          <Typography fontSize={16} fontWeight={700} color="#2563eb" sx={{ ml: 4 }}>
            {yearsExperience}+ Years
          </Typography>
        </Box>

        {/* SPECIALIZATION */}
        <Box sx={{ mb: 2.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <MedicalServicesIcon sx={{ color: "#2563eb", fontSize: 22 }} />
            <Typography fontWeight={700} fontSize={14}>
              Specialization
            </Typography>
          </Box>
          <Typography fontSize={14} color="#64748b" sx={{ ml: 4, mb: 1 }}>
            {specializationText}
          </Typography>
        </Box>

        {/* EDUCATION */}
        <Box sx={{ mb: 2.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <SchoolIcon sx={{ color: "#2563eb", fontSize: 22 }} />
            <Typography fontWeight={700} fontSize={14}>
              Education & Qualifications
            </Typography>
          </Box>
          <Box sx={{ ml: 4 }}>
            {Array.isArray(educationsList) ? (
              educationsList.map((edu: any, index: number) => (
                <Typography key={index} fontSize={14} color="#64748b" sx={{ mb: 0.5 }}>
                  • {typeof edu === "string" ? edu : edu.degree || "N/A"}
                </Typography>
              ))
            ) : (
              <Typography fontSize={14} color="#64748b">
                • {educationsList}
              </Typography>
            )}
          </Box>
        </Box>

        {/* HOSPITALS / CLINICS */}
        <Box sx={{ mb: 2.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <LocalHospitalIcon sx={{ color: "#2563eb", fontSize: 22 }} />
            <Typography fontWeight={700} fontSize={14}>
              Hospitals / Clinics
            </Typography>
          </Box>
          <Box sx={{ ml: 4 }}>
            {Array.isArray(hospitalsList) ? (
              hospitalsList.map((h: any, index: number) => (
                <Typography key={index} fontSize={14} color="#64748b" sx={{ mb: 0.5 }}>
                  • {typeof h === "string" ? h : h.name || "N/A"}
                </Typography>
              ))
            ) : (
              <Typography fontSize={14} color="#64748b">
                • {hospitalsList}
              </Typography>
            )}
          </Box>
        </Box>

        {/* CONSULTATION FEES */}
        {consultationFee && (
          <Box sx={{ mb: 2.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <AttachMoneyIcon sx={{ color: "#2563eb", fontSize: 22 }} />
              <Typography fontWeight={700} fontSize={14}>
                Consultation Fee
              </Typography>
            </Box>
            <Typography
              fontSize={18}
              fontWeight={700}
              color="#16a34a"
              sx={{ ml: 4 }}
            >
              ₹{consultationFee}
            </Typography>
          </Box>
        )}

        {/* BIO / EXPERIENCE */}
        {doctor.bio && (
          <Box sx={{ mb: 2.5 }}>
            <Typography fontWeight={700} fontSize={14} mb={1}>
              About
            </Typography>
            <Typography fontSize={14} color="#64748b" sx={{ lineHeight: 1.6 }}>
              {doctor.bio}
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        {/* ACTIONS */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              background: "linear-gradient(135deg,#2563eb,#3b82f6)",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "8px",
              py: 1.2,
            }}
            onClick={onBookAppointment}
          >
            Book Appointment
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              borderColor: "#e2e8f0",
              color: "#64748b",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "8px",
              py: 1.2,
              "&:hover": {
                borderColor: "#94a3b8",
                background: "#f8fafc",
              },
            }}
            onClick={onClose}
          >
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
    </>

  );
};

export default DoctorDetailsModal;
