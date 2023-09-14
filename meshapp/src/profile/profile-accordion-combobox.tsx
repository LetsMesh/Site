import { Autocomplete, Typography, InputBase } from "@mui/material";
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
      fullWidth
      readOnly={props.disabled}
      disabled={props.disabled}
      renderOption={(props, option) => (
        <Typography {...props}> {option} </Typography>
      )}
      renderInput={(params) => {
        const { InputLabelProps, InputProps, ...rest } = params;

      return (<InputBase {...params.InputProps} {...rest} placeholder={props.placeholderText}   />)
    
      }}
     
      sx={{ "& .MuiTextField-root":{
        borderRadius: 0
      }}}
    />
  );
}

export default ProfileAccordionComboBox;
