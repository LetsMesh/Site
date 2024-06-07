import { useFormContext } from "react-hook-form";
import { Grid, Divider, Typography, FormGroup } from "@mui/material";

import { IFormInput } from "..";
import { useState } from "react";
import CustomStandardTextField from "./inputs/CustomStandardTextField";
import CustomPasswordTextField from "./inputs/CustomPasswordTextField";
import CustomCheckbox from "./inputs/CustomCheckBox";
import CustomSelect from "./inputs/CustomSelect";
const informationSectionStyle = {
  paddingTop: 15,
  paddingBottom: 15,
};

const rowStyle = {
  paddingTop: 15,
  paddingBottom: 15,
};

//dummy data for location selects
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

export default function StepOne() {
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

//error messages
const INVALID_PHONE_NUMBER_FORMAT =
  "Invalid phone number format. \n Examples of valid phone numbers:\n123-456-7890\n(123) 456-7890\n123 456 7890\n123.456.7890\n+91 (123) 456-7890";
const INVALID_EMAIL_FORMAT =
  "Invalid email address format.\n Examples of valid email addresses:\nbob123@gmail.com\nhello@bing.email.com";
const PASSWORD_LENGTH_TOO_SMALL = "Password length needs to be at least 8.";
const PASSWORDS_DONT_MATCH = "Does not match password.";
const WRONG_STATE = "This state does not belong to this country.";

//error regexes
const PHONE_NUMBER_REGEX = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
const EMAIL_ADDRESS_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//first name text field
function FirstName() {
  return (
    <CustomStandardTextField
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
    <CustomStandardTextField
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
    <CustomStandardTextField
      label="Nickname"
      id="nickname"
      fieldName="nickName"
    />
  );
}

//phone number text field

function PhoneNumber() {
  return (
    <CustomStandardTextField
      label="Phone Number"
      id="phone-number"
      fieldName="phoneNumber"
      validators={{
        pattern: (value) => {
          return PHONE_NUMBER_REGEX.test(value) || INVALID_PHONE_NUMBER_FORMAT;
        },
      }}
    />
  );
}

//email address text field
function EmailAddress() {
  return (
    <CustomStandardTextField
      label="Email *"
      id="email-address"
      fieldName="email"
      validators={{
        pattern: (value) => {
          return EMAIL_ADDRESS_REGEX.test(value) || INVALID_EMAIL_FORMAT;
        },
      }}
    />
  );
}

//password text field
function Password() {
  return (
    <CustomPasswordTextField
      fieldName="password"
      id="password"
      label="Password *"
      validators={{
        minLength: (value) => {
          return value.length >= 8 || PASSWORD_LENGTH_TOO_SMALL;
        },
      }}
    />
  );
}

//confirm text field
function ConfirmPassword() {
  const props = useFormContext<IFormInput>();
  return (
    <CustomPasswordTextField
      fieldName="confirmPassword"
      id="confirm-password"
      label="Confirm Password *"
      validators={{
        matchesPassword: (value) => {
          return value === props.getValues("password") || PASSWORDS_DONT_MATCH;
        },
      }}
    />
  );
}

//Terms and Conditions checkbox
function TermsAndConditions() {
  return (
    <CustomCheckbox
      required={true}
      label={"* I Accept the Terms & Conditions"}
      id="accepted-terms-and-conditions"
      fieldName="acceptedTermsConditions"
    />
  );
}
// email update checkbox
function EmailUpdates() {
  return (
    <CustomCheckbox
      label={"* Yes! Sign me up for annoying emails"}
      id="email-updates"
      fieldName="emailUpdates"
    />
  );
}
//countries/states select
function CountriesAndStatesSelect() {
  const props = useFormContext<IFormInput>();

  //keep track of which option we're on
  const [stateOptions, setStateOptions] = useState(
    CountriesAndStates[props.getValues("country")] || []
  );
  return (
    <Grid
      container
      justifyContent="center"
      columnSpacing={4}
      rowGap={3}
      style={rowStyle}
    >
      <Grid item xs={12} sm={6}>
        <CustomSelect
          fieldName="country"
          required={true}
          id={"country"}
          label="Country"
          options={Object.keys(CountriesAndStates)}
          callback={() => {
            setStateOptions(CountriesAndStates[props.getValues("country")]);
            props.resetField("state");
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomSelect
          fieldName="state"
          required={true}
          id={"state"}
          label="State"
          options={stateOptions}
          validators={{
            validState: (value) => {
              return (
                CountriesAndStates[props.getValues("country")].includes(
                  value
                ) || WRONG_STATE
              );
            },
          }}
        />
      </Grid>
    </Grid>
  );
}
