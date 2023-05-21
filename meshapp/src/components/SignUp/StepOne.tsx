import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const informationSectionStyle = {
  borderBottom: "2px solid lightgray",
};

const rowStyle = {
  paddingTop: 15,
  paddingBottom: 15,
};

const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "grey"
    }
  }
}    

export default function StepOne() {
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={8}>
          <div style={informationSectionStyle}>
            <Grid container justifyContent="center" spacing={8}>
              <Grid item xs={12}>
                <Typography variant="h5">Contact Information</Typography>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="center"
              spacing={4}
              style={rowStyle}
            >
              <Grid item xs={6}>
                <TextField
									sx={textFieldStyle}
                  fullWidth
                  focused
                  id="standard-basic"
                  label="First Name *"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  focused
                  id="standard-basic"
                  label="Last Name *"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  focused
                  id="standard-basic"
                  label="Nickname"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  focused
                  id="standard-basic"
                  label="Phone Number"
                  variant="standard"
                />
              </Grid>
            </Grid>
          </div>
          <div style={informationSectionStyle}>
            <Grid container justifyContent="center" spacing={8}>
              <Grid item xs={12}>
                <Typography variant="h5">Location Information</Typography>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="center"
              spacing={4}
              style={rowStyle}
            >
              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  focused
                  id="standard-basic"
                  label="Country"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  focused
                  id="standard-basic"
                  label="State"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </div>
          <div style={informationSectionStyle}>
            <Grid
              container
              justifyContent="center"
							columnSpacing={4}
            >
              <Grid item xs={6}>
                <TextField
									margin="normal"
                  fullWidth
                  focused
                  id="standard-basic"
                  label="Email *"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
									margin="normal"
                  fullWidth
                  focused
                  id="standard-basic"
                  label="Password *"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
								<FormControlLabel control={<Checkbox />} label="I accept the terms and conditions" />
								<FormControlLabel control={<Checkbox />} label="Yes, spam my email" />
              </Grid>
              <Grid item xs={6}>
                <TextField
									margin="normal"
                  fullWidth
                  focused
                  id="standard-basic"
                  label="Confirm Password *"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
