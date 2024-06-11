import { Box, Typography } from "@mui/material";
import { ReactComponent as MeshLogo } from "src/assets/svgs/MeshLogo.svg";

export const BrandingLogo = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      component="a"
      href={"/"}
      sx={{ textDecoration: "none" }}
    >
      <Typography
        variant="h6"
        noWrap
        sx={{
          color: "#F2E8DE",
          fontFamily: "cocogoose",
          fontWeight: 600,
          fontSize: "36px",
          display: { xs: "flex", md: "flex" },
        }}
      >
        mesh
      </Typography>
      <MeshLogo width="50px" height="50px" color="#F2E8DE" />
    </Box>
  );
};
