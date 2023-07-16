import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { UseFormRegister } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { IFormInput } from "./SignUp";
import { useState } from "react";
import { Divider, IconButton, InputAdornment, MenuItem } from "@mui/material";

const informationSectionStyle = {
  paddingTop: 15,
  paddingBottom: 15,
};

const rowStyle = {
  paddingTop: 15,
  paddingBottom: 15,
};

export default function StepOne(props: {
  register: UseFormRegister<IFormInput>;
}) {
  const [passVisible, setPassVisible] = useState(false);
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);
  const togglePass = () => setPassVisible(!passVisible);
  const toggleConfirmPass = () => setConfirmPassVisible(!confirmPassVisible);

  return (
    <Grid
      container
      direction={"column"}
      bgcolor={"cardBackground.main"}
      sx={{
        ".MuiOutlinedInput-notchedOutline,.MuiInput-root:before": {
          borderColor: "input.standard.enabledBorder",
        },
      }}
    >
      <Grid container justifyContent="center" style={informationSectionStyle}>
        <Grid item xs={9} sm={8} md={6}>
          <Grid container justifyContent="center" spacing={8}>
            <Grid item xs={12}>
              <Typography variant="h5" color="text.main">
                Contact Information
              </Typography>
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
                {...props.register("firstName", { required: true })}
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
                {...props.register("lastName", { required: true })}
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
                {...props.register("nickName")}
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
                {...props.register("phoneNumber")}
                id="standard-basic"
                label="Phone Number"
                variant="standard"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ borderColor: "signUpDivider.main", opacity: 0.5 }} />
      <Grid container justifyContent="center" style={informationSectionStyle}>
        <Grid item xs={9} sm={8} md={6}>
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h5" color="text.main">
                Location Information
              </Typography>
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
                {...props.register("country")}
                id="standard-basic"
                label="Country"
                variant="outlined"
                select
              >
                <MenuItem key={1} value="United States">
                  United States
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...props.register("state")}
                id="standard-basic"
                label="State"
                variant="outlined"
                select
              >
                <MenuItem key={1} value="California">
                  California
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ borderColor: "signUpDivider.main", opacity: 0.5 }} />
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
                {...props.register("email", { required: true })}
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        children={
                          passVisible ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )
                        }
                        onClick={togglePass}
                      />
                    </InputAdornment>
                  ),
                }}
                {...props.register("password", { required: true })}
                id="standard-basic"
                label="Password *"
                type={passVisible ? "text" : "password"}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ color: "text.primary" }}
              order={{ xs: 3, sm: 2 }}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox {...props.register("acceptedTermsConditions")} />
                  }
                  label="* I Accept the Terms & Conditions"
                />
                <FormControlLabel
                  control={<Checkbox {...props.register("emailUpdates")} />}
                  label="* Yes! Sign me up for annoying emails"
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        children={
                          confirmPassVisible ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )
                        }
                        onClick={toggleConfirmPass}
                      />
                    </InputAdornment>
                  ),
                }}
                {...props.register("confirmPassword")}
                id="standard-basic"
                label="Confirm Password *"
                type={confirmPassVisible ? "text" : "password"}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ borderColor: "signUpDivider.main", opacity: 0.5 }} />
    </Grid>
  );
}
