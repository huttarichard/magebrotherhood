import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { StepLabelProps } from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";

type TransactionStepperProps = {
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

const steps: IStep[] = [
  {
    error: false,
    label: "Initiating",
    labelOptional: "GO!",
    content: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis veritatis quia eligendi ipsum ex tempore
        sapiente ea consequatur quisquam fugiat corrupti minima, aut omnis. Reprehenderit non facilis repellendus
        praesentium architecto.
      </p>
    ),
  },
  {
    error: false,
    label: "Waiting for confirmation",
    labelOptional: "Wait for it...",
    content: (
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati autem quisquam similique magni architecto
        voluptatibus qui eius sit iure eveniet libero eum, quia, sapiente minima molestias eaque modi ducimus
        voluptatum?
      </p>
    ),
  },
  {
    error: false,
    label: "Finalizing",
    labelOptional: "Almost there!",
    labelErrorOptional: "Failed!",
    content: (
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, aut officia et possimus ratione, in provident
        magnam minus qui hic odit quis enim praesentium numquam deleniti adipisci aperiam optio quasi? Ipsam inventore
        consequatur accusantium ex? Magni animi, adipisci doloremque temporibus distinctio commodi consequuntur tenetur?
      </p>
    ),
  },
];

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
`;

const Hash = styled.div`
  h3 {
    color: #fff;
  }

  a {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

export default function TransactionStepper({ activeStep, hash }: TransactionStepperProps) {
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
            <h3>Transaction hash</h3>
            <a href="#">{hash}</a>
          </Hash>
        )}
      </StepContent>
    </Box>
  );
}
