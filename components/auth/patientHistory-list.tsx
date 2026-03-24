
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


const ITEMS_PER_PAGE = 6;

export default function HistoryPage() {
  const { data, isLoading, isError, error } = useUserHistory();

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");

  const payload = data?.data ?? data;
  const history = Array.isArray(payload) ? payload : payload?.data ?? [];

  const filteredData = history.filter((item: any) => {
    const st = (item.status || "").toLowerCase();

    if (filter === "upcoming")
      return st.includes("pending") || st.includes("confirm") || st.includes("accept");

    if (filter === "completed")
      return st.includes("complete") || st.includes("done");

    if (filter === "cancelled")
      return st.includes("reject") || st.includes("cancel") || st.includes("declin");

    return true;
  });

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
        return st.includes("pending") || st.includes("confirm") || st.includes("accept");

      if (type === "completed")
        return st.includes("complete") || st.includes("done");

      if (type === "cancelled")
        return st.includes("reject") || st.includes("cancel") || st.includes("declin");

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
    <Box sx={root}>
      {/* HEADER */}
      <Box sx={{ mb: 5 }}>
        <Typography sx={title}>Appointment History</Typography>
        <Typography sx={subtitle}>
          View and manage your consultations
        </Typography>
      </Box>

      {/* FILTER BAR (FIXED) */}
      <Box sx={filterWrapper}>
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
  color: active ? "#0d6e8a" : "#64748b",
  background: active ? "#e0f2fe" : "transparent", 
  border: active ? "1px solid #bae6fd" : "1px solid transparent",
}}
            >
              {item.label} ({getCount(item.value)})
            </Box>
          );
        })}
      </Box>

      {/* LIST */}
      <Stack spacing={2}>
        {paginatedData.map((item: any) => {
          const doctor = item?.doctorId || {};
          const st = (item.status || "").toLowerCase().trim();

          let chipStyle: any = chipPending;
          if (st.includes("complete")) chipStyle = chipSuccess;
          else if (st.includes("cancel") || st.includes("reject"))
            chipStyle = chipError;

          return (
            <Paper key={item._id} sx={card}>
              <Box sx={rowTop}>
                <Box>
                  <Typography sx={doctorName}>
                    {doctor.name || "Unknown Doctor"}
                  </Typography>

                  <Typography sx={dateText}>
                    {item.date} • {item.time}
                  </Typography>
                </Box>

                <Chip label={item.status} sx={chipStyle} />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={rowBottom}>
                <Typography sx={fees}>
                  ₹{doctor.fees ?? "-"}
                </Typography>

                {/* <Typography sx={address}>
                  📍 {item?.address || "No address"}
                </Typography> */}
              </Box>
            </Paper>
          );
        })}
      </Stack>

      {/* EMPTY */}
      {filteredData.length === 0 && (
        <Box sx={empty}>
          <Typography>No appointments found</Typography>
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