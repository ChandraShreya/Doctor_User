"use client"

import HistoryPage from '@/components/auth/patientHistory-list'
import { Box } from '@mui/material'
import React from 'react'

export default function AppointmentHistory() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom,#f8fafc,#eef2ff)",
      }}
    >
      <HistoryPage/>
    </Box>
  )
}