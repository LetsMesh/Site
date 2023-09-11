import { EditOutlined } from "@mui/icons-material";
import { Autocomplete, Typography, TextField } from "@mui/material";
import { SyntheticEvent } from "react";

function ProfileAccordionComboBox(props: {
  disabled: boolean;
  options: Array<string>;
  placeholderText: string;
  onChange: (
    event: SyntheticEvent<Element, Event>,
    newValue: string | null
  ) => void;
  value: string;
}) {
  return (
    <Autocomplete
      value={props.value}
      onChange={props.onChange}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={props.options}
      freeSolo
      readOnly={props.disabled}
      renderOption={(props, option) => (
        <Typography {...props}> {option} </Typography>
      )}
      renderInput={(params) => <TextField {...params} />}
      placeholder={props.placeholderText}
    />
  );
}

export default ProfileAccordionComboBox;
