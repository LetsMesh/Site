import { Controller, useFormContext } from "react-hook-form";
import { IFormInput } from "../SignUp";
import {
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ErrorIcon from "@mui/icons-material/Error";
import { useState } from "react";

//For the password textfields
//is required to be filled out in form
//additionally has an icon button for determining whether password text is visible or not
//takes in label, id, and the form field name of the intended password text field
//can also pass in validator functions

export default function PasswordTextField(props: {
  label: string;
  id: string;
  fieldName: "password" | "confirmPassword";
  validators?: { [key: string]: (value: string) => boolean | string };
}) {
  const { control, formState } = useFormContext<IFormInput>();
  const errors = formState.errors;
  //for toggling password text visibility
  const [passVisible, setPassVisible] = useState(false);
  const togglePass = () => setPassVisible(!passVisible);
  return (
    <Grid sx={{ position: "relative" }}>
      <Controller
        name={props.fieldName}
        control={control}
        rules={{
          required: "This is required.",
          validate: props.validators,
        }}
        render={({ field, formState }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    children={
                      passVisible ? <VisibilityOffIcon /> : <VisibilityIcon />
                    }
                    onClick={togglePass}
                  />
                </InputAdornment>
              ),
            }}
            type={passVisible ? "text" : "password"}
            label={props.label}
            id={props.id}
          />
        )}
      />

      {errors[props.fieldName] ? (
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
      ) : null}
    </Grid>
  );
}
