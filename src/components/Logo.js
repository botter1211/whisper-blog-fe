import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";
import logoImgLight from "../4light.png";
import logoImgDark from "../4dark.png";

function Logo({ disableLink = false, sx, mode }) {
  const logo = (
    <Box sx={{ width: 75, height: 75, ...sx }}>
      <img
        src={mode === "dark" ? logoImgDark : logoImgLight}
        alt="logo"
        width="100%"
      />
    </Box>
  );
  if (disableLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}

export default Logo;
