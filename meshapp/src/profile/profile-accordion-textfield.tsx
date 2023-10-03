import React, { ChangeEvent, useState } from "react";
import { TextField, Box, Tooltip } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useGroupAccordContext } from "./profile-group_accordion";
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
 * @param {string} props.text - The initial text content
 * @param {number} props.charLimit - The max number of characters allowed
 * @param {number} props.key - The index of the current Profile Accordion
 */
const ProfileAccordionTextField = (props: {
  label: string;
  placeholder: string;
  text: string;
  charLimit: number;
  accordionIndex: number;
  errorValidation: Array<(value: string) => boolean | string>;
}) => {
  //grab context
  const GroupAccordContext = useGroupAccordContext();
  const groupState = GroupAccordContext.groupState;
  const setGroupState = GroupAccordContext.setGroupState;

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
    let errResult = props.errorValidation.reduce(
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
    //otherwise display the error
    else {
      setErrorMessage(errResult as string);
      showError();
      return;
    }
    //edit description for corresponding accordion, copy the rest
    setGroupState(
      groupState.map((profileAccordion, index) => {
        if (index === props.accordionIndex) {
          return {
            headerOne: profileAccordion.headerOne,
            headerTwo: profileAccordion.headerTwo,
            descText: newText,
          };
        }
        return {
          headerOne: profileAccordion.headerOne,
          headerTwo: profileAccordion.headerTwo,
          descText: profileAccordion.descText,
        };
      })
    );
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
  const [text, setText] = useState(groupState[props.accordionIndex].descText);
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
