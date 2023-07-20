import { Controller, useFormContext } from "react-hook-form";
import { IFormInput } from "../SignUp";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

const menuStyle = { style: { maxHeight: 200 } };

//takes in a field name, boolean for whether its required or not, label, id, list of options to display, a callback, and validator rules
export default function CustomSelect(args: {
  fieldName: "country" | "state";
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
    <Grid sx={{ position: "relative" }}>
      <FormControl fullWidth>
        <InputLabel>{args.label}</InputLabel>
        <Controller
          name={args.fieldName}
          control={control}
          rules={{
            required: args.required ? "This is required" : false,
            validate: args.validators,
          }}
          render={({ field: { onChange, value } }) => (
            <Select
              value={value}
              onChange={(event) => {
                onChange(event);
                if (args.callback !== undefined) {
                  args.callback();
                }
              }}
              onBlur={() => [trigger(args.fieldName)]}
              fullWidth
              size="medium"
              label={args.label}
              id={args.id}
              MenuProps={menuStyle}
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

      {errors[args.fieldName] && (
        <Tooltip
          disableFocusListener
          disableTouchListener
          arrow
          title={errors[args.fieldName]?.message}
          sx={{
            position: "absolute",
            top: "-13px",
            left: "-13px",
          }}
        >
          <ErrorIcon color="error" />
        </Tooltip>
      )}
    </Grid>
  );
}
