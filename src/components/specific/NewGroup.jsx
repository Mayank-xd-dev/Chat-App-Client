import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import UserItem from "../shared/UserItem";
import { useDispatch, useSelector } from "react-redux";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { setIsNewGroup } from "../../redux/reducers/misc";
import toast from "react-hot-toast";

const NewGroup = () => {
  const { isNewGroup } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const groupName = useInputValidation("");

  const [selectedMembers, setSelectedMembers] = useState([]);

  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");

    if (selectedMembers.length < 2)
      return toast.error("Please Select Atleast 3 Members");

    newGroup("Creating New Group...", {
      name: groupName.value,
      members: selectedMembers,
    });

    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  return (
    <Dialog
      onClose={closeHandler}
      open={isNewGroup}
      PaperProps={{
        sx: {
          bgcolor: "#f0f8ff", // very light blue background
          borderRadius: 3,
          boxShadow: "0 8px 30px rgba(66,133,244,0.15)", // subtle blue shadow
        },
      }}
    >
      <Stack
        p={{ xs: "1rem", sm: "3rem" }}
        width={"25rem"}
        spacing={"2rem"}
        sx={{ color: "#1a237e" }} // dark blue text for contrast
      >
        <DialogTitle
          textAlign={"center"}
          variant="h4"
          sx={{ fontWeight: "bold", color: "#0d47a1" }}
        >
          New Group
        </DialogTitle>

        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
          variant="outlined"
          size="medium"
          sx={{
            bgcolor: "#fff",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#90caf9", // light blue border
              },
              "&:hover fieldset": {
                borderColor: "#42a5f5", // medium blue hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1976d2", // darker blue focus
              },
            },
          }}
        />

        <Typography variant="body1" sx={{ fontWeight: "600" }}>
          Members
        </Typography>

        <Stack
          sx={{
            maxHeight: 280,
            overflowY: "auto",
            bgcolor: "#e3f2fd", // very subtle blue background for the list
            p: 1,
            borderRadius: 2,
          }}
          spacing={1}
        >
          {isLoading ? (
            <Skeleton variant="rectangular" height={50} />
          ) : (
            data?.friends?.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
                styling={{
                  bgcolor: "#fff",
                  boxShadow: "0 1px 4px rgba(25, 118, 210, 0.1)",
                  borderRadius: "0.5rem",
                  p: "0.25rem 0.5rem",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                  "&:hover": {
                    bgcolor: "#bbdefb",
                  },
                }}
              />
            ))
          )}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button
            variant="text"
            color="error"
            size="large"
            onClick={closeHandler}
            sx={{ fontWeight: "600" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={submitHandler}
            disabled={isLoadingNewGroup}
            sx={{
              bgcolor: "#1976d2",
              "&:hover": {
                bgcolor: "#115293",
              },
              fontWeight: "600",
            }}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
