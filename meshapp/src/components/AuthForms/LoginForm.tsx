import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Link,
  Stack,
  Typography,
  TextField,
  Divider,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GridContainer, GridItem } from "../ui/Grid";
import LoadingProgress from "../ui/LoadingSpinner";
import { ReactComponent as GoogleSvg } from "src/assets/svgs/GoogleLogo.svg";
import { ReactComponent as DiscordSvg } from "src/assets/svgs/DiscordLogo.svg";
import { axiosInstance } from "src/config/axios-config";
import { useLogin } from "src/hooks/use-login";
import { useAccountContext } from "src/contexts/UserContext";
import isError from "src/errors/error-checker";
import axiosErrorHandler from "src/errors/axios-error-handler";

const LoginWindow = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const updateShowForgotPasswordState = () => {
    setShowForgotPassword((prevState) => !prevState);
  };
  return showForgotPassword ? (
    <ForgotPasswordScreen
      updateShowForgotPasswordState={updateShowForgotPasswordState}
    />
  ) : (
    <LoginScreen
      updateShowForgotPasswordState={updateShowForgotPasswordState}
    />
  );
};

export default LoginWindow;

interface ComponentProps {
  updateShowForgotPasswordState: () => void;
}

const LoginScreen = (props: ComponentProps) => {
  const [formData, setFormData] = useState({ user: null, pass: null });
  const { login, isLoading, error } = useLogin();
  const { updateAccount: setAccount } = useAccountContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const navigate = useNavigate();
  const [, setCookie] = useCookies(["user_id"]);
  const handleTwoFactorAuth = async (userAccountID: number) => {
    try {
      await axiosInstance.post("accounts/set-two-factor-auth/", {
        accountID: userAccountID,
      });
      setCookie("user_id", userAccountID, {
        path: "/",
        maxAge: 60,
      });
      navigate("/otp"); // go to the OTP (One Time Password) input field page
    } catch (err) {
      const error = isError(err);
      axiosErrorHandler(
        new Error(
          `A user with id: ${userAccountID} has two factor enabled but the request for sending the One Time Password failed`,
          { cause: error }
        )
      );
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.user && formData.pass) {
      try {
        const response = await login(formData.user, formData.pass);
        if (!response || response.status !== 200) {
          toast.error("Invalid credentials");
          return;
        }

        if (response.data.account?.settings?.is2FAEnabled) {
          await handleTwoFactorAuth(response.data.user_id);
        } else {
          navigate("/");
        }

        setAccount(response.data.account);
      } catch (err) {
        toast.error("Login failed");
      }
    } else {
      toast.error("Invalid credentials");
    }
  };
  useEffect(() => {}, [isLoading]);

  return (
    <GridContainer
      direction="column"
      spacing={2}
      sx={{ alignItems: "center", color: "text.primary" }}
    >
      <GridItem>
        <Typography
          fontSize={"32px"}
          sx={{ fontWeight: "bold", marginLeft: "auto", textAlign: "center" }}
        >
          Login
        </Typography>
      </GridItem>
      <GridItem sx={{ width: "90%" }}>
        <form onSubmit={handleLogin}>
          <Stack spacing={2}>
            <TextField
              id="user"
              type="text"
              onChange={handleChange}
              label="Email"
              color="info"
            />
            <TextField
              id="pass"
              type="password"
              onChange={handleChange}
              label="Password"
              color="info"
            />
            {isLoading ? (
              <LoadingProgress />
            ) : (
              <Button
                variant="contained"
                color="success"
                sx={{
                  width: "100%",
                  fontSize: "16px",
                  alignSelf: "center",
                  textTransform: "none",
                }}
                type="submit"
              >
                Log in
              </Button>
            )}
          </Stack>
        </form>
      </GridItem>

      <Grid item xs sx={{ textAlign: "center", alignItems: "center" }}>
        <Link
          onClick={() => props.updateShowForgotPasswordState()}
          href="#"
          sx={{
            fontWeight: "500",
            textDecoration: "underline",
            color: "text.primary",
          }}
        >
          <Typography>Forgotten password?</Typography>
        </Link>
      </Grid>
      <GridItem sx={{ alignSelf: "stretch" }}>
        <Divider orientation="horizontal">
          <Typography>or</Typography>
        </Divider>
      </GridItem>
      <Grid item xs width={"100%"}>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <Button
            sx={{
              maxWidth: "70%",
              minWidth: "15em",
              bgcolor: "#D9D9D9",
              color: "black",
              whiteSpace: "nowrap",
              "&:hover": { bgcolor: "#D9D9D9" },
              textTransform: "none",
              gap: "8px",
            }}
          >
            <GoogleSvg />
            Sign in with Google
          </Button>
          <Button
            sx={{
              maxWidth: "70%",
              minWidth: "15em",
              bgcolor: "#748ADA",
              color: "white",
              whiteSpace: "nowrap",
              "&:hover": { bgcolor: "#748ADA" },
              textTransform: "none",
              gap: "8px",
            }}
          >
            <DiscordSvg />
            Sign in with Discord
          </Button>
        </Stack>
      </Grid>
    </GridContainer>
  );
};

const ForgotPasswordScreen = (props: ComponentProps) => {
  const forgotPasswordEndpoint: string = "/user/reset";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [serverError, setServerError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onClickSend = () => {
    const res = axiosInstance.post(forgotPasswordEndpoint, {
      email: formData.email,
    });
    console.log("email: " + formData.email);
  };

  const onClickReturn = () => {
    props.updateShowForgotPasswordState();
  };

  return (
    <GridContainer direction={"column"} alignItems={"center"} spacing={2} p={2}>
      <Grid xs sx={{ textAlign: "center" }} item>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            marginLeft: "auto",
            textAlign: "center",
            color: "text.primary",
          }}
        >
          Find Your Account
        </Typography>
      </Grid>
      <GridItem sx={{ width: "100%" }}>
        <Stack spacing={3} sx={{ alignItems: "center" }}>
          <TextField
            sx={{ width: "100%" }}
            type="text"
            label="Email"
            {...register("email", { required: true })}
            onChange={handleChange}
          />
          <GridContainer
            alignItems={"center"}
            gap={2}
            justifyContent={"center"}
          >
            <Link
              href="#"
              sx={{ color: "text.primary" }}
              onClick={onClickReturn}
            >
              Return to Login
            </Link>
            <Button variant="contained" onClick={onClickSend}>
              Send Link to Email
            </Button>
          </GridContainer>
        </Stack>
      </GridItem>
    </GridContainer>
  );
};
