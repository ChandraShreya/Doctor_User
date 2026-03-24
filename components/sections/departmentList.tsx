

"use client";

import { useMemo, useState } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
// import { useDoctorsQuery } from "@/customHooks/query/doctor.query.hooks";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { useDoctorsQuery } from "@/customhooks/query/doctor.query.hooks";

export default function DepartmentSection() {
  const [showAll, setShowAll] = useState(false);
  const { data } = useDoctorsQuery();

  const departments = useMemo(() => {
    if (!data?.data) return [];

    const deptMap = new Map();

    data.data.forEach((doc: any) => {
      if (doc.department && doc.department._id) {
        deptMap.set(doc.department._id, doc.department);
      }
    });

    return Array.from(deptMap.values());
  }, [data]);

  const visibleDepartments = showAll
    ? departments
    : departments.slice(0, 6);

  return (
    <Box
      sx={{
        py: 12,
        background: "#f8fafc",
      }}
    >
      <Container
        disableGutters
        sx={{
          maxWidth: "1400px !important",
          mx: "auto",
          px: 2,
        }}
      >
        
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: "#0f172a",
              mb: 2,
            }}
          >
            Comprehensive Super Specialty Departments Under One Roof
          </Typography>

          
          <Box
            sx={{
              width: 60,
              height: 4,
              background: "#3b82f6",
              mx: "auto",
              borderRadius: 10,
              mb: 3,
            }}
          />

          <Typography
            sx={{
              maxWidth: 900,
              mx: "auto",
              color: "#64748b",
              lineHeight: 1.7,
              fontSize: "15px",
            }}
          >
            Medicore Hospital provides comprehensive multi super specialty
            healthcare services supported by experienced consultants, skilled
            clinical teams, and evidence-based treatment protocols. Each
            department is equipped with advanced medical systems to ensure
            accurate diagnosis, effective treatment, and faster recovery.
          </Typography>
        </Box>


        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mb: 5,
          }}
        >


          <Button
            onClick={() => setShowAll((prev) => !prev)}
            sx={{
              textTransform: "none",
              color: "#2563eb",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 1,

              "&:hover": {
                color: "#1d4ed8",
                background: "transparent",
              },
            }}
          >
            {showAll ? (
              <>
                <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
                Show Less
              </>
            ) : (
              <>
                Show All
                <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
              </>
            )}
          </Button>
        </Box>


        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 5,
          }}
        >
          {visibleDepartments.map((dept, index) => (
            <Box
  key={index}
  sx={{
    p: 5,
    borderRadius: "18px",

    
    background: "#f8fbff",

    border: "1px solid rgba(37,99,235,0.08)",

    boxShadow: "0 8px 25px rgba(0,0,0,0.04)",

    textAlign: "center",

    transition: "all 0.3s ease",

    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0 16px 40px rgba(37,99,235,0.12)",
      background: "#f1f7ff",
    },
  }}
>
 
  <Box
  sx={{
    width: 70,   
    height: 45,        
    borderRadius: "40px",
    mx: "auto",
    mb: 2.5,            

    background: "linear-gradient(135deg, #0ea5e9, #2563eb)",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    boxShadow: "0 6px 18px rgba(37,99,235,0.25)", 

    fontSize: 22,       
    color: "#fff",
  }}
>
  <MedicalServicesIcon sx={{ fontSize: 22 }} />
</Box>

  <Typography
    variant="h6"
    sx={{
      fontWeight: 600,
      color: "#0f172a",
      mb: 1,
    }}
  >
    {dept.name}
  </Typography>

  <Typography
    variant="body2"
    sx={{
      color: "#64748b",
      fontSize: "14px",
      lineHeight: 1.7,
    }}
  >
    Advanced diagnosis and expert medical care in this department.
  </Typography>
</Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}