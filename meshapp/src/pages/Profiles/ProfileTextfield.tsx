import { useState } from "react";
import {
  TextField,
  Box,
  TextFieldVariants,
  SxProps,
  Theme,
  useTheme,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

/**
 * A React component that renders a text field with editing capabilities.
 * Includes a character limit and an edit/save mode toggle.
 *
 * Used in the Profile page (src/profile/profile-page.tsx).
 *
 * @param props - Properties of the component
 * @param {string} props.label - The label
 * @param {string} props.placeholder - The placeholder text
 * @param {string} props.text - The initial text content
 * @param {number} props.charLimit - The max number of characters allowed
 * @param {function} props.handleSave - Callback to save data
 * @param {TextFieldVariants | undefined} props.variant - the variant of the textfield, default is standard
 * @param {boolean} props.viewOnly - whether profile is view only or not
 */
const ProfileTextField = (props: {
  label: string;
  placeholder: string;
  text: string;
  charLimit: number;
  handleSave: (text: string) => void;
  variant?: TextFieldVariants | undefined;
  viewOnly?: boolean | undefined;
}) => {
  const [text, setText] = useState(props.text);
  const [editMode, setEditMode] = useState(false);

  // Enforce developer-defined character limit
  const handleTextChange = (event: any) => {
    if (event.target.value.length > props.charLimit) return;
    setText(event.target.value);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
    props.handleSave(text);
  };

  const theme = useTheme();
  const viewOnlyStyles: SxProps<Theme> | undefined = props.viewOnly
    ? {
        "& .MuiInputBase-root.MuiOutlinedInput-root": {
          color: "text.primary",
          WebkitTextFillColor: "text.primary",
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-disabled fieldset": {
            borderColor: "input.borderActive",
          },
        },
        "& .MuiInputBase-input.Mui-disabled": {
          WebkitTextFillColor: theme.palette.text.primary,
        },
        "& .MuiFormLabel-root": {
          color: "text.secondary",
        },
      }
    : {
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
          "& .Mui-disabled": {
            WebkitTextFillColor: "text.main",
          },
        },
      };

  return (
    <TextField
      label={props.label}
      placeholder={props.placeholder}
      InputLabelProps={{ shrink: true }}
      variant={props.variant ? props.variant : "standard"}
      InputProps={{
        endAdornment:
          !props.viewOnly &&
          (editMode ? (
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
          )),
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
      sx={viewOnlyStyles}
    />
  );
};

export default ProfileTextField;
