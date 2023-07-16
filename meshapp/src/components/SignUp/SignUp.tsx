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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Typography } from "@mui/material";
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
    setActiveStep((prevActiveStep) =>
      prevActiveStep < steps.length - 1 ? prevActiveStep + 1 : prevActiveStep
    );
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
          justifyContent="space-evenly"
          alignItems="flex-end"
          sx={{ padding: "20px 0", backgroundColor: "cardBackground.main" }}
        >
          <Grid container justifyContent="center" xs={3}>
            <Button
              disabled={activeStep === 0}
              variant="contained"
              onClick={handlePrevious}
              startIcon={<ChevronLeftIcon />}
            >
              <Typography>Previous</Typography>
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              "@media(max-width:600px)": {
                order: -1,
                marginBottom: "10px",
              },
            }}
          >
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel sx={{ textAlign: "center" }}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Grid>

          <Grid container justifyContent="center" xs={3}>
            <Button
              variant="contained"
              type="submit"
              onClick={handleContinue}
              endIcon={<ArrowForwardIcon />}
            >
              {activeStep < steps.length - 1 ? (
                <Typography>Continue</Typography>
              ) : (
                <Typography>Go to Profile</Typography>
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
