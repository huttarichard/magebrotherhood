import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import * as React from "react";

type Step = {
  title: string;
  error: boolean;
};

const steps: Step[] = [
  {
    title: "Init",
    error: false,
  },
  {
    title: "Hash",
    error: false,
  },
  {
    title: "Finish",
    error: false,
  },
];

export default function TransactionStepper({ activeStep }: { activeStep: number }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => {
          return (
            <Step key={index}>
              <StepLabel>{step.title}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
