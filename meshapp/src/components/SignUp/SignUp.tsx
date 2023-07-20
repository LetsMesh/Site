import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Typography } from "@mui/material";
const steps = ["Create Account", "Verify Email", "Go to Profile"];

//interface for the form field names and types
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
  label: string;
  interests: Array<string>;
  picture: File;
}
let render = 0;
export default function SignUp() {
  const formMethods = useForm<IFormInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      nickName: "",
      phoneNumber: "",
      country: "",
      state: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptedTermsConditions: false,
      emailUpdates: false,
      name: "",
      title: "",
      label: "",
      interests: [],
    },
  });

  //contains which step we're on
  const [activeStep, setActiveStep] = useState(0);
  //keep track of renders
  render++;
  console.log("render", render);
  //goes to previous step
  const handlePrevious = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  //handles the submission of the data in the current step
  const handleContinue = async () => {
    //states if current step data is valid
    let currentStepValid: boolean;

    //function for continuing to next step
    const continueToNext = () =>
      setActiveStep((prevActiveStep) =>
        prevActiveStep < steps.length - 1 ? prevActiveStep + 1 : prevActiveStep
      );

    //for each step, evaluates the data
    //if valid, then we continue to next step
    //otherwise display error

    switch (activeStep) {
      case 0:
        currentStepValid = await formMethods.trigger([
          "firstName",
          "lastName",
          "nickName",
          "phoneNumber",
          "country",
          "state",
          "email",
          "password",
          "confirmPassword",
          "acceptedTermsConditions",
          "emailUpdates",
        ]);
        if (currentStepValid) {
          continueToNext();
        } else {
          console.log(formMethods.formState.errors);
        }
        break;
      case 2:
        currentStepValid = await formMethods.trigger([
          "name",
          "location",
          "interests",
          "picture",
        ]);
        if (currentStepValid) {
          continueToNext();
        } else {
          console.log(formMethods.formState.errors);
        }
        break;
      default:
        continueToNext();
        break;
    }
  };

  //for logging data and errors in console
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    console.log(formMethods.formState.errors);
  };

  //The steps of the form, need to pass in the react hook form methods
  const stepComponents = [<StepOne />, <StepTwo />, <StepThree />];

  //TODO: need to get File object containing default profile picture to initialize picture form value

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        {/*Load step */}
        {stepComponents[activeStep]}

        {/* 
        Stepper showing what step we are on and all of the steps, along with the buttons for traversing through steps
        When going below 600px, the stepper will stack on top of the buttons.
        */}
        <Grid
          container
          justifyContent="space-evenly"
          alignItems="flex-end"
          sx={{ padding: "20px 0", backgroundColor: "cardBackground.main" }}
        >
          <Grid container justifyContent="center" xs={5} sm={3}>
            {/*disables when we're on the first step*/}
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

          <Grid container justifyContent="center" xs={5} sm={3}>
            <Button
              variant="contained"
              type="submit"
              onClick={handleContinue}
              endIcon={<ArrowForwardIcon />}
            >
              {/*changes to Go to profile when we're on the last step*/}
              {activeStep < steps.length - 1 ? (
                <Typography>Continue</Typography>
              ) : (
                <Typography>Go to Profile</Typography>
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
