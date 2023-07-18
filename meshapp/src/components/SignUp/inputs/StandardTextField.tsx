import { UseFormRegister } from "react-hook-form";
import { IFormInput } from "../SignUp";
import { TextField } from "@mui/material";

//for text-only textfields
//takes in booleans representing if this is required to fill out, if this is multiline or not
//if multiline the max number of rows can be passed in
//takes in label, id, and the form field name of the intended form field
//can also pass in validator functions

export default function StandardTextField(props: {
  register: UseFormRegister<IFormInput>;
  required?: boolean;
  label: string;
  id: string;
  multiline?: boolean;
  maxRows?: number;
  defaultValue?: string;
  fieldName:
    | "label"
    | "title"
    | "name"
    | "email"
    | "location"
    | "firstName"
    | "lastName"
    | "nickName"
    | "phoneNumber";
  validators?: { [key: string]: (value: string) => boolean | string };
}) {
  return (
    <TextField
      margin="normal"
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
      label={props.label}
      id={props.id}
      multiline={props.multiline ? true : false}
      maxRows={props.maxRows ? props.maxRows : 1}
      {...props.register(props.fieldName, {
        required: props.required ? "This is required." : false,
        validate: props.validators,
      })}
    />
  );
}
