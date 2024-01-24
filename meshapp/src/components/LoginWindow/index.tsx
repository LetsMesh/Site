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
import { apiAxiosInstance } from "../../utils/axios/axiosConfig";
import { GridContainer, GridItem } from "../resuables/Grids";
import { useAccountContext } from "../../contexts/UserContext";
import { useLogin } from "../../utils/hooks/useAuth";
import LoadingProgress from "../resuables/LoadingProgress";

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

  const handleLogin = async () => {
    if (formData.user !== null && formData.pass !== null) {
      const response = await login(formData.user, formData.pass);
      if (!response || response.status !== 200) {
        // Handle login error
        alert("Invalid credentials");
        return;
      }

      // Handle response here. For example, store the user data in the state or context.
      setAccount(response.data.account);
    } else {
      console.error("Invalid form", error);
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
        <Stack spacing={2}>
          <TextField
            id="user"
            type="text"
            onChange={handleChange}
            label="Email"
          />
          <TextField
            id="pass"
            type="password"
            onChange={handleChange}
            label="Password"
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
              onClick={handleLogin}
            >
              Log in
            </Button>
          )}
        </Stack>
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
          Forgotten password?
        </Link>
      </Grid>
      <GridItem sx={{ alignSelf: "stretch" }}>
        <Divider orientation="horizontal">or</Divider>
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
            }}
          >
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
            }}
          >
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
    const res = apiAxiosInstance.post(forgotPasswordEndpoint, {
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
          sx={{ fontWeight: "bold", marginLeft: "auto", textAlign: "center" }}
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
              sx={{ color: "text.primary", fontWeight: "bold" }}
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
