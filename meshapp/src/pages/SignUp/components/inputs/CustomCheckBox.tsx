import { Controller, useFormContext } from "react-hook-form";
import { IFormInput } from "../..";
import { Checkbox, FormControlLabel, Grid, Tooltip } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

//takes in boolean for whether it is required or not,
//string for label, id, and field name
export default function CustomCheckbox(args: {
  required?: boolean;
  label: string;
  id: string;
  fieldName: "acceptedTermsConditions" | "emailUpdates";
}) {
  const { control, formState, trigger } = useFormContext<IFormInput>();
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
                  //trigger validation if there's error
                  if (errors[args.fieldName]) {
                    trigger(args.fieldName);
                  }
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
          title={
            <span style={{ whiteSpace: "pre-line", textAlign: "center" }}>
              {errors[args.fieldName]?.message}
            </span>
          }
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
