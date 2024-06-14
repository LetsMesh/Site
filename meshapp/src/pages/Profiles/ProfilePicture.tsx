import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
  Divider,
  ClickAwayListener,
  Tooltip,
} from "@mui/material";

import Swal from "sweetalert2";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ErrorIcon from "@mui/icons-material/Error";

import "./styling/ProfilePage.css";
import { axiosInstance } from "../../config/axios-config";
import { useThemeContext } from "src/themes/ThemeContextProvider";

const tooltipErrorTheme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#f44336",
          color: "#ffffff",
        },
        arrow: {
          color: "#f44336",
        },
      },
    },
  },
});

/**
 * Displays the user's profile picture.
 *
 * @param props - Properties of the component
 * @param {string} props.image - A URL to user's profile image
 * @param {number} props.accountID - accountID associated with the profile
 */
const ProfilePicture = (props: { image: string; accountID: number }) => {
  const [image, setImage] = useState(props.image);
  const [showError, setShowError] = useState(false);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setShowError(false);
  };

  // Gets the user's profile picture and saves it to the display image
  React.useEffect(() => {
    axiosInstance
      .get("profiles/profile-picture/" + props.accountID)
      .then((response) => {
        console.log(response);
        setImage(response.data["data"]["get"]["profilePicture"]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Box
      className="profile-page-picture-parent-container"
      onClick={() => {
        setOpen(!open);
        setShowError(false);
      }}
    >
      <Box className="profile-page-picture-container">
        <img className="profile-page-picture-body" src={image} alt="profile" />
      </Box>
      <Box
        className="profile-page-picture-icon-container"
        sx={{ backgroundColor: "buttonBackground.main" }}
      >
        <EditIcon sx={{ width: "26px", height: "26px" }} />
        {open && (
          <ProfilePictureEdit
            handleClose={handleClose}
            image={image}
            setImage={setImage}
            showError={showError}
            setShowError={setShowError}
            accountID={props.accountID}
          />
        )}
      </Box>
    </Box>
  );
};

/**
 * Sub-component of ProfilePicture
 * Displays buttons that allow profile picture editing
 */
const ProfilePictureEdit = (props: any) => {
  const { handleClose, image, setImage, showError, setShowError, accountID } = props;
  const DEFAULT_IMAGE: string = ""; // TODO: Update this when a default image is setup

  // Prevents entire container from closing when clicking on it
  const handleOptionClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent click from bubbling up to parent
  };

  const handleEditPicture = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent click from bubbling up to parent
    const fileInput = document.getElementById("fileInput");
    fileInput?.click(); // Trigger the file input click
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const formData = new FormData();
      formData.append("accountID", accountID);
      formData.append("profilePicture", file);
      if (!image) {
        axiosInstance
          .post("profiles/profile-picture", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response);
            setImage(response.data["profilePicture"]);
            setShowError(false);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        axiosInstance
          .patch("profiles/profile-picture", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response);
            setImage(response.data["profilePicture"]);
            setShowError(false);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      handleClose();
    } else {
      setShowError(true);
    }
  };
  //need to explicitly get theme mode to style on light/dark mode for sweet alert
  const { mode } = useThemeContext();

  const handleDeletePicture = (event: React.MouseEvent) => {
    event.stopPropagation();
    Swal.fire({
      title: "Are you sure?",
      text: "Delete your current profile picture.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",

      ...(mode === "light"
        ? {
            color: "#000000DE",
            background: "#FFFFFF",
            iconColor: "#74D194",
            confirmButtonColor: "#74D194",
            cancelButtonColor: "#d33",
          }
        : {
            color: "#F2E8DE",
            background: "#212121",
            iconColor: "#247C67",
            confirmButtonColor: "#247C67",
            cancelButtonColor: "#d33",
          }),
    }).then((result) => {
      if (result.value) {
        axiosInstance
          .delete("profiles/profile-picture", {
            data: {
              accountID: accountID
            }
          })
          .then((response) => {
            console.log(response);
            setImage(null);
          })
          .catch((error) => {
            console.error(error);
          });
        handleClose();
      }
    });
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Grid
        container
        className="profile-page-picture-edit-container"
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          padding: "0 5px",
          backgroundColor: "buttonBackground.main",
          "::after": {
            borderColor: "transparent",
            borderLeftColor: "buttonBackground.main",
          },
        }}
        onClick={handleOptionClick}
      >
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          accept="image/*"
          onChange={onFileChange}
        />
        <Grid
          item
          className="profile-page-picture-edit-section"
          onClick={handleEditPicture}
        >
          <Typography sx={{ fontFamily: "cocogoose", fontSize: "15px" }}>
            Edit
          </Typography>
          <AddPhotoAlternateIcon
            sx={{ width: "18px", height: "18px", pl: "5px" }}
          />
        </Grid>
        <Divider sx={{ width: "100%", borderTop: "1px solid white" }} />
        <Grid
          item
          className="profile-page-picture-delete-section"
          onClick={handleDeletePicture}
        >
          <Typography sx={{ fontFamily: "cocogoose", fontSize: "13px" }}>
            Delete
          </Typography>
          <DeleteIcon sx={{ width: "18px", height: "18px", pl: "3px" }} />
        </Grid>

        {/* Conditionally render error message */}
        {showError && (
          <ThemeProvider theme={tooltipErrorTheme}>
            <Tooltip
              disableFocusListener
              disableTouchListener
              arrow
              sx={{
                position: "absolute",
                top: "-13px",
                left: "-13px",
              }}
              title={"Invalid file! Please upload an image."}
              placement="top"
            >
              <ErrorIcon color="error" />
            </Tooltip>
          </ThemeProvider>
        )}
      </Grid>
    </ClickAwayListener>
  );
};

export default ProfilePicture;
