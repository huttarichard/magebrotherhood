import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { StepLabelProps } from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import * as React from "react";

type Step = {
  label: string;
  labelOptional?: string;
  labelErrorOptional?: string;
  error: boolean;
};

const steps: Step[] = [
  {
    label: "Initiating",
    labelOptional: "GO!",
    error: false,
  },
  {
    label: "Waiting for confirmation",
    labelOptional: "Wait for it...",
    error: false,
  },
  {
    label: "Transaction confirmed",
    labelOptional: "Congrats!",
    labelErrorOptional: "Failed!",
    error: false,
  },
];

export default function TransactionStepper({ activeStep }: { activeStep: number }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps: StepLabelProps = {
            error: step.error,
          };

          if (step.error && step.labelErrorOptional) {
            labelProps.optional = step.labelErrorOptional;
          }

          if (activeStep === index) {
            labelProps.optional = step.labelOptional;
          }

          return (
            <Step key={index}>
              <StepLabel {...labelProps}>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
