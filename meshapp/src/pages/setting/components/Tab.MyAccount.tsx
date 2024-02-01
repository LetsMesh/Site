import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useAccountContext } from "../../../contexts/UserContext";
import { FC } from "react";
import {
  Security as SecurityIcon,
  Lock,
  LockOpen,
  GppMaybe,
  Verified,
} from "@mui/icons-material";
import ChangePasswordButton from "./ChangePasswordButton";

const MyAccountSetting = () => {
  const { account } = useAccountContext();
  const theme = useTheme();

  if (!account) return null;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "4px",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
            My Account
          </Typography>
          {account.settings.isVerified ? (
            <Verified color="primary" />
          ) : (
            <GppMaybe color="error" />
          )}
        </div>
        <AccountInfo title={"Email"} value={account.email} />
        <AccountInfo title={"Phone Number"} value={account.phoneNum} />
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
          Password and Authentication
        </Typography>
        <Box>
          <Typography
            sx={{
              textTransform: "uppercase",
              color: account.settings.is2FAEnabled
                ? theme.palette.success.dark
                : theme.palette.error.dark,
              fontSize: "12px",
              mb: "6px",
              fontWeight: "600",
            }}
          >
            <div style={{ display: "flex", gap: 1 }}>
              {account.settings.is2FAEnabled ? (
                <>
                  <Lock />
                  Multi-factor Authentication Enabled
                </>
              ) : (
                <>
                  <LockOpen />
                  Multi-factor Authentication Disabled
                </>
              )}
            </div>
          </Typography>
          <ChangePasswordButton />
        </Box>
        <Box>
          <Typography
            sx={{
              textTransform: "uppercase",
              color: "text.secondary",
              fontSize: "12px",
              mb: "6px",
              fontWeight: "600",
            }}
          >
            <div style={{ display: "flex", gap: 1 }}>
              <SecurityIcon />
              Authentication
            </div>
          </Typography>
          <Button
            variant="contained"
            color="info"
            size="small"
            sx={{
              textTransform: "none",
            }}
          >
            Enable Multi-factor Authentication
          </Button>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
          Account Removal
        </Typography>
        <Typography sx={{ fontSize: "12px" }}>
          Disabling your account means you can recover it at anytime after
          taking this action
        </Typography>
        <Box display={"flex"} gap={1}>
          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{
              textTransform: "none",
            }}
          >
            Disable Account
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            sx={{
              textTransform: "none",
            }}
          >
            Delete Account
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default MyAccountSetting;

interface AccountInfoProps {
  title: String;
  value: String;
}
const AccountInfo: FC<AccountInfoProps> = ({ title, value }) => {
  return (
    <Box display={"flex"} justifyContent={"space-between"}>
      <div>
        <Typography
          sx={{
            textTransform: "uppercase",
            color: "text.secondary",
            fontSize: "12px",
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ fontSize: "11px" }}>{value}</Typography>
      </div>
      <div>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            padding: "2px 8px",
            bgcolor: "grey",
            ":hover": {
              bgcolor: "darkgray",
            },
          }}
          size="small"
        >
          Edit
        </Button>
      </div>
    </Box>
  );
};
