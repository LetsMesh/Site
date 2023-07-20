import { useFormContext } from "react-hook-form";
import {
  Grid,
  Divider,
  MenuItem,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Tooltip,
} from "@mui/material";

import { IFormInput } from "./SignUp";
import { useEffect, useState } from "react";
import StandardTextField from "./inputs/StandardTextField";
import PasswordTextField from "./inputs/PasswordTextField";
import ErrorIcon from "@mui/icons-material/Error";

const informationSectionStyle = {
  paddingTop: 15,
  paddingBottom: 15,
};

const rowStyle = {
  paddingTop: 15,
  paddingBottom: 15,
};

const CountriesAndStates: { [key: string]: Array<string> } = {
  "United States": [
    "Alabama",
    "Alaska",
    "American Samoa",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "District of Columbia",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Minor Outlying Islands",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Northern Mariana Islands",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "U.S. Virgin Islands",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ],
  "Absolutely Goddamn": ["Nowhere"],
};
const menuStyle = { MenuProps: { style: { maxHeight: 200 } } };

export default function StepOne() {
  //setting height of dropdown menu

  return (
    <Grid
      container
      direction={"column"}
      bgcolor={"cardBackground.main"}
      sx={{
        ".MuiOutlinedInput-notchedOutline,.MuiInput-root:before": {
          borderColor: "input.standard.enabledBorder",
        },
        ".MuiPaper-root.MuiMenu-paper": {
          maxHeight: "100px",
          backgroundColor: "blue",
        },
      }}
    >
      {/*Contact Info Section*/}
      <Grid container justifyContent="center" style={informationSectionStyle}>
        <Grid item xs={9} sm={8} md={6}>
          {/* Title */}
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
            {/*First Name*/}
            <Grid item xs={12} sm={6}>
              <FirstName />
            </Grid>
            {/*Last Name*/}
            <Grid item xs={12} sm={6}>
              <LastName />
            </Grid>
            {/*Nickname*/}
            <Grid item xs={12} sm={6}>
              <Nickname />
            </Grid>
            {/*Phone Number*/}
            <Grid item xs={12} sm={6}>
              <PhoneNumber />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Divider sx={{ borderColor: "signUpDivider.main", opacity: 0.5 }} />

      {/*Location Info Section*/}
      <Grid container justifyContent="center" style={informationSectionStyle}>
        {/*Title*/}
        <Grid item xs={9} sm={8} md={6}>
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h5" color="text.main">
                Location Information
              </Typography>
            </Grid>
          </Grid>
          {/*Countries and States Select*/}
          <CountriesAndStatesSelect />
        </Grid>
      </Grid>

      <Divider sx={{ borderColor: "signUpDivider.main", opacity: 0.5 }} />

      {/*Email, Password, Terms of Service/Email Opt-in Section*/}
      <Grid container justifyContent="center" style={informationSectionStyle}>
        <Grid item xs={9} sm={8} md={6}>
          <Grid container justifyContent="center" columnSpacing={4}>
            {/*Email*/}
            <Grid item xs={12} sm={6}>
              <EmailAddress />
            </Grid>

            {/*Password*/}
            <Grid item xs={12} sm={6}>
              <Password />
            </Grid>

            {/*Terms and Conditions/Email Opt-in*/}
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ color: "text.primary" }}
              order={{ xs: 3, sm: 2 }}
            >
              <FormGroup>
                <TermsAndConditions />

                <EmailUpdates />
              </FormGroup>
            </Grid>

            {/*Confirm Password*/}
            <Grid item xs={12} sm={6} order={{ xs: 2, sm: 3 }}>
              <ConfirmPassword />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ borderColor: "signUpDivider.main", opacity: 0.5 }} />
    </Grid>
  );
}
//---------------------------------------INPUTS-----------------------------------------------------------

//first name text field
function FirstName() {
  return (
    <StandardTextField
      label="First Name *"
      id="first-name"
      fieldName="firstName"
      required={true}
    />
  );
}

//last name text field

function LastName() {
  return (
    <StandardTextField
      label="Last Name *"
      id="last-name"
      required={true}
      fieldName="lastName"
    />
  );
}

//nickname text field

function Nickname() {
  return (
    <StandardTextField label="Nickname" id="nickname" fieldName="nickName" />
  );
}

//phone number text field

function PhoneNumber() {
  return (
    <StandardTextField
      label="Phone Number"
      id="phone-number"
      fieldName="phoneNumber"
      validators={{
        pattern: (value) => {
          let phoneNumRegex =
            /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
          return phoneNumRegex.test(value) || "Invalid phone number format";
        },
      }}
    />
  );
}

//email address text field
function EmailAddress() {
  return (
    <StandardTextField
      label="Email *"
      id="email-address"
      fieldName="email"
      validators={{
        pattern: (value) => {
          let emailRegex =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return emailRegex.test(value) || "Invalid email address format";
        },
      }}
    />
  );
}

//password text field
function Password() {
  //for toggling password text visibility
  const [passVisible, setPassVisible] = useState(false);
  const togglePass = () => setPassVisible(!passVisible);

  return (
    <PasswordTextField
      fieldName="password"
      id="password"
      label="Password *"
      validators={{
        minLength: (value) => {
          return value.length > 8 || "Password length needs to be at least 8.";
        },
      }}
      passVisible={passVisible}
      togglePass={togglePass}
    />
  );
}

