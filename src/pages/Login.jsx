import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFileHandler, useInputValidation } from "6pp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";

import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { userExists } from "../redux/reducers/auth";
import { usernameValidator } from "../utils/validators";
import { server } from "../constants/config";

import "./login.css"; // ✨ Import CSS

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");
  const avatar = useFileHandler("single");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging In...");
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        { username: username.value, password: password.value },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    try {
      const { data } = await axios.post(`${server}/api/v1/user/new`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`wrapper ${isLogin ? "login-mode" : "signup-mode"}`}>
      <Container maxWidth="md" className="login-container">
        <Paper elevation={6} className="form-box">
          <div className="left-panel">
            <div className="content">
              
              <Typography variant="h4" fontWeight={700} gutterBottom>
                {isLogin ? "Welcome Back!" : "Hello, Friend!"}
              </Typography>
              <Typography variant="body1">
                {isLogin
                  ? "Login to access Chative and connect instantly."
                  : "Enter your personal details and start your journey with Chative."}
              </Typography>
              <Button
                onClick={toggleLogin}
                variant="outlined"
                sx={{ mt: 3, color: "#fff", borderColor: "#fff" }}
              >
                {isLogin ? "Sign Up" : "Login"}
              </Button>
            </div>
          </div>

          <div className="right-panel">
            {isLogin ? (
              <>
                <Typography variant="h5">Login</Typography>
                <form onSubmit={handleLogin} className="form-style">
                  <TextField
                    required
                    fullWidth
                    label="Username"
                    margin="normal"
                    variant="outlined"
                    value={username.value}
                    onChange={username.changeHandler}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    variant="outlined"
                    value={password.value}
                    onChange={password.changeHandler}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    disabled={isLoading}
                    sx={{ mt: 2 }}
                  >
                    Login
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Typography variant="h5">Sign Up</Typography>
                <form onSubmit={handleSignUp} className="form-style">
                  <Stack position="relative" width="8rem" margin="auto">
                    <Avatar
                      sx={{
                        width: "8rem",
                        height: "8rem",
                        objectFit: "contain",
                      }}
                      src={avatar.preview}
                    />
                    <IconButton
                      sx={{
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        bgcolor: "rgba(0,0,0,0.6)",
                        color: "white",
                      }}
                      component="label"
                    >
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </IconButton>
                  </Stack>

                  {avatar.error && (
                    <Typography color="error">{avatar.error}</Typography>
                  )}
                  <TextField
                    required
                    fullWidth
                    label="Name"
                    margin="normal"
                    variant="outlined"
                    value={name.value}
                    onChange={name.changeHandler}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Bio"
                    margin="normal"
                    variant="outlined"
                    value={bio.value}
                    onChange={bio.changeHandler}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Username"
                    margin="normal"
                    variant="outlined"
                    value={username.value}
                    onChange={username.changeHandler}
                  />
                  {username.error && (
                    <Typography color="error" variant="caption">
                      {username.error}
                    </Typography>
                  )}
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    variant="outlined"
                    value={password.value}
                    onChange={password.changeHandler}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    disabled={isLoading}
                    sx={{ mt: 2 }}
                  >
                    Sign Up
                  </Button>
                </form>
              </>
            )}
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
