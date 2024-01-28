import {
  Stack,
  Typography,
  Button,
  FormControlLabel,
  Box,
  useTheme,
} from "@mui/material";
import CustomThemeSwitch from "./CustomThemeSwitch";
import { useAccountContext } from "../../../contexts/UserContext";
import { useThemeContext } from "../../../themes/ThemeContextProvider";

const AppearanceSetting = () => {
  const { account } = useAccountContext();
  const theme = useTheme();
  const colorMode = useThemeContext();

  if (!account) return null;
  return (
    <>
      <div>
        <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
          Theme
        </Typography>
        <FormControlLabel
          control={
            <CustomThemeSwitch
              sx={{ m: 1 }}
              checked={theme.palette.mode === "dark"}
              onChange={colorMode.toggleThemeMode}
            />
          }
          label={
            <Typography sx={{ textTransform: "capitalize" }}>
              {theme.palette.mode}
            </Typography>
          }
        />
      </div>
    </>
  );
};

export default AppearanceSetting;
