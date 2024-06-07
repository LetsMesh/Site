import { useForm } from "react-hook-form";
import { Button, Grid, Stack, Typography, TextField } from "@mui/material";

import React, { useState } from "react";
import { axiosInstance } from "src/config/axios-config";

export const PasswordReset = () => {
  const passwordResetConfirmedEndpoint = "user/reset/confirmed";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState({
    password: "",
    confirmedPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    if (formData.password == formData.confirmedPassword) {
      const res = axiosInstance
        .post(passwordResetConfirmedEndpoint, {
          newpassword: formData.confirmedPassword,
        })
        .then((res) => {
          console.log(res.data);
        });
    } else {
      console.log("Passwords must match!");
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      sx={{
        boxShadow: 10,
        margin: "auto",
        width: "480px",
        bgcolor: "cardBackground.main",
        color: "text.main",
        borderRadius: 5,
      }}
    >
      <Grid container spacing={3} p={2} width={"100%"}>
        <Grid xs item sx={{ textAlign: "center" }}>
          <Typography variant="h3" fontWeight={500}>
            Password Reset
          </Typography>
          <Typography variant="h5" fontWeight={400}>
            Please enter your new password
          </Typography>
        </Grid>
        <Grid item m="auto" sx={{ width: "70%" }}>
          <Stack spacing={2}>
            <TextField
              type="password"
              label="Password"
              {...register("password", { required: true })}
              onChange={handleChange}
            />
            {errors.password && <p>New password required to reset password</p>}
            <TextField
              type="password"
              label="Confirm Password"
              {...register("confirmedPassword", { required: true })}
              onChange={handleChange}
            />
            {errors.confirmedPassword && <p>Please re-enter new password</p>}
          </Stack>
        </Grid>
        <Grid m={"auto"} item>
          <Button
            variant="contained"
            sx={{
              fontSize: "1.5rem",
              borderRadius: 25,
              width: "15em",
            }}
            onClick={handleSubmit(onSubmit)}
          >
            <Typography variant="button">Reset Password</Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PasswordReset;
