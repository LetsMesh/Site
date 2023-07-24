import { Controller, useFormContext } from "react-hook-form";
import { IFormInput } from "../SignUp";
import { InputAdornment, TextField, Tooltip } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

//for text-only textfields
//takes in booleans representing if this is required to fill out, if this is multiline or not
//if multiline the max number of rows can be passed in
//takes in label, id, and the form field name of the intended form field
//can also pass in validator functions

export default function CustomStandardTextField(args: {
  required?: boolean;
  label: string;
  id: string;
  multiline?: boolean;
  maxRows?: number;
  fieldName:
    | "label"
    | "title"
    | "name"
    | "email"
    | "location"
    | "firstName"
    | "lastName"
    | "nickName"
    | "phoneNumber"
    | "pronouns";
  validators?: { [key: string]: (value: string) => boolean | string };
}) {
  const { formState, control } = useFormContext<IFormInput>();
  const errors = formState.errors;

  return (
    <Controller
      name={args.fieldName}
      control={control}
      rules={{
        required: args.required ? "This is required." : false,
        validate: args.validators,
      }}
      render={({ field }) => (
        <TextField
          {...field}
          margin="normal"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          label={args.label}
          id={args.id}
          multiline={args.multiline ? true : false}
          maxRows={args.maxRows ? args.maxRows : 1}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {errors[args.fieldName] && (
                  <Tooltip
                    disableFocusListener
                    disableTouchListener
                    arrow
                    title={
                      <span
                        style={{ whiteSpace: "pre-line", textAlign: "center" }}
                      >
                        {errors[args.fieldName]?.message}
                      </span>
                    }
                  >
                    <ErrorIcon color="error" />
                  </Tooltip>
                )}
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
