import { Controller, useFormContext } from "react-hook-form";
import { IFormInput } from "../SignUp";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { ChangeEvent } from "react";

const menuStyle = { style: { maxHeight: 200 } };

//takes in a field name, boolean for whether its required or not, label, id, list of options to display, a callback, and validator rules
export default function CustomSelect(args: {
  fieldName: "country" | "state" | "userType";
  required?: boolean;
  label?: string;
  id?: string;
  options?: Array<string>;
  callback?: () => void;
  validators?: { [key: string]: (value: string) => boolean | string };
}) {
  const { control, formState, trigger } = useFormContext<IFormInput>();
  const errors = formState.errors;

  return (
    <Grid sx={{ position: "relative", alignItems: "center" }}>
      <FormControl fullWidth margin="normal">
        <InputLabel shrink={true}>{args.label}</InputLabel>
        <Controller
          name={args.fieldName}
          control={control}
          rules={{
            required: args.required ? "This is required" : false,
            validate: args.validators,
          }}
          render={({ field: { onChange, value } }) => (
            <Select
              displayEmpty
              notched={true}
              value={value}
              onChange={(event) => {
                onChange(event as ChangeEvent<Element>);
                //if there's a callback then call it
                if (args.callback !== undefined) {
                  args.callback();
                }
                //if there is error then trigger validation
                if (errors[args.fieldName]) {
                  trigger(args.fieldName);
                }
              }}
              onBlur={() => [trigger(args.fieldName)]}
              fullWidth
              size="medium"
              label={args.label}
              id={args.id}
              MenuProps={menuStyle}
              renderValue={(value) => (
                <Box sx={{ display: "flex" }}>
                  {errors[args.fieldName] ? (
                    <Tooltip
                      disableFocusListener
                      disableTouchListener
                      arrow
                      title={errors[args.fieldName]?.message}
                    >
                      <ErrorIcon color="error" />
                    </Tooltip>
                  ) : null}
                  {value}
                </Box>
              )}
            >
              {args.options?.map((option, index) => {
                return (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                );
              })}
            </Select>
          )}
        />
      </FormControl>
    </Grid>
  );
}
