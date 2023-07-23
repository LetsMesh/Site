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
import { Theme, ThemeProvider, Typography, createTheme } from "@mui/material";

//step labels
const stepLabels = ["Create Account", "Verify Email", "Go to Profile"];

//enum tying steps to step index
enum Steps {
  CREATE_ACCOUNT = 0,
  VERIFY_EMAIL = 1,
  GO_TO_PROFILE = 2,
}

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
  pronouns: string;
  userType: string;
  interests: Array<string>;
  picture: File;
}

//styling for error
const tooltipErrorTheme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#f44336",
          color: "#ffffff",
        },
        arrow: {
          color: "#f44336",
        },
      },
    },
  },
});

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
      label:
        "This here could be your bio if you had one. Set one up as soon as you can to tell everyone about yourself. Bios help others learn about you.",
      pronouns: "",
      userType: "",
      interests: [],
    },
    mode: "onBlur",
  });

  //for logging data and errors in console
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("is submitting");
    console.log(data);
    console.log(formMethods.formState.errors);
  };

  //contains which form step we're on
  const [activeStep, setActiveStep] = useState(0);

  //goes to previous step
  const handlePrevious = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  //handles the submission of the data in the current step
  const handleContinue = async () => {
    //function for continuing to next step
    const continueToNext = () =>
      setActiveStep((prevActiveStep) =>
        prevActiveStep < stepLabels.length ? prevActiveStep + 1 : prevActiveStep
      );

    //stores whether the current step's inputs are valid
    let isValid = false;

    // trigger validation for each step unless it is 2nd step (where there aren't any inputs)
    //if we're on the last step, then trigger submit
    if (activeStep === Steps.CREATE_ACCOUNT) {
      isValid = await formMethods.trigger([
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
    } else if (activeStep === Steps.GO_TO_PROFILE) {
      isValid = await formMethods.trigger([
        "label",
        "title",
        "location",
        "name",
        "interests",
        "userType",
      ]);
    }

    if (isValid || activeStep === 1) {
      console.log("is evaluating");
      console.log(formMethods.getValues());
      continueToNext();
    } else {
      console.log(formMethods.formState.errors);
    }

    if (isValid && activeStep === 2) {
      formMethods.handleSubmit(onSubmit)();
    }
  };

  //The steps of the form, need to pass in the react hook form methods
  const stepComponents = [<StepOne />, <StepTwo />, <StepThree />];

  //TODO: need to get File object containing default profile picture to initialize picture form value

  return (
    <ThemeProvider
      theme={(theme: Theme) => {
        return createTheme(theme, {
          components: {
            ...theme.components,
            MuiTooltip: tooltipErrorTheme.components?.MuiTooltip,
          },
        });
      }}
    >
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
                {stepLabels.map((label, index) => {
                  return (
                    <Step key={label}>
                      <StepLabel sx={{ textAlign: "center" }}>
                        {label}
                      </StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </Grid>

            <Grid container justifyContent="center" xs={5} sm={3}>
              <Button
                variant="contained"
                onClick={handleContinue}
                endIcon={<ArrowForwardIcon />}
              >
                {/*changes to Go to profile when we're on the last step*/}
                {activeStep < stepLabels.length - 1 ? (
                  <Typography>Continue</Typography>
                ) : (
                  <Typography>Go to Profile</Typography>
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </ThemeProvider>
  );
}
