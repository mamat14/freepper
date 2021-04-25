import Box from "@material-ui/core/Box/Box";
import React from "react";

export default function ShowOnMobile({ display = "block", children }) {
  return <Box display={{ xs: "display", sm: "none" }}>{children}</Box>;
}
