import { Controller, useFormContext } from "react-hook-form";
import { IFormInput } from "../SignUp";
import { Checkbox, FormControlLabel, Grid, Tooltip } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

export default function CheckBoxInput(args: {
  required?: boolean;
  label: string;
  id: string;
  fieldName: "acceptedTermsConditions" | "emailUpdates";
}) {
  const { control, formState } = useFormContext<IFormInput>();
  const errors = formState.errors;

  return (
    <Grid sx={{ position: "relative" }}>
      <FormControlLabel
        control={
          <Controller
            name={args.fieldName}
            control={control}
            render={({ field: props }) => (
              <Checkbox
                {...props}
                checked={props.value}
                onChange={(e) => {
                  props.onChange(e.target.checked);
                }}
              />
            )}
            rules={{ required: args.required ? "This is required" : false }}
          />
        }
        label={args.label}
      />

      {errors[args.fieldName] && (
        <Tooltip
          disableFocusListener
          disableTouchListener
          arrow
          title={errors[args.fieldName]?.message}
          sx={{
            position: "absolute",
            top: "0px",
            bottom: "0px",
            marginTop: "auto",
            marginBottom: "auto",
            left: "-30px",
          }}
        >
          <ErrorIcon color="error" />
        </Tooltip>
      )}
    </Grid>
  );
}
