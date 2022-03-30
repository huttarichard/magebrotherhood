import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { StepLabelProps } from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { FormattedMessage } from "react-intl";

type TransactionStepperProps = {
  steps: IStep[];
  activeStep: number;
  hash?: string;
};

type IStep = {
  error: boolean;
  label: string;
  labelOptional?: string;
  labelErrorOptional?: string;
  content?: string | JSX.Element;
};

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin: 0 0 2rem;
    color: #fff;
    text-align: center;
    font-size: 3rem;
    font-family: "Bebas Neue", sans-serif;
  }
`;

const StepContentText = styled(Box)`
  color: #fff;
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
  font-size: 1rem;

  p {
    &:first-of-type {
      margin-top: 0;
    }
  }
`;

const Hash = styled.div`
  margin-bottom: 4rem;

  h3 {
    margin: 0;
    color: #fff;
  }

  a {
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 1rem;
  }
`;

export default function TransactionStepper({ steps, activeStep, hash }: TransactionStepperProps) {
  return (
    <Box>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
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
      <StepContent>
        <h2>{activeStep === steps.length ? "Transaction complete" : steps.find((_, i) => i === activeStep)?.label}</h2>
        <StepContentText>{steps.find((_, i) => i === activeStep)?.content}</StepContentText>
        {hash && (
          <Hash>
            <h3>
              <FormattedMessage defaultMessage="Transaction hash" id="FCXIlK" />
            </h3>
            <a href="#">{hash}</a>
          </Hash>
        )}
      </StepContent>
    </Box>
  );
}
