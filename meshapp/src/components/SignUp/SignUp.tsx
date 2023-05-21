import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useState } from "react";
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"

const steps = ["Confirm Account", "Verify Email", "Go to Profile"];	
const stepComponents = [<StepOne/>, <StepTwo/>, <StepThree/>];

export default function SignUp() {
	const [activeStep, setActiveStep] = useState(0);

	const handlePrevious = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleContinue = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

	return(
		<>
			{
				// not sure if this is a good practice
				// implementation of loading symbol probably requires something different
				stepComponents[activeStep]
			}
			<Grid container justifyContent="space-between" style={{paddingTop:20}}>
				<Grid item xs={1} md={2}>
				</Grid>
				<Grid item xs={10} md={8}>
					<Stepper activeStep={activeStep} style={{paddingBottom:20}}>
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
				<Grid item xs={1} md={2}>
				</Grid>
				<Grid item xs={6} style={{display:"flex", justifyContent: "center"}}>
					<Button disabled={activeStep===0} variant="contained" onClick={handlePrevious}>Previous</Button>
				</Grid>
				<Grid item xs={6} style={{display:"flex", justifyContent: "center"}}>
					<Button variant="contained" onClick={handleContinue}>Continue</Button>
				</Grid>
			</Grid>
		</>
	);
};
