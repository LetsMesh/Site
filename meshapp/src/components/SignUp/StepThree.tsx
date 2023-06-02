import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box"
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal";

import { UseFormRegister } from "react-hook-form";
import { useState } from "react";
import { IFormInput } from "./SignUp";

const interests = [
    {title: "MLP"},
    {title: "Software"},
]

const profileSectionStyle = {
    paddingTop: 15,
    paddingBottom: 15
}

const profileFillStyle = {
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 10
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function StepThree(props:
{register:UseFormRegister<IFormInput>}) {
    const [click, setClick] = useState(false);
    const handleOpen = () => setClick(true);
    const handleClose = () => setClick(false);

    return (
        <>
            <Grid container justifyContent="center" style={profileSectionStyle}>
                <Grid item xs={2}>
                    <Grid container direction="column" alignItems="center">
                        <Grid item>
                            <Avatar
                                alt="Default Profile Picture"
                                src="DefaultProfile.png"
                                sx={{width: 300, height: 300}}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleOpen}
                            >
                                UPLOAD PICTURE
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Grid container justifyContent="center">
                        <Grid item xs={8}>
                            <Typography variant="h2">Start Your Profile!</Typography>
                        </Grid>
                    </Grid>

                    <Grid container columnSpacing={4} style={profileFillStyle}>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                {...props.register('name', {required:true})}
                                id="standard-basic"
                                label="Name"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                margin="normal"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                {...props.register('location', {required:true})}
                                id="standard-basic"
                                label="Location"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                margin="normal"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                {...props.register('title', {required:true})}
                                id="standard-basic"
                                label="Title"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                multiple
                                id="tags-standard"
                                options={interests}
                                getOptionLabel={(option) => option.title}
                                defaultValue={[interests[0]]}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField 
                                        {...params}
                                        variant="standard"
                                        label="Interests"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                component="form"
                                noValidate
                            >
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    focused
                                    id="outlined-multiline-static"
                                    label="Label"
                                    defaultValue="This here could be your bio if you had one. Set one up as soon as you can to tell everyone about yourself. Bios help others learn about you."
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Modal
                open={click}
                onClose={handleClose}
                aria-labelledby="title"
                aria-describedby="description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Description in modal
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}