import { Autocomplete, Typography, InputBase, Tooltip } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";

function ProfileAccordionComboBox(props: {
  disabled: boolean;
  options: Array<string>;
  placeholderText: string;
  onChange: (
    event: SyntheticEvent<Element, Event>,
    newValue: string | null
  ) => void;
  value: string;
  errValidations: Array<(value: string) => boolean | string>;
}) {
  //keeps track of whether we show error or not
  const [hasError, setHasError] = useState(false);

  //displays error
  const showError = () => setHasError(true);

  //hide error
  const hideError = () => setHasError(false);

  //keeps track of current error message
  const [errorMessage, setErrorMessage] = useState("");

  //shows current user choice
  const [curChoice, setCurChoice] = useState(props.value);
  return (
    <Autocomplete
      value={curChoice}
      onChange={(event, newValue) => {
        //if new value is string
        if (typeof newValue === "string") {
          //shows current user choice (wont reflect actual data if there's an error)
          setCurChoice(newValue);

          //goes through all of the error validations, returns the first error message or true if valid for all 
          let errResult = props.errValidations.reduce(
            (prevResult: boolean | string, curErrVal) => {
              //if previous result was true, continue validating
              if (prevResult && typeof prevResult !== "string") {
                return curErrVal(newValue);
              }
              //if it isn't, then return the previous result, which is the error message
              else {
                return prevResult;
              }
            },
            true
          );

          //if error validation result is true, then the value is valid and we can continue on to change data
          //otherwise we need to display error and error message

          if (errResult && typeof errResult !== "string") {
            hideError();
          } else {
            setErrorMessage(errResult as string);
            showError();
            return;
          }
        }
        //if error function throws error, then display error and stop here
        //otherwise continue on to change data
        props.onChange(event, newValue);
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={props.options}
      freeSolo
      fullWidth
      readOnly={props.disabled}
      disabled={props.disabled}
      renderOption={(props, option) => (
        <Typography {...props}> {option} </Typography>
      )}
      renderInput={(params) => {
        const { InputLabelProps, InputProps, ...rest } = params;

        return (
          <InputBase
            {...params.InputProps}
            startAdornment={
              hasError && (
                <Tooltip
                  disableFocusListener
                  disableTouchListener
                  arrow
                  title={errorMessage}
                  placement="top"
                >
                  <ErrorIcon color="error" />
                </Tooltip>
              )
            }
            {...rest}
            placeholder={props.placeholderText}
          />
        );
      }}
    />
  );
}

export default ProfileAccordionComboBox;
