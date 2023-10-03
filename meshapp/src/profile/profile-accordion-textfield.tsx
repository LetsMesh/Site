import { ChangeEvent, useState } from "react";
import { TextField, Box, Tooltip } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ErrorIcon from "@mui/icons-material/Error";

/**
 * A React component that renders a text field with editing capabilities.
 * Includes a character limit and an edit/save mode toggle, will use context from
 * parent to access and set state.
 *
 * Used in the Profile Page Accordion (src/profile/profile-accordion.tsx)
 *
 * @param props - Properties of the component
 * @param {string} props.label - The label
 * @param {string} props.placeholder - The placeholder text
 * @param {string} props.text - The state text value from the group accordion state for the corresponding description
 * @param {number} props.charLimit - The max number of characters allowed
 * @param {number} props.accordionIndex - The index of the current Profile Accordion
 * @param {function} props.onChange - function that takes in a new text value to change the corresponding state entry
 * @param {Array<function>} props.errValidations - an array of functions to evaluate the current value for errors (takes in the string value as a parameter, returns True if there was no error or the error message if there is)
 */
const ProfileAccordionTextField = (props: {
  label: string;
  placeholder: string;
  text: string;
  charLimit: number;
  accordionIndex: number;
  onChange: (newValue: string) => void;
  errValidations: Array<(value: string) => boolean | string>;
}) => {
  //used to set edit mode
  const [editMode, setEditMode] = useState(false);

  //handles onChange event for text
  const handleTextChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newText = event.target.value;
    //set the text to be displayed
    setText(newText);
    //go through error validation rules, if there are errors then save the first message
    let errResult = props.errValidations.reduce(
      (prevResult: boolean | string, curErrVal) => {
        if (prevResult && typeof prevResult !== "string") {
          return curErrVal(newText);
        } else {
          return prevResult;
        }
      },
      true
    );
    //if there's no error then hide it
    if (errResult && typeof errResult !== "string") {
      hideError();
    }
    //otherwise display the error and stop
    else {
      setErrorMessage(errResult as string);
      showError();
      return;
    }
    //at this point there are no more errors
    props.onChange(newText);
  };

  //for toggling edit mode
  const handleEditClick = () => {
    setEditMode(true);
  };
  const handleSaveClick = () => {
    setEditMode(false);
  };

  //for toggling whether to display error or not
  const [hasError, setHasError] = useState(false);
  const showError = () => setHasError(true);
  const hideError = () => setHasError(false);

  //for storing the error message
  const [errorMessage, setErrorMessage] = useState("");
  const [text, setText] = useState(props.text);
  return (
    <TextField
      value={text}
      label={props.label}
      placeholder={props.placeholder}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        //conditionally renders error tooltip based on error
        startAdornment: hasError && (
          <Tooltip
            disableFocusListener
            disableTouchListener
            arrow
            title={errorMessage}
            placement="top"
          >
            <ErrorIcon color="error" />
          </Tooltip>
        ),
        //conditionally renders edit/save icons based on edit mode
        endAdornment: editMode ? (
          <Box paddingLeft={2}>
            <SaveIcon
              color="primary"
              onClick={handleSaveClick}
              sx={{
                "&:hover": {
                  color: "#0A6B57",
                },
                cursor: "pointer",
                transition: "color 0.15s ease-in-out",
              }}
            />
          </Box>
        ) : (
          <Box paddingLeft={2}>
            <EditIcon
              onClick={handleEditClick}
              sx={{
                "&:hover": {
                  color: "#0b7d66",
                },
                cursor: "pointer",
                transition: "color 0.15s ease-in-out",
              }}
            />
          </Box>
        ),
        readOnly: !editMode,
        inputProps: {
          style: { fontSize: 15, caretColor: "#0b7d66" },
        },
      }}
      type="text"
      maxRows={3}
      fullWidth
      multiline
      disabled={!editMode}
      onChange={handleTextChange}
      variant="standard"
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            transition: "border 0.10s ease-in-out",
          },
          "&.Mui-focused fieldset": {
            borderColor: "primary.main",
          },
          "&:not(.Mui-disabled):hover fieldset": {
            borderColor: "primary.main",
          },
        },
      }}
    />
  );
};

export default ProfileAccordionTextField;
