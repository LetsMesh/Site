import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

export const informationSectionStyle = {
	borderBottom: "2px solid lightgray"
}

export const rowStyle = {
	paddingTop: 0,
	paddingBottom: 30
}

export default function SignUp() {
	return(
		<>
			<StepOne/>
			<StepTwo/>
			<StepThree/>
		</>
	);
};
