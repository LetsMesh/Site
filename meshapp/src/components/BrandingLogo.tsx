import { Box, Typography } from "@mui/material";
import MeshLogo from "./svgs/Logo";

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
      <MeshLogo sx={{ fontSize: "36px", color: "#F2E8DE" }} />
    </Box>
  );
};
