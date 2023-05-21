import StepOne from "./StepOne";

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
			<div style={informationSectionStyle}>
				<StepOne/>
			</div>
		</>
	);
};