//confirm text field
function ConfirmPassword() {
  const props = useFormContext<IFormInput>();
  //for toggling password text visibility
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);
  const toggleConfirmPass = () => setConfirmPassVisible(!confirmPassVisible);
  return (
    <PasswordTextField
      fieldName="confirmPassword"
      id="confirm-password"
      label="Confirm Password *"
      validators={{
        matchesPassword: (value) => {
          return (
            value === props.getValues("password") || "Does not match password."
          );
        },
      }}
      passVisible={confirmPassVisible}
      togglePass={toggleConfirmPass}
    />
  );
}

//Terms and Conditions checkbox
function TermsAndConditions() {
  const props = useFormContext<IFormInput>();

  //keep track of whether checkbox is checked for if we go back after submitting
  const [termsChecked, setTermsChecked] = useState(
    props.getValues("acceptedTermsConditions") || false
  );

  useEffect(() => {
    props.setValue("acceptedTermsConditions", termsChecked);
  });
  return (
    <FormControlLabel
      control={
        <Checkbox
          id="accepted-terms-and-conditions"
          {...props.register("acceptedTermsConditions", {
            required: "This is required",
          })}
          value={termsChecked}
          checked={termsChecked}
          onChange={(event, checked) => {
            setTermsChecked(checked);
          }}
        />
      }
      label="* I Accept the Terms & Conditions"
    />
  );
}
// email update checkbox
function EmailUpdates() {
  const props = useFormContext<IFormInput>();

  //keep track of whether checkbox is checked for if we go back after submitting
  const [emailUpdateChecked, setEmailUpdateChecked] = useState(
    props.getValues("emailUpdates") || false
  );

  useEffect(() => {
    props.setValue("emailUpdates", emailUpdateChecked);
  });
  return (
    <FormControlLabel
      control={
        <Checkbox
          id="email-updates"
          {...props.register("emailUpdates")}
          value={emailUpdateChecked}
          checked={emailUpdateChecked}
          onChange={(event, checked) => {
            setEmailUpdateChecked(checked);
          }}
        />
      }
      label="* Yes! Sign me up for annoying emails"
    />
  );
}
//countries/states select
function CountriesAndStatesSelect() {
  const props = useFormContext<IFormInput>();

  //for setting countries/states options
  const [stateOptions, setStateOptions] = useState(
    CountriesAndStates[props.getValues("country")] || [""]
  );
  const [selectedCountry, setSelectedCountry] = useState(
    props.getValues("country") || ""
  );
  const [selectedState, setSelectedState] = useState(
    props.getValues("state") || ""
  );

  //update form values when selected country/state changes
  useEffect(() => {
    props.setValue("country", selectedCountry);
    props.setValue("state", selectedState);
  }, [selectedCountry, selectedState]);

  //country select
  const CountriesSelect = () => {
    return (
      <Grid item sx={{ position: "relative" }}>
        <TextField
          margin="normal"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          {...props.register("country", { required: "This is required" })}
          id="country"
          label="Country"
          variant="outlined"
          select
          value={selectedCountry}
          SelectProps={menuStyle}
          onChange={(event) => {
            //new country
            let newCountry = event.target.value;
            //set new country
            setSelectedCountry(newCountry);
            //undo previous state selection
            setSelectedState("");
            //set new state options
            let newStates = CountriesAndStates[newCountry];
            setStateOptions(newStates);
          }}
        >
          {Object.keys(CountriesAndStates).map((country, index) => {
            return (
              <MenuItem key={index} value={country}>
                {country}
              </MenuItem>
            );
          })}
        </TextField>
        {props.formState.errors.country && (
          <Tooltip
            disableFocusListener
            disableTouchListener
            arrow
            title={props.formState.errors.country?.message}
            sx={{
              position: "absolute",
              top: "0px",
              left: "-13px",
            }}
          >
            <ErrorIcon color="error" />
          </Tooltip>
        )}
      </Grid>
    );
  };

  //State select
  const StatesSelect = () => {
    return (
      <Grid item sx={{ position: "relative" }}>
        <TextField
          margin="normal"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          {...props.register("state", { required: "This is required" })}
          id="state"
          label="State"
          variant="outlined"
          select
          value={selectedState}
          SelectProps={menuStyle}
          onChange={(event) => {
            //get new state and set it as current selected option
            let newState = event.target.value;
            setSelectedState(newState);
          }}
        >
          {stateOptions.length > 0 &&
            stateOptions[0].length > 0 &&
            stateOptions.map((state, index) => {
              return (
                <MenuItem key={index} value={state}>
                  {state}
                </MenuItem>
              );
            })}
        </TextField>
        {props.formState.errors.state && (
          <Tooltip
            disableFocusListener
            disableTouchListener
            arrow
            title={props.formState.errors.state?.message}
            sx={{
              position: "absolute",
              top: "0px",
              left: "-13px",
            }}
          >
            <ErrorIcon color="error" />
          </Tooltip>
        )}
      </Grid>
    );
  };

  return (
    <Grid container justifyContent="center" columnSpacing={4} style={rowStyle}>
      {/*Country*/}
      <Grid item xs={12} sm={6}>
        <CountriesSelect />
      </Grid>

      {/*State*/}
      <Grid item xs={12} sm={6}>
        <StatesSelect />
      </Grid>
    </Grid>
  );
}
