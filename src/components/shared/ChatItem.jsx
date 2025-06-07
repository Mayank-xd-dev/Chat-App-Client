import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";
import { motion } from "framer-motion";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      sx={{ padding: 0, textDecoration: "none" }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * index }}
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          backgroundColor: sameSender ? "#2196f3" : "#f9f9f9",
          color: sameSender ? "white" : "#333",
          padding: "1rem",
          borderBottom: "1px solid #e0e0e0",
          position: "relative",
          borderRadius: "0.5rem",
        }}
      >
        {/* Avatar with Online Dot */}
        <Box sx={{ position: "relative" }}>
          <AvatarCard avatar={avatar} />

          {isOnline && (
            <Box
              sx={{
                position: "absolute",
                bottom: 2,
                right: 2,
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#4caf50",
                border: "2px solid white",
                boxShadow: "0 0 6px rgba(76, 175, 80, 0.6)",
                animation: "pulse 1.5s infinite ease-in-out",
              }}
            />
          )}
        </Box>

        {/* Name + Status + New Message Alert */}
        <Stack spacing={0.3} width="100%">
          <Typography
            fontWeight="bold"
            fontSize="1rem"
            noWrap
            sx={{ maxWidth: "90%" }}
          >
            {name}
          </Typography>

          {isOnline && (
            <Typography
              variant="caption"
              fontSize="0.75rem"
              fontWeight={500}
              sx={{ color: "#4caf50" }}
            >
              Online
            </Typography>
          )}

          {newMessageAlert?.count > 0 && (
            <Typography variant="caption" color="error">
              {newMessageAlert.count} New Message
              {newMessageAlert.count > 1 ? "s" : ""}
            </Typography>
          )}
        </Stack>
      </motion.div>

      {/* Add CSS Keyframes for pulse animation */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </Link>
  );
};

export default memo(ChatItem);
