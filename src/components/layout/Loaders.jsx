import React from "react";
import { Grid, Skeleton, Stack } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";

// Bounce keyframes animation
const bounceKeyframes = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.3;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
`;

// BouncingSkeleton styled component with animation and display fix
const BouncingSkeleton = styled(Skeleton)`
  display: inline-block;
  animation-name: ${bounceKeyframes};
  animation-duration: 1.4s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
`;

const LayoutLoader = () => {
  return (
    <Grid container height="calc(100vh - 4rem)" spacing={2}>
      <Grid
        item
        sm={4}
        md={3}
        sx={{
          display: { xs: "none", sm: "block" },
          height: "100%",
        }}
      >
        <Skeleton variant="rectangular" height="100%" />
      </Grid>

      <Grid item xs={12} sm={8} md={5} lg={6} sx={{ height: "100%" }}>
        <Stack spacing={2}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} variant="rounded" height={80} />
          ))}
        </Stack>
      </Grid>

      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: { xs: "none", md: "block" },
          height: "100%",
        }}
      >
        <Skeleton variant="rectangular" height="100%" />
      </Grid>
    </Grid>
  );
};

const TypingLoader = () => {
  const delays = [0.1, 0.2, 0.4, 0.6];

  return (
    <Stack spacing={0.5} direction="row" padding={0.5} justifyContent="center">
      {delays.map((delay, i) => (
        <BouncingSkeleton
          key={i}
          variant="circular"
          width={15}
          height={15}
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </Stack>
  );
};

export { LayoutLoader, TypingLoader };
