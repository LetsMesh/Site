import {
  Autocomplete,
  Typography,
  InputBase,
  Tooltip,
  createFilterOptions,
  FilterOptionsState,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { VisualState } from "framer-motion";

//for displaying a label for options and a corresponding value to store
export type option = {
  value: string;
  label: string;
};

/**
 * A React component that provides a combobox that allows the user to select from a list of options or insert a custom option
 * Includes custom error handling
 *
 * Used in Profile Accordion (src/profile/profile-accordion.tsx)
 *
 * @param props - Properties of the component
 * @param {boolean} props.disabled - represents whether this accordion's inputs are disabled or not
 * @param {Array<string>} props.options - stores the list of options to be provided for the combobox
 * @param {string} placeholderText - placeholder for combobox
 * @param {function} onChange -callback to handle onChange to edit group accordion data for this specific combobox
 * @param {string} value - the current value of this specific combobox for this accordion within the group accordion's state data
 * @param {Array<function>} errValidations - an array of functions to evaluate the current value for errors (takes in the string value as a parameter, returns True if there was no error or the error message if there is)
 *
 */
export function ProfileAccordionComboBox(props: {
  disabled: boolean;
  options: Array<string>;
  placeholderText: string;
  onChange: (
    event: SyntheticEvent<Element, Event>,
    newValue: string | null | option
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

  //create filter method based on option type
  const filter = createFilterOptions<option>();

  //format the provided list of options into the option type
  const options: Array<option> = props.options.map((ele) => {
    return {
      value: ele,
      label: ele,
    };
  });

  //onChange handler
  const onChangeHandler = (
    event: SyntheticEvent<Element, Event>,
    val: string | option | null
  ) => {
    let newValue: string;
    if (val === null) {
      newValue = "";
    } else if (typeof val === "string") {
      newValue = val;
    } else {
      newValue = val.value;
    }

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

    props.onChange(event, newValue);
  };

  //handler for filtering based on input value, which will return a custom option to add if it doesn't exist
  const filterOptionHandler = (
    options: Array<option>,
    params: FilterOptionsState<option>
  ) => {
    const filtered = filter(options, params);
    const { inputValue } = params;
    const isExisting = options.some((option) => inputValue === option.label);
    if (inputValue !== "" && !isExisting) {
      filtered.push({ value: inputValue, label: `Add "${inputValue}"` });
    }

    return filtered;
  };

  return (
    <Autocomplete
      value={curChoice}
      onChange={onChangeHandler}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={options}
      freeSolo
      fullWidth
      readOnly={props.disabled}
      disabled={props.disabled}
      filterOptions={filterOptionHandler}
      renderOption={(props, option) => (
        <Typography {...props}> {option.label} </Typography>
      )}
      renderInput={(params) => {
        const { InputLabelProps, InputProps, ...rest } = params;

        return (
          <InputBase
            {...params.InputProps}
            startAdornment={
              // Conditionally renders error tooltip if there is error
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
