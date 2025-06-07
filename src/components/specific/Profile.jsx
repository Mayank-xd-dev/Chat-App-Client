import React from "react";
import { Avatar, Stack, Typography, Box, Paper } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";
import { transformImage } from "../../lib/features";

const lightBlue = "#e3f2fd"; // soft light blue
const accentBlue = "#2196f3"; // material primary blue

const Profile = ({ user }) => {
  return (
    <Stack
      spacing={3}
      alignItems="center"
      justifyContent="center"
      sx={{
        padding: 4,
        maxWidth: 420,
        margin: "auto",
        background: `linear-gradient(to bottom right, ${lightBlue}, #ffffff)`,
        borderRadius: 4,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      <Avatar
        src={transformImage(user?.avatar?.url)}
        alt="Profile Avatar"
        sx={{
          width: 150,
          height: 150,
          border: `4px solid ${accentBlue}`,
          boxShadow: `0 4px 12px rgba(33, 150, 243, 0.2)`,
        }}
      />

      <Typography
        variant="h5"
        fontWeight={600}
        color={accentBlue}
        textAlign="center"
      >
        {user?.name || "No Name"}
      </Typography>

      <Box width="100%">
        <ProfileCard heading="Bio" text={user?.bio || "No bio provided"} />
        <ProfileCard
          heading="Username"
          text={user?.username || "N/A"}
          Icon={<UserNameIcon sx={{ color: accentBlue }} />}
        />
        <ProfileCard
          heading="Full Name"
          text={user?.name || "N/A"}
          Icon={<FaceIcon sx={{ color: "#42a5f5" }} />}
        />
        <ProfileCard
          heading="Joined"
          text={moment(user?.createdAt).fromNow()}
          Icon={<CalendarIcon sx={{ color: "#64b5f6" }} />}
        />
      </Box>
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Paper
    elevation={2}
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 2,
      padding: 2,
      mb: 2,
      borderRadius: 2,
      backgroundColor: "#ffffff",
      border: `1px solid #bbdefb`,
      transition: "0.3s ease",
      "&:hover": {
        backgroundColor: "#f1faff",
      },
    }}
  >
    {Icon && <Box>{Icon}</Box>}
    <Box>
      <Typography fontWeight={500} variant="body1" color="text.primary">
        {text}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {heading}
      </Typography>
    </Box>
  </Paper>
);

export default Profile;
