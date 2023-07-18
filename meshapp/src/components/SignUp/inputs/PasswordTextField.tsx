import { UseFormRegister } from "react-hook-form";
import { IFormInput } from "../SignUp";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

//For the password textfields
//is required to be filled out in form
//needs an external state of whether the password is visible or not
//and the function to toggle that visibility
//takes in label, id, and the form field name of the intended password text field
//can also pass in validator functions

export default function PasswordTextField(props: {
  register: UseFormRegister<IFormInput>;
  label: string;
  id: string;
  fieldName: "password" | "confirmPassword";
  validators?: { [key: string]: (value: string) => boolean | string };
  passVisible: boolean;
  togglePass: () => void;
}) {
  return (
    <TextField
      margin="normal"
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              children={
                props.passVisible ? <VisibilityOffIcon /> : <VisibilityIcon />
              }
              onClick={props.togglePass}
            />
          </InputAdornment>
        ),
      }}
      {...props.register(props.fieldName, {
        required: "This is required",
        validate: props.validators,
      })}
      id={props.id}
      label={props.label}
      type={props.passVisible ? "text" : "password"}
      variant="outlined"
    />
  );
}
