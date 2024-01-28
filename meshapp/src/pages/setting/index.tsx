import React from "react";
import { GridContainer, GridItem } from "../../components/resuables/Grids";
import { useAccountContext } from "../../contexts/UserContext";
import LoadingProgress from "../../components/resuables/LoadingProgress";
import {
  Box,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import MyAccountSetting from "./components/Tab.MyAccount";
import AppearanceSetting from "./components/Tab.Appearance";

interface StyledTabProps {
  label: string;
}

const CustomTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  alignContent: "left",
  minWidth: 0,
  [theme.breakpoints.up("sm")]: {
    minWidth: 0,
  },
  height: "fit-content",
  fontWeight: theme.typography.fontWeightRegular,
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  padding: "8px",
  borderRadius: "8px",
  color: "rgba(0, 0, 0, 0.85)",
  "&:hover": {
    color: theme.palette.primary.main,
    opacity: 1,
  },
  "&.Mui-selected": {
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: theme.palette.primary.dark,
    color: "white",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#d1eaff",
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{
        flexGrow: 1,
      }}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Box sx={{ width: "100%" }}>
            <Stack gap={2}>{children}</Stack>
          </Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const SettingPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <GridContainer
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "90vh",
        padding: 0,
        margin: 0,
        overflowX: "hidden",
      }}
    >
      <GridContainer
        spacing={5}
        sx={{
          boxShadow: 10,
          margin: "auto",
          width: "95%",
          maxWidth: "1024px",
          height: "90%",
          minHeight: "500px",
          bgcolor: "secondary.main",
          color: "text.primary",
          borderRadius: "12px",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            height: "100%",
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{
              borderRight: 1,
              borderColor: "divider",
              bgcolor: "secondary.dark",
              borderRadius: "12px 0 0 12px",
              padding: "10px 0",
              minWidth: "120px",
            }}
          >
            <CustomTab label="My Account" {...a11yProps(0)} />
            <CustomTab label="Blocked Accounts" {...a11yProps(1)} />
            <Divider sx={{ margin: "8px 0" }} />
            <CustomTab label="Appearance" {...a11yProps(3)} />
            <CustomTab label="Notifications" {...a11yProps(4)} />
            <CustomTab label="Language" {...a11yProps(5)} />
            <Divider sx={{ margin: "8px 0" }} />
            <CustomTab label="What's New" {...a11yProps(7)} />
            <CustomTab label="Contact Us" {...a11yProps(8)} />
            <Divider sx={{ margin: "8px 0" }} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <MyAccountSetting />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Blocked Accounts
          </TabPanel>
          <TabPanel value={value} index={3}>
            <AppearanceSetting />
          </TabPanel>
          <TabPanel value={value} index={4}>
            Notifications
          </TabPanel>
          <TabPanel value={value} index={5}>
            Language
          </TabPanel>
          <TabPanel value={value} index={7}>
            What's New
          </TabPanel>
          <TabPanel value={value} index={8}>
            Contact Us
          </TabPanel>
        </Box>
      </GridContainer>
    </GridContainer>
  );
};

export default SettingPage;
