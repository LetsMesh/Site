import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import {
  Grid,
  Divider,
  MenuItem,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import { IFormInput } from "./SignUp";
import { useEffect, useState } from "react";
import StandardTextField from "./inputs/StandardTextField";
import PasswordTextField from "./inputs/PasswordTextField";

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
export default function StepOne(props: {
  register: UseFormRegister<IFormInput>;
  setValue: UseFormSetValue<IFormInput>;
  getValues: UseFormGetValues<IFormInput>;
}) {
  //not putting these into their respective functions because if I do that they will rerender upon submission
  //if there is an error the country/states data and the toggle state of the passwords will reset, which is not what we want

  //for setting countries/states options
  const [stateOptions, setStateOptions] = useState([""]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  //for toggling password text visibility
  const [passVisible, setPassVisible] = useState(false);
  const togglePass = () => setPassVisible(!passVisible);

  //for toggling password text visibility
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);
  const toggleConfirmPass = () => setConfirmPassVisible(!confirmPassVisible);

  //setting height of dropdown menu
  const menuStyle = { MenuProps: { style: { maxHeight: 200 } } };

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
              {/*For some reason I am unable to refactor this into a separate function, if I do so, after the form is submited for the first time and there is an error, I am unable to click the service terms checkbox again */}
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="accepted-terms-and-conditions"
                      {...props.register("acceptedTermsConditions", {
                        required: "This is required",
                      })}
                    />
                  }
                  label="* I Accept the Terms & Conditions"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      id="email-updates"
                      {...props.register("emailUpdates")}
                    />
                  }
                  label="* Yes! Sign me up for annoying emails"
                />
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

  //---------------------------------------INPUTS-----------------------------------------------------------

  //first name text field
  function FirstName() {
    return (
      // <TextField
      //   margin="normal"
      //   fullWidth
      //   InputLabelProps={{
      //     shrink: true,
      //   }}
      //   {...props.register("firstName", {
      //     required: "This is required",
      //   })}
      //   id="first-name"
      //   label="First Name *"
      //   variant="standard"
      // />
      <StandardTextField
        label="First Name *"
        register={props.register}
        id="first-name"
        required={true}
        fieldName="firstName"
      />
    );
  }

  //last name text field

  function LastName() {
    return (
      // <TextField
      //   margin="normal"
      //   fullWidth
      //   InputLabelProps={{
      //     shrink: true,
      //   }}
      //   {...props.register("lastName", {
      //     required: "This is required",
      //   })}
      //   id="last-name"
      //   label="Last Name *"
      //   variant="standard"
      // />
      <StandardTextField
        label="Last Name *"
        register={props.register}
        id="last-name"
        required={true}
        fieldName="lastName"
      />
    );
  }

  //nickname text field

  function Nickname() {
    return (
      // <TextField
      //   margin="normal"
      //   fullWidth
      //   InputLabelProps={{
      //     shrink: true,
      //   }}
      //   {...props.register("nickName")}
      //   id="nickname"
      //   label="Nickname"
      //   variant="standard"
      // />

      <StandardTextField
        label="Nickname"
        register={props.register}
        id="nickname"
        fieldName="nickName"
      />
    );
  }

  //phone number text field

  function PhoneNumber() {
    return (
      // <TextField
      //   margin="normal"
      //   fullWidth
      //   InputLabelProps={{
      //     shrink: true,
      //   }}
      //   {...props.register("phoneNumber", {
      //     pattern: {
      //       value: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
      //       message: "Invalid phone number format",
      //     },
      //   })}
      //   id="phone-number"
      //   label="Phone Number"
      //   variant="standard"
      // />

      <StandardTextField
        label="Phone Number"
        register={props.register}
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
      // <TextField
      //   margin="normal"
      //   fullWidth
      //   InputLabelProps={{
      //     shrink: true,
      //   }}
      //   {...props.register("email", {
      //     required: "This is required",
      //     pattern: {
      //       value:
      //         /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      //       message: "Invalid email address format",
      //     },
      //   })}
      //   id="email-address"
      //   label="Email *"
      //   variant="standard"
      // />

      <StandardTextField
        label="Email *"
        register={props.register}
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
    return (
      // <TextField
      //   margin="normal"
      //   fullWidth
      //   InputLabelProps={{
      //     shrink: true,
      //   }}
      //   InputProps={{
      //     endAdornment: (
      //       <InputAdornment position="end">
      //         <IconButton
      //           children={
      //             passVisible ? <VisibilityOffIcon /> : <VisibilityIcon />
      //           }
      //           onClick={togglePass}
      //         />
      //       </InputAdornment>
      //     ),
      //   }}
      //   {...props.register("password", {
      //     required: "This is required",
      //     minLength: {
      //       value: 8,
      //       message: "Password length needs to be at least 8.",
      //     },
      //   })}
      //   id="password"
      //   label="Password *"
      //   type={passVisible ? "text" : "password"}
      //   variant="outlined"
      // />

      <PasswordTextField
        register={props.register}
        fieldName="password"
        id="password"
        label="Password *"
        validators={{
          minLength: (value) => {
            return (
              value.length > 8 || "Password length needs to be at least 8."
            );
          },
        }}
        passVisible={passVisible}
        togglePass={togglePass}
      />
    );
  }

  //confirm text field
  function ConfirmPassword() {
    return (
      // <TextField
      //   margin="normal"
      //   fullWidth
      //   InputLabelProps={{
      //     shrink: true,
      //   }}
      //   InputProps={{
      //     endAdornment: (
      //       <InputAdornment position="end">
      //         <IconButton
      //           children={
      //             confirmPassVisible ? (
      //               <VisibilityOffIcon />
      //             ) : (
      //               <VisibilityIcon />
      //             )
      //           }
      //           onClick={toggleConfirmPass}
      //         />
      //       </InputAdornment>
      //     ),
      //   }}
      //   {...props.register("confirmPassword", {
      //     required: "This is required",
      //     validate: {
      //       matchesPassword: (value) => {
      //         return (
      //           value === props.getValues("password") ||
      //           "Does not match password."
      //         );
      //       },
      //     },
      //   })}
      //   id="confirm-password"
      //   label="Confirm Password *"
      //   type={confirmPassVisible ? "text" : "password"}
      //   variant="outlined"
      // />
      <PasswordTextField
        register={props.register}
        fieldName="confirmPassword"
        id="confirm-password"
        label="Confirm Password *"
        validators={{
          matchesPassword: (value) => {
            return (
              value === props.getValues("password") ||
              "Does not match password."
            );
          },
        }}
        passVisible={confirmPassVisible}
        togglePass={toggleConfirmPass}
      />
    );
  }

  //countries/states select
  function CountriesAndStatesSelect() {
    //update form values when selected country/state changes
    useEffect(() => {
      props.setValue("country", selectedCountry);
      props.setValue("state", selectedState);
    });

    //country select
    const CountriesSelect = () => {
      return (
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
      );
    };

    //State select
    const StatesSelect = () => {
      return (
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
      );
    };

    return (
      <Grid
        container
        justifyContent="center"
        columnSpacing={4}
        style={rowStyle}
      >
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
}
