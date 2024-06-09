import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  useTheme,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { useAccountContext } from "../../../contexts/UserContext";
import { toast } from "react-toastify";
import { useChangePassword } from "../hooks/useChangePassword";

const ChangePasswordButton = () => {
  const theme = useTheme();
  const { account } = useAccountContext();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { loadingState, changePassword } = useChangePassword();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (!account) return;
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const oldPassword = formData.get("oldPassword");
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    if (!oldPassword || !newPassword) return;
    if (newPassword !== confirmPassword) {
      toast.warning("New passwords do not match.");
      return;
    }

    const success = await changePassword(
      oldPassword.toString(),
      newPassword.toString()
    );

    if (success) {
      handleClose();
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="info"
        size="small"
        sx={{ textTransform: "none" }}
        onClick={handleClickOpen}
      >
        Change Password
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form
          onSubmit={handleSubmit}
          style={{ backgroundColor: theme.palette.secondary.main }}
        >
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To change your password, please enter the required fields.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="oldPassword"
              name="oldPassword"
              label="Old Password"
              type="password"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="newPassword"
              name="newPassword"
              label="New Password"
              type="password"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={loadingState === "loading"}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ChangePasswordButton;
