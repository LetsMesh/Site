import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { UseFormRegister } from "react-hook-form";

import { IFormInput } from "./SignUp";

const informationSectionStyle = {
  borderBottom: "2px solid lightgray",
  paddingTop: 15,
  paddingBottom: 15,
};


const rowStyle = {
  paddingTop: 15,
  paddingBottom: 15,
};


export default function StepOne(props:{register:UseFormRegister<IFormInput>}) {

  return (
    <>
      <Grid container justifyContent="center" style={informationSectionStyle}>
        <Grid item xs={9} sm={8} md={6}>
          <Grid container justifyContent="center" spacing={8}>
            <Grid item xs={12}>
              <Typography variant="h5">Contact Information</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            columnSpacing={4}
            style={rowStyle}
          >
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                {...props.register('firstName', {required:true})}
                id="standard-basic"
                label="First Name *"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...props.register('lastName', {required:true})}
                id="standard-basic"
                label="Last Name *"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...props.register('nickName')}
                id="standard-basic"
                label="Nickname"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...props.register('phoneNumber')}
                id="standard-basic"
                label="Phone Number"
                variant="standard"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" style={informationSectionStyle}>
        <Grid item xs={9} sm={8} md={6}>
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h5">Location Information</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            columnSpacing={4}
            style={rowStyle}
          >
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...props.register('country')}
                id="standard-basic"
                label="Country"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...props.register('state')}
                id="standard-basic"
                label="State"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" style={informationSectionStyle}>
        <Grid item xs={9} sm={8} md={6}>
          <Grid container justifyContent="center" columnSpacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...props.register('email', {required:true})}
                id="standard-basic"
                label="Email *"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...props.register('password', {required:true})}
                id="standard-basic"
                label="Password *"
                type="password"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} order={{ xs: 3, sm: 2 }}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox {...props.register('acceptedTermsConditions')}/>}
                  label="I accept the terms & conditions"
                />
                <FormControlLabel
                  control={<Checkbox {...props.register('emailUpdates')}/>}
                  label="Yes, spam my email"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6} order={{ xs: 2, sm: 3 }}>
              <TextField
                margin="normal"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...props.register('confirmPassword')}
                id="standard-basic"
                label="Confirm Password *"
                type="password"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
