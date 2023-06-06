import React, { useState } from 'react';
import { Button, Grid, Link, Stack, Typography, TextField } from '@mui/material';
const LoginInput = () => {
  const [formData, setFormData] = useState({ user: null, pass: null });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  return (
    <Grid item container direction="column" spacing={3} sx={{ alignItems: 'center' }}>
      <Grid item xs sx={{ alignSelf: 'flex-start', textAlign: 'left', mx: '15%' }}>
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
      <Grid item xs sx={{ textAlign: 'center', width: '100%' }}>
        <Button variant="contained" sx={{ width: '70%' }}>
          Login
        </Button>
      </Grid>
      <Grid item xs sx={{ textAlign: 'center', alignItems: 'center' }}>
        <Stack spacing={2}>
          <Link href="#" sx={{ color: 'black', textDecoration: 'underline', fontSize: '1.5em' }}>
            Forgot Password
          </Link>
          <Typography variant="h5" fontWeight="bold">
            OR
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs width={'100%'}>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <Button sx={{ maxWidth: '70%', minWidth: '15em', bgcolor: '#D9D9D9', color: 'black', whiteSpace: 'nowrap', '&:hover': { bgcolor: '#D9D9D9' } }}>SIGN IN WITH GOOGLE</Button>
          <Button sx={{ maxWidth: '70%', minWidth: '15em', bgcolor: '#748ADA', color: 'white', whiteSpace: 'nowrap', '&:hover': { bgcolor: '#748ADA' } }}>SIGN IN WITH DISCORD</Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default LoginInput;
