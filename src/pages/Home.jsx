import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/system";

// Pulse animation for the SVG
const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.85;
  }
  50% {
    transform: scale(1.15);
    opacity: 1;
  }
`;

const Home = () => {
  return (
    <Box
      bgcolor="grayColor"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={3}
      px={2}
      color="rgba(7, 52, 255, 0.97)" // white text & icon color
    >
      <Box
        component="svg"
        xmlns="http://www.w3.org/2000/svg"
        width={80}
        height={80}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        sx={{
          animation: `${pulse} 2s ease-in-out infinite`,
          userSelect: "none",
        }}
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </Box>
      <Typography
        variant="h5"
        textAlign="center"
        sx={{
          fontWeight: 700,
          letterSpacing: "0.05em",
          userSelect: "none",
          textShadow: "0 0 6px rgba(255, 255, 255, 0.7)",
        }}
      >
        Select a friend to chat
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);
