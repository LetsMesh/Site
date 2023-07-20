import { Autocomplete, Grid, TextField, Tooltip } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { IFormInput } from "../SignUp";
import ErrorIcon from "@mui/icons-material/Error";

//takes in boolean stating whether its required or not,
//strings for lable and id,
//an optional default value
//the array of options
//a field name
//and validator rules
export default function CustomAutoComplete(args: {
  required?: boolean;
  label: string;
  id: string;
  defaultValue?: Array<string>;
  options: Array<string>;
  fieldName: "interests";
  validators?: { [key: string]: (value: Array<string>) => boolean | string };
}) {
  const { control, formState } = useFormContext<IFormInput>();

  return (
    <Grid sx={{ position: "relative" }}>
      <Controller
        name={args.fieldName}
        control={control}
        rules={{
          required: args.required ? "This is required." : false,
          validate: args.validators,
        }}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={args.options}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            id={args.id}
            multiple
            defaultValue={args.defaultValue ? args.defaultValue : []}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label={args.label}
                sx={{}}
              />
            )}
            onChange={(_, data) => field.onChange(data)}
          />
        )}
      />

      {formState.errors[args.fieldName] && (
        <Tooltip
          disableFocusListener
          disableTouchListener
          arrow
          title={formState.errors[args.fieldName]?.message}
          sx={{
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "-30px",
          }}
        >
          <ErrorIcon color="error" />
        </Tooltip>
      )}
    </Grid>
  );
}
