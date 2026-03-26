
"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Alert,
  Stack,
  Chip,
  Divider,
  Pagination,
  Skeleton,
  Paper,
} from "@mui/material";
import useUserHistory from "@/customhooks/query/auth.query.hooks";
import PageLoader from "@/components/common/page-loader";


const ITEMS_PER_PAGE = 6;

export default function HistoryPage() {
  const { data, isLoading, isError, error } = useUserHistory();

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");

  const payload = data?.data ?? data;
  const history = Array.isArray(payload) ? payload : payload?.data ?? [];

const filteredData = history.filter((item: any) => {
  const st = (item.status || "").toLowerCase().trim();

  if (filter === "upcoming") {
    return ["pending"].some(s => st.includes(s));
  }

  if (filter === "completed") {
    return ["confirmed"].some(s => st.includes(s));
  }

  if (filter === "cancelled") {
    return ["cancelled"].some(s => st.includes(s));
  }

  return true;
});
console.log("FULL HISTORY =>", history);
console.log("STATUS VALUES =>", history.map((i: any) => i.status));

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (isLoading) {
    return (
      <Box sx={root}>
        <Stack spacing={2}>
          {Array.from(new Array(6)).map((_, i) => (
            <Skeleton key={i} height={80} />
          ))}
        </Stack>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={root}>
        <Alert severity="error">
          {(error as any)?.message || "Failed to load history."}
        </Alert>
      </Box>
    );
  }

  const getCount = (type: string) => {
    return history.filter((item: any) => {
      const st = (item.status || "").toLowerCase();

      if (type === "upcoming")
        return st.includes("pending") ;

      if (type === "completed")
        return st.includes("complete") ;

      if (type === "cancelled")
        return st.includes("reject") ;

      return true;
    }).length;
  };

  const filters = [
    { label: "All", value: "all" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" },
  ];

  return (
    <>
      {isLoading && <PageLoader message="Loading appointments..." />}

      <Box
        sx={{
          pt: "110px",
          pb: 8,
          minHeight: "calc(100vh - 140px)",
          background: "#f4f7fb",
        }}
      >
        {/* MAIN WRAPPER */}
        <Box
          sx={{
            maxWidth: "1400px",
            mx: "auto",
            px: { xs: 2, md: 3 },
          }}
        >
          {/* HEADER */}
          <Box textAlign="center" mb={5}>
            <Typography
              sx={{
                ...title,
                color: "#1e3a8a",
              }}
            >
              Appointment History
            </Typography>

            <Typography
              sx={{
                ...subtitle,
                color: "#94a3b8",
                maxWidth: "600px",
                textAlign: "center",
                mx: "auto"

              }}
            >
              View and manage all your past and upcoming appointments in one place.
              Stay informed with detailed records including doctor information,
              visit dates, and treatment summaries. Easily keep track of your healthcare
              journey with organized and accessible data.
            </Typography>
          </Box>

          {/* CARD WRAPPER */}
          <Box
            sx={{
              background: "#ffffff",
              borderRadius: "18px",
              p: { xs: 2, md: 3 },
              boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
              border: "1px solid #e5eaf0",
            }}
          >
            {/* FILTER */}
            <Box
              sx={{
                ...filterWrapper,
                justifyContent: "center",
                flexWrap: "wrap",
                mb: 3,
              }}
            >
              {filters.map((item) => {
                const active = filter === item.value;

                return (
                  <Box
                    key={item.value}
                    onClick={() => {
                      setFilter(item.value);
                      setPage(1);
                    }}
                    sx={{
                      ...filterItem,
                      px: 3,
                      py: 1.2,
                      fontSize: 13,
                      fontWeight: 500,
                      color: active ? "#2563eb" : "#64748b",
                      background: active ? "#e8f1ff" : "#f1f5f9",
                      border: active
                        ? "1px solid #bfdbfe"
                        : "1px solid #e2e8f0",
                    }}
                  >
                    {item.label} ({getCount(item.value)})
                  </Box>
                );
              })}
            </Box>

            {/* LIST */}
            <Stack spacing={2.5}>
              {paginatedData.map((item: any) => {
                const doctor = item?.doctorId || {};
                const st = (item.status || "").toLowerCase().trim();


                let statusColor = "#f59e0b"; // pending
                let bgColor = "#fff7ed";

                if (st.includes("complete") || st.includes("confirm")) {
                  statusColor = "#16a34a";
                  bgColor = "#ecfdf5";
                } else if (st.includes("cancel") || st.includes("reject")) {
                  statusColor = "#dc2626";
                  bgColor = "#fef2f2";
                }


                const formattedDate = new Date(item.date).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                );

                return (
                  <Paper
                    key={item._id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 3,
                      py: 2.5,
                      borderRadius: "14px",
                      border: "1px solid #e2e8f0",
                      background: "#ffffff",
                      transition: "0.25s",
                      position: "relative",

                      "&:hover": {
                        borderColor: "#2563eb",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    {/* LEFT */}
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: 16,
                          color: "#0f172a",
                          mb: 0.6,
                        }}
                      >
                        {doctor.name || "Unknown Doctor"}
                      </Typography>

                      {/* DATE */}
                      <Box display="flex" gap={2}>
                        <Typography
                          sx={{
                            fontSize: 13,
                            color: "#64748b",
                            fontWeight: 500,
                          }}
                        >
                          📅 {formattedDate}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#2563eb",
                          }}
                        >
                          ⏰ {item.time}
                        </Typography>
                      </Box>
                    </Box>

                    {/* RIGHT */}
                    <Box display="flex" alignItems="center" gap={3}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 15,
                          color: "#0d6e8a",
                        }}
                      >
                        ₹{doctor.fees ?? "-"}
                      </Typography>

                      <Box
                        sx={{
                          px: 2,
                          py: 0.6,
                          borderRadius: "999px",
                          fontSize: 12,
                          fontWeight: 600,
                          color: statusColor,
                          background: bgColor,
                        }}
                      >
                        {item.status}
                      </Box>
                    </Box>
                  </Paper>
                );
              })}
            </Stack>

            {/* EMPTY */}
            {filteredData.length === 0 && (
              <Box textAlign="center" py={7}>
                <Typography fontWeight={600} mb={1}>
                  No appointments found
                </Typography>
                <Typography fontSize={13} color="#64748b">
                  You don’t have any appointments in this category.
                </Typography>
              </Box>
            )}

            {/* PAGINATION */}
            {filteredData.length > ITEMS_PER_PAGE && (
              <Stack alignItems="center" mt={5}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                />
              </Stack>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}



const root = {
  width: "100%",
  px: { xs: 2, md: 6 },
  mt: 10,
};

const title = {
  fontSize: 30,
  fontWeight: 700,
  color: "#0f172a",
};

const subtitle = {
  color: "#64748b",
  fontSize: 14,
  mt: 1,
};

const filterWrapper = {
  display: "flex",
  gap: 2,
  mb: 4,
};

const filterItem = {
  px: 3,
  py: 1,
  borderRadius: "999px",
  fontSize: 14,
  cursor: "pointer",
  fontWeight: 500,
  transition: "0.2s",
};

const card = {
  p: 3,
  borderRadius: 3,
  border: "1px solid #e2e8f0",
  background: "#ffffff",
  transition: "0.25s",
  "&:hover": {
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  },
};

const rowTop = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const rowBottom = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const doctorName = {
  fontWeight: 600,
  fontSize: 16,
  color: "#0f172a",
};

const dateText = {
  fontSize: 13,
  color: "#64748b",
  mt: 0.5,
};

const fees = {
  fontWeight: 600,
  color: "#0d6e8a",
};

const address = {
  fontSize: 13,
  color: "#64748b",
};

const chipPending = {
  bgcolor: "#fff7ed",
  color: "#ea580c",
  fontWeight: 500,
};

const chipSuccess = {
  bgcolor: "#ecfdf5",
  color: "#16a34a",
};

const chipError = {
  bgcolor: "#fef2f2",
  color: "#dc2626",
};

const empty = {
  textAlign: "center",
  py: 6,
};