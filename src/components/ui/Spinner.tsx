import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import CircularProgress, { circularProgressClasses, CircularProgressProps } from "@mui/material/CircularProgress";
import * as React from "react";

// Inspired by the former Facebook spinners.
export default function Spinner(props: CircularProgressProps) {
  return (
    <Box sx={{ position: "relative" }} component="div">
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) => theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: () => "#ec12f9",
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
`;

export function SpinnerBlock({ children, ...props }: React.PropsWithChildren<CircularProgressProps>) {
  return (
    <SpinnerWrapper>
      <Spinner {...props} />
      <div>{children}</div>
    </SpinnerWrapper>
  );
}
