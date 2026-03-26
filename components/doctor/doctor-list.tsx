
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
import DoctorDetailsModal from "./doctor-details-modal";
import { useDoctorMutation } from "@/customhooks/query/doctor.query.hooks";

const DoctorListPage = () => {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [showAll, setShowAll] = useState(false);
  const [page, setPage] = useState(1);
  const doctorsPerPage = 6;

  const { mutate, data, isPending } = useDoctorMutation();


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
    <Box sx={{ py: 6, mt: "15px" }}>
      {/* HEADER */}
      <Typography
        fontSize={{ xs: 26, md: 34 }}
        fontWeight={700}
        textAlign="center"
        mb={1}
        sx={{ color: "#163c95" }}
      >
        Meet Our Specialists
      </Typography>

      <Typography
        textAlign="center"
        mx="auto"
        mb={4}
        maxWidth="700px"
        sx={{ color: "#7b94b8", fontSize: "14px", lineHeight: 1.6 }}
      >
        Our platform brings together top medical professionals dedicated to providing exceptional care.
        With detailed profiles and seamless booking, finding the right doctor has never been easier.
        Experience healthcare designed around you.
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

            height: "81%",
            minHeight: "600px",

            display: "flex",
            flexDirection: "column",

            position: "sticky",
            top: 20,
          }}
        >
          <Typography fontWeight={700} mb={2}>
            Filter by Department
          </Typography>


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
              {departments.map((dept) => (
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
                        (dept === "All" && selectedDepartments.length === 0)
                        ? "#2563eb"
                        : "#334155",
                    background:
                      selectedDepartments.includes(dept) ||
                        (dept === "All" && selectedDepartments.length === 0)
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
        </Box>

        {/* RIGHT SIDE */}
        <Box>

          <TextField
            fullWidth
            placeholder="Search doctors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              mb: 4,
              background: "#fff",
              borderRadius: "999px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "999px",
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

          {/* DOCTOR GRID */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                lg: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {isPending
              ? Array.from(new Array(6)).map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  height={260}
                  sx={{ borderRadius: 3 }}
                />
              ))
              : paginatedDoctors.map((doc: any, index: number) => {
                const image = `images/doctor${(index % 4) + 1}.jpg`;

                return (
                  <Box
                    key={doc._id}
                    sx={{
                      position: "relative",
                      borderRadius: "16px",
                      overflow: "hidden",
                      background: "#fff",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                      transition: "0.25s",
                      cursor: "pointer",

                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 14px 28px rgba(0,0,0,0.12)",
                      },
                      "&:hover .overlay": {
                        opacity: 1,
                      },

                      "&:hover img": {
                        transform: "scale(1.05)",
                      },

                    }}
                  >
                    {/* IMAGE */}
                    <Box
                      component="img"
                      src={image}
                      alt={doc.name}
                      sx={{
                        width: "100%",
                        height: 220,
                        objectFit: "cover",
                        display: "block",
                      }}
                    />

                    {/* CONTENT */}
                    <Box
                      className="overlay"
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: 1,
                        pb: 3,
                        opacity: 0,
                        transform: "translateY(20px)",
                        transition: "0.3s",
                        zIndex: 2,
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          borderRadius: "20px",
                          px: 3,
                          background:
                            "linear-gradient(135deg,#2563eb,#3b82f6)",
                          textTransform: "none",
                        }}
                        onClick={() => {
                          setSelectedDoctor(doc);
                          setOpenModal(true);
                        }}
                      >
                        Book Appointment
                      </Button>

                      <Button
                        variant="outlined"
                        sx={{
                          borderRadius: "20px",
                          px: 3,
                          color: "#fff",
                          borderColor: "#fff",
                          textTransform: "none",
                        }}
                        onClick={() => {
                          setSelectedDoctor(doc);
                          setOpenDetailsModal(true);
                        }}
                      >
                        View Details
                      </Button>
                    </Box>

                    {/* TEXT */}
                    <Box sx={{ p: 2, textAlign: "center" }}>
                      <Typography fontWeight={700}>
                        {doc.name}
                      </Typography>

                      <Typography fontSize={13} color="#64748b">
                        {doc.department?.name}
                      </Typography>
                    </Box>
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

      {/* MODALS */}
      <AppointmentModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        doctor={selectedDoctor}
      />
      <DoctorDetailsModal
        open={openDetailsModal}
        onClose={() => setOpenDetailsModal(false)}
        onBookAppointment={() => {
          setOpenDetailsModal(false);
          setOpenModal(true);
        }}
        doctor={selectedDoctor}
      />
    </Box>
  );

};

export default DoctorListPage;