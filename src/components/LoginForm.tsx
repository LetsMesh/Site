import React, { useState } from 'react';
import { Button, Grid, Link, Stack, Typography, TextField } from '@mui/material';
const LoginInput = () => {
  const [formData, setFormData] = useState({ user: null, pass: null });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  return (
    <Grid spacing={2} container item direction="column" xs>
      <Grid item container direction="column" spacing={5} sx={{ textAlign: 'center', alignItems: 'center' }}>
        <Grid item xs>
          <Typography variant="h2" fontWeight={'bold'}>
            Login
          </Typography>
        </Grid>
        <Grid item xs sx={{ width: '70%' }}>
          <Stack spacing={2}>
            <TextField id="user" type="text" onChange={handleChange} label="Email" />
            <TextField id="pass" type="password" onChange={handleChange} label="Password" />
          </Stack>
        </Grid>
        <Grid item xs>
          <Stack spacing={2}>
            <Button variant="contained" sx={{ width: '15em' }}>
              Login
            </Button>
            <Link href="#" sx={{ color: 'black', textDecoration: 'underline', fontSize: '1.5em' }}>
              Forgot Password
            </Link>
            <Typography variant="h5" fontWeight="bold">
              OR
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Grid item xs>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <Button sx={{ px: 7, bgcolor: '#D9D9D9', color: 'black', whiteSpace: 'nowrap', '&:hover': { bgcolor: '#D9D9D9' } }}>SIGN IN WITH GOOGLE</Button>
          <Button sx={{ px: 7, bgcolor: '#748ADA', color: 'white', whiteSpace: 'nowrap', '&:hover': { bgcolor: '#748ADA' } }}>SIGN IN WITH DISCORD</Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default LoginInput;
