import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hook";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";

const Search = () => {
  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery();

  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  );

  const dispatch = useDispatch();

  const search = useInputValidation("");

  const [users, setUsers] = useState([]);

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend request...", { userId: id });
  };

  const searchCloseHandler = () => dispatch(setIsSearch(false));

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e));
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);

  return (
    <Dialog
      open={isSearch}
      onClose={searchCloseHandler}
      PaperProps={{
        sx: {
          bgcolor: "#f0f7ff", // Light blue background for dialog
          borderRadius: 3,
          boxShadow: "0 8px 24px rgba(74,144,226,0.2)", // subtle blue shadow
        },
      }}
    >
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle
          textAlign={"center"}
          sx={{ color: "#1e2e4a", fontWeight: "bold" }} // dark blue text
        >
          Find People
        </DialogTitle>

        <TextField
          label="Search users"
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              bgcolor: "#ffffff", // white input background
              borderRadius: 2,
              "& fieldset": {
                borderColor: "#a6c8ff", // soft blue border
              },
              "&:hover fieldset": {
                borderColor: "#4a90e2", // medium blue on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#357abd", // darker blue on focus
              },
            },
            "& .MuiInputAdornment-root svg": {
              color: "#4a90e2", // blue icon color
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List sx={{ maxHeight: 300, overflowY: "auto" }}>
          {users.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
              styling={{
                bgcolor: "#ffffff", // white background for user items
                boxShadow: "0 2px 6px rgba(74,144,226,0.1)", // subtle blue shadow
                borderRadius: "0.75rem",
                mb: "0.5rem",
              }}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
