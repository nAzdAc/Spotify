import { PropsWithChildren } from "react";
import { Box, Card, Step, StepLabel, Stepper } from "@mui/material";

const StepWrapper = ({
  children,
  activeStep,
  steps,
}: PropsWithChildren<{ activeStep: number; steps: string[] }>) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step} completed={activeStep > index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Card sx={{ width: 600 }}>{children}</Card>
    </Box>
  );
};

export default StepWrapper;
