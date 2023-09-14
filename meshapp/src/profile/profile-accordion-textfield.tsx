import React, { useState } from "react";
import { TextField, Box } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useGroupAccordContext } from "./profile-group_accordion";

/**
 * A React component that renders a text field with editing capabilities.
 * Includes a character limit and an edit/save mode toggle, will use context from
 * parent to access and set state
 *
 * Used in the Profile Page Accordion .
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
}) => {
  //grab context
  const GroupAccordContext = useGroupAccordContext();
  const groupState = GroupAccordContext.groupState;
  const setGroupState = GroupAccordContext.setGroupState;

  //text from group state
  const text = groupState[props.accordionIndex].descText;

  //used to set edit mode
  const [editMode, setEditMode] = useState(false);

  // Enforce developer-defined character limit
  const handleTextChange = (event: any) => {
    if (event.target.value.length > props.charLimit) return;
    setGroupState(
      groupState.map((profileAccordion, index) => {
        if (index === props.accordionIndex) {
          return {
            headerOne: profileAccordion.headerOne,
            headerTwo: profileAccordion.headerTwo,
            descText: event.target.value,
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

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
  };

  return (
    <TextField
      label={props.label}
      placeholder={props.placeholder}
      InputLabelProps={{ shrink: true }}
      InputProps={{
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
      value={text}
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
          }
        },
      }}
    />
  );
};

export default ProfileAccordionTextField;
