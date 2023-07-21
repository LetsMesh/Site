import { Controller, useFormContext } from "react-hook-form";
import { IFormInput } from "../SignUp";
import { Grid, TextField, Tooltip } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

//for text-only textfields
//takes in booleans representing if this is required to fill out, if this is multiline or not
//if multiline the max number of rows can be passed in
//takes in label, id, and the form field name of the intended form field
//can also pass in validator functions

export default function CustomStandardTextField(props: {
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
  const { formState, control } = useFormContext<IFormInput>();
  const errors = formState.errors;

  return (
    <Grid sx={{ position: "relative" }}>
      <Controller
        name={props.fieldName}
        control={control}
        rules={{
          required: props.required ? "This is required." : false,
          validate: props.validators,
        }}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            label={props.label}
            id={props.id}
            multiline={props.multiline ? true : false}
            maxRows={props.maxRows ? props.maxRows : 1}
          />
        )}
      />

      {errors[props.fieldName] && (
        <Tooltip
          disableFocusListener
          disableTouchListener
          arrow
          title={errors[props.fieldName]?.message}
          sx={{
            position: "absolute",
            top: "0px",
            left: "-12px",
          }}
        >
          <ErrorIcon color="error" />
        </Tooltip>
      )}
    </Grid>
  );
}
