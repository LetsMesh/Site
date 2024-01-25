import { Box } from "@mui/material";
import group_image from "../../../../../assets/media/group_image.png";

const ImageGraphic = () => {
  return (
    <Box
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
      bgcolor="#CCCCCC"
      width={"100%"}
    >
      <img
        alt="group_image"
        srcSet={`${group_image} 500w`}
        style={{
          maxWidth: "100%",
          height: "auto",
          display: "block",
          margin: "auto",
        }}
      />
    </Box>
  );
};
export default ImageGraphic;
