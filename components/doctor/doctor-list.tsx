
"use client";

import {
  Box,
  Typography,
  TextField,
  Button,
  Pagination,
  Skeleton,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useEffect, useState } from "react";
import AppointmentModal from "./appointment-form";
import { useDoctorMutation } from "@/customhooks/query/doctor.query.hooks";

const DoctorListPage = () => {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [showAll, setShowAll] = useState(false);
  const [page, setPage] = useState(1);
  const doctorsPerPage = 6;

  const { mutate, data, isPending } = useDoctorMutation();

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // fetch
  useEffect(() => {
    mutate({
      department: selectedDepartments,
      search: debouncedSearch,
    });
  }, [selectedDepartments, debouncedSearch]);

  const departments = [
    "All",
    ...Array.from(
      new Set(
        (data?.data || [])
          .map((doc: any) => doc.department?.name)
          .filter(Boolean)
      )
    ),
  ];

  const filteredDoctors = (data?.data || []).filter((doc: any) => {
    const departmentMatch =
      selectedDepartments.length === 0 ||
      selectedDepartments.includes(doc.department?.name);

    const searchMatch =
      !debouncedSearch ||
      doc.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      doc.department?.name
        ?.toLowerCase()
        .includes(debouncedSearch.toLowerCase());

    return departmentMatch && searchMatch;
  });

  const handleDepartmentChange = (dept: string) => {
    if (dept === "All") {
      setSelectedDepartments([]);
    } else {
      setSelectedDepartments((prev) =>
        prev.includes(dept)
          ? prev.filter((d) => d !== dept)
          : [...prev, dept]
      );
    }
  };

  const startIndex = (page - 1) * doctorsPerPage;
  const paginatedDoctors = filteredDoctors.slice(
    startIndex,
    startIndex + doctorsPerPage
  );

  const totalPages = Math.ceil(
    filteredDoctors.length / doctorsPerPage
  );

  useEffect(() => {
    setPage(1);
  }, [selectedDepartments, debouncedSearch]);

return (
  <Box sx={{ py: 4 }}>
    {/* HEADER */}
    <Typography
      fontSize={{ xs: 26, md: 34 }}
      fontWeight={700}
      textAlign="center"
      mb={1}
      sx={{ color: "#0f172a" }}
    >
      Find Expert Doctors
    </Typography>

    <Typography
      textAlign="center"
      mb={4}
      sx={{ color: "#64748b", fontSize: "14px" }}
    >
      Connect with experienced specialists at MediCore Hospital
    </Typography>

    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "260px 1fr",
        },
        gap: 4,
      }}
    >
      {/* SIDEBAR */}
<Box
  sx={{
    p: 3,
    borderRadius: "16px",
    background: "#ffffff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",

    display: "flex",
    flexDirection: "column",

    height: "fit-content",   
    maxHeight: "80vh",       

    position: "sticky",
    top: 20,
  }}
>
        <Typography fontWeight={700} mb={2}>
          Filter by Department
        </Typography>

        {/* SCROLL AREA */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            pr: 1,

            
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Box display="flex" flexDirection="column" gap={0.5}>
            {(showAll ? departments : departments.slice(0, 8)).map((dept) => (
              <Box
                key={dept}
                onClick={() => handleDepartmentChange(dept)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 1.5,
                  py: 1,
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                  color:
                    selectedDepartments.includes(dept) ||
                    (dept === "All" &&
                      selectedDepartments.length === 0)
                      ? "#2563eb"
                      : "#334155",
                  background:
                    selectedDepartments.includes(dept) ||
                    (dept === "All" &&
                      selectedDepartments.length === 0)
                      ? "#eff6ff"
                      : "transparent",
                  "&:hover": {
                    background: "#f1f5f9",
                  },
                }}
              >
                <input
                  type="checkbox"
                  checked={
                    dept === "All"
                      ? selectedDepartments.length === 0
                      : selectedDepartments.includes(dept)
                  }
                  readOnly
                />
                {dept}
              </Box>
            ))}
          </Box>
        </Box>

        {/* VIEW ALL */}
        {departments.length > 8 && (
          <Button
            fullWidth
            onClick={() => setShowAll((prev) => !prev)}
            sx={{
              mt: 2,
              borderRadius: "10px",
              background: "#f1f5f9",
              color: "#0f172a",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            {showAll ? "Show Less" : "View All"}
          </Button>
        )}
      </Box>

      {/* RIGHT */}
      <Box>
        {/* SEARCH */}
<TextField
  fullWidth
  placeholder="Search doctors..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  sx={{
    mb: 4,
    background: "#fff",
    borderRadius: "999px", // outer

    "& .MuiOutlinedInput-root": {
      borderRadius: "999px", // ✅ makes it fully rounded
      height: 52,

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
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon sx={{ color: "#94a3b8" }} />
      </InputAdornment>
    ),
  }}
/>

        {/* EMPTY */}
        {!isPending && filteredDoctors.length === 0 && (
          <Box textAlign="center" py={10}>
            <Typography fontWeight={600}>
              No doctors found
            </Typography>
          </Box>
        )}

        {/* GRID */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              lg: "1fr 1fr 1fr",
            },
            gap: 3,
          }}
        >
          {isPending
            ? Array.from(new Array(6)).map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  height={220}
                  sx={{ borderRadius: 3 }}
                />
              ))
            : paginatedDoctors.map((doc: any) => {
                const initial = doc.name?.charAt(0)?.toUpperCase();

                return (
                  <Box
                    key={doc._id}
                    sx={{
                      p: 3,
                      borderRadius: "18px",
                      background: "#ffffff",
                      boxShadow:
                        "0 12px 30px rgba(0,0,0,0.08)",
                    }}
                  >
                    <Box display="flex" gap={2} mb={2}>
                      <Box
                        sx={{
                          width: 55,
                          height: 55,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg,#2563eb,#3b82f6)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontWeight: 700,
                        }}
                      >
                        {initial}
                      </Box>

                      <Box>
                        <Typography fontWeight={600}>
                          {doc.name}
                        </Typography>
                        <Typography fontSize={13} color="#64748b">
                          {doc.department?.name}
                        </Typography>
                        <Typography fontSize={12} color="#94a3b8">
                          MediCore Hospital
                        </Typography>
                      </Box>
                    </Box>

                    <Typography fontSize={13}>
                      <strong>Specialization:</strong>{" "}
                      {doc.specialization || doc.department?.name}
                    </Typography>

                    <Typography fontSize={13}>
                      <strong>Education:</strong>{" "}
                      {doc.education || "MBBS, MD"}
                    </Typography>

                    <Typography fontSize={13} mt={1}>
                      Fees: ₹{doc.fees}
                    </Typography>

                    <Button
                      fullWidth
                      sx={{
                        mt: 2,
                        borderRadius: "12px",
                        background:
                          "linear-gradient(135deg,#2563eb,#3b82f6)",
                        color: "#fff",
                        textTransform: "none",
                      }}
                      onClick={() => {
                        setSelectedDoctor(doc);
                        setOpenModal(true);
                      }}
                    >
                      Book Appointment
                    </Button>
                  </Box>
                );
              })}
        </Box>

        {/* PAGINATION */}
        <Box mt={4} display="flex" justifyContent="flex-end">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
            shape="rounded"
          />
        </Box>
      </Box>
    </Box>

    <AppointmentModal
      open={openModal}
      onClose={() => setOpenModal(false)}
      doctor={selectedDoctor}
    />
  </Box>
);
};

export default DoctorListPage;