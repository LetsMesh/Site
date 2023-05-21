import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { rowStyle, informationSectionStyle } from './SignUp';

export default function StepOne(){
	return (
		<div style={informationSectionStyle}>
			<Grid container justifyContent="center" spacing={8} style={rowStyle}>
				<Grid item xs={4}>
					<TextField fullWidth focused id="standard-basic" label="First Name *" variant="standard" />
				</Grid>
				<Grid item xs={4}>
					<TextField fullWidth focused id="standard-basic" label="Last Name *" variant="standard" />
				</Grid>
			</Grid>
			<Grid container justifyContent="center" spacing={8} style={rowStyle}>
				<Grid item xs={4}>
					<TextField fullWidth focused id="standard-basic" label="Nickname" variant="standard" />
				</Grid>
				<Grid item xs={4}>
					<TextField fullWidth focused id="standard-basic" label="Phone Number" variant="standard" />
				</Grid>
			</Grid>
		</div>
	)
}