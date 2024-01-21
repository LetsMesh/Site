import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export const BrandingLogo = () => {
  return (
    <Typography
      variant="h6"
      noWrap
      component="a"
      href={"/"}
      sx={{
        color: "#F2E8DE",
        fontFamily: "cocogoose",
        fontWeight: 600,
        fontSize: "36px",
        mr: 2,
        display: { xs: "flex", md: "flex" },
        textDecoration: "none",
      }}
    >
      mesh
    </Typography>
  );
};
