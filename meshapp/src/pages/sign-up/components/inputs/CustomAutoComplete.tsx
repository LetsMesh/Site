import {
  Autocomplete,
  Grid,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { IFormInput } from "../..";
import ErrorIcon from "@mui/icons-material/Error";

//takes in boolean stating whether its required or not,
//strings for label and id,
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
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext<IFormInput>();

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
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <InputAdornment position="start">
                        {errors[args.fieldName] && (
                          <Tooltip
                            disableFocusListener
                            disableTouchListener
                            arrow
                            title={
                              <span
                                style={{
                                  whiteSpace: "pre-line",
                                  textAlign: "center",
                                }}
                              >
                                {errors[args.fieldName]?.message}
                              </span>
                            }
                          >
                            <ErrorIcon color="error" />
                          </Tooltip>
                        )}
                      </InputAdornment>
                      {params.InputProps.startAdornment}
                    </>
                  ),
                }}
              />
            )}
            onChange={(_, data) => {
              field.onChange(data);
              //if there's error, trigger validation
              if (errors[args.fieldName]) {
                trigger(args.fieldName);
              }
            }}
          />
        )}
      />
    </Grid>
  );
}
