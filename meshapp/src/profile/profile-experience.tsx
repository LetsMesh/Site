import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  createTheme,
  ThemeProvider,
  Grid,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ProfileTextField from "./profile-textfield";

interface AccordionProps {
  title: string;
  description: string;
  organization: string;
  index: number;
}

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0b7d66",
    },
  },
  typography: {
    h1: {
      fontFamily: "cocogoose",
      fontWeight: "bold",
      color: "#26383A",
    },
  },
});

/**
 * Displays the user's experience.
 *
 * @param props - Properties of the component
 * @param {string} props.occupationTitle - Title of user's occupation
 * @param {string} props.occupationBusiness - Name of business/org the user affiliates with
 * @param {string} props.accountID - accountID associated with the profile
 */
export default function ProfileExperience(props: { accountID: number }) {
  const [editMode, setEditMode] = useState(false);
  const [expandMode, setExpandMode] = useState([false, false]);
  const [occupations, setOccupations] = useState([
    "Animal Petter",
    "Object Oriented Snob",
  ]);
  const [organizations, setOrgranizations] = useState([
    "Self-Employed",
    "MindGeek, Montreal Canada",
  ]);
  const [descriptions, setDescriptions] = useState([
    "Pet cute animals",
    "Lebron James",
  ]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
    setOccupations([...occupations]);
    setOrgranizations([...organizations]);
    setDescriptions([...descriptions]);
  };

  const handleExpandClick = (index: number) => {
    expandMode[index] = !expandMode[index];
    setExpandMode([...expandMode]);
    console.log(expandMode[index]);
  };

  const handleAddClick = () => {
    setOccupations([...occupations, ""]);
    setOrgranizations([...organizations, ""]);
    setDescriptions([...descriptions, ""]);
    setExpandMode([...expandMode, false]);
  };

  //TODO: Remove experience 
  const handleDeleteClick = () => {

  };

  //TODO: Receive and store experience
  function saveOccupation(text: string, index: number) {
    occupations[index] = text;
  }

  function saveOrganization(text: string, index: number) {
    organizations[index] = text;
  }

  function saveDescription(text: string, index: number) {
    descriptions[index] = text;
  }

  /**
   * Displays experience header with edit/save icon.
   */
  const ExperienceHeader = () => {
    return (
      <Grid item container gap="10px" alignItems="center" mb="20px">
        <Typography
          variant="h1"
          sx={{
            fontSize: "22px",
          }}
        >
          Experience
        </Typography>
        {editMode ? (
          <SaveIcon
            color="primary"
            onClick={handleSaveClick}
            sx={{
              "&:hover": {
                color: "#0A6B57",
              },
            }}
          />
        ) : (
          <EditIcon
            color="disabled"
            onClick={handleEditClick}
            sx={{
              "&:hover": {
                color: "#0b7d66",
              },
            }}
          />
        )}
      </Grid>
    );
  };

  /**
   * Displays the user's experience in edit mode.
   *
   * @param props - Properties of the component
   * @param {string} props.title - Title of user's occupation
   * @param {string} props.organization - Name of business/org the user affiliates with
   * @param {string} props.description - Description of user's occupation
   * @param {boolean} props.expand - Expand mode indicator for user's occupation
   * @param {numberg} props.index- Index of user's occupation
   */
  const EditExperience = (props: {
    title: string;
    organization: string;
    description: string;
    expand: boolean;
    index: number;
  }) => {
    return (
      <Grid container alignItems="center" gap="10px">
        <RemoveButton />
        <Grid item {...(editMode ? { xs: 11.57 } : { xs: 12 })}>
          <Accordion expanded={props.expand}>
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  onClick={() => handleExpandClick(props.index)}
                />
              }
            >
              <Grid container gap="20px">
                <Grid xs={5.8}>
                  <ProfileTextField
                    variant="standard"
                    label="Occupation"
                    placeholder=""
                    text={props.title}
                    charLimit={50}
                    handleSave={(text) => saveOccupation(text, props.index)}
                  />
                </Grid>
                <Grid xs={5.8}>
                  <ProfileTextField
                    variant="standard"
                    label="Organization"
                    placeholder=""
                    text={props.organization}
                    charLimit={50}
                    handleSave={(text) => saveOrganization(text, props.index)}
                  />
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <ProfileTextField
                variant="standard"
                label="Description"
                placeholder=""
                text={props.description}
                charLimit={50}
                handleSave={(text) => saveDescription(text, props.index)}
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    );
  };

  /**
   * Displays the user's experience.
   *
   * @param props - Properties of the component
   * @param {string} props.title - Title of user's occupation
   * @param {string} props.organization - Name of business/org the user affiliates with
   * @param {string} props.description - Description of user's occupation
   * @param {numberg} props.index- Index of user's occupation
   */
  const ExperienceAccordion = (props: AccordionProps) => {
    return (
      <Grid item>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontSize="18px" width="30%">
              {props.title}
            </Typography>
            <Typography color="gray">{props.organization}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ProfileTextField
              variant="standard"
              label="Description"
              placeholder=""
              text={props.description}
              charLimit={50}
              handleSave={(text) => saveDescription(text, props.index)}
            />
          </AccordionDetails>
        </Accordion>
      </Grid>
    );
  };

  /**
   * Displays delete icon next to the user's experience in edit mode.
   */
  const RemoveButton = () => {
    return (
      <DeleteIcon
        color="disabled"
        onClick={handleDeleteClick}
        sx={{
          "&:hover": {
            color: "#0b7d66",
          },
        }}
      />
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid className="profile-page-column-body">
        <ExperienceHeader />
        {occupations.map((occupation, index) =>
          editMode ? (
            <EditExperience
              title={occupation}
              organization={organizations[index]}
              description={descriptions[index]}
              expand={expandMode[index]}
              index={index}
            />
          ) : (
            <ExperienceAccordion
              title={occupation}
              organization={organizations[index]}
              description={descriptions[index]}
              index={index}
            />
          )
        )}
        {editMode && (
          <AddIcon
            color="primary"
            onClick={handleAddClick}
            sx={{
              mt: "18px",
              "&:hover": {
                color: "#0A6B57",
              },
            }}
          />
        )}
      </Grid>
    </ThemeProvider>
  );
}