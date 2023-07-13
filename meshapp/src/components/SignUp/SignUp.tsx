import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useForm, SubmitHandler } from "react-hook-form";

const steps = ["Create Account", "Verify Email", "Go to Profile"];

export interface IFormInput {
  firstName: string;
  lastName: string;
  nickName: string;
  phoneNumber: string;
  country: string;
  state: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTermsConditions: boolean;
  emailUpdates: boolean;
  name: string;
  location: string;
  title: string;
}

export default function SignUp() {
  const [activeStep, setActiveStep] = useState(0);

  const handlePrevious = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleContinue = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    console.log(errors);
  };

  const stepComponents = [
    <StepOne register={register} />,
    <StepTwo />,
    <StepThree register={register} />,
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {
          // not sure if this is a good practice
          // implementation of loading symbol probably requires something different
          stepComponents[activeStep]
        }
        <Grid
          container
          justifyContent="space-between"
          sx={{ padding: "20px 0", backgroundColor: "cardBackground.main" }}
        >
          <Grid item xs={1} md={2}></Grid>
          <Grid item xs={10} md={8}>
            <Stepper activeStep={activeStep} style={{ paddingBottom: 20 }}>
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Grid>
          <Grid item xs={1} md={2}></Grid>
          <Grid
            item
            xs={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              disabled={activeStep === 0}
              variant="contained"
              onClick={handlePrevious}
            >
              Previous
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button variant="contained" type="submit" onClick={handleContinue}>
              Continue
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
