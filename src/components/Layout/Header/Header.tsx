import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { Box } from "@material-ui/core";
import HeaderMenu from "./HeaderMenu";
import HeaderCart from "./HeaderCart";
import HeaderLogo from "./HeaderLogo";
import HeaderActions from "./HeaderActions";
import { CustomAppBar } from "./CustomAppBar";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginLeft: "auto",
    [theme.breakpoints.up("md")]: {
      marginLeft: "0",
    },
  },
  mainButtonGroup: {
    position: "absolute",
    width: 570,
    marginLeft: theme.spacing(2),
    marginRight: "auto",
    left: 120,
    right: 0,
    textAlign: "center",
    justifyContent: "center",
    display: "none",
    [theme.breakpoints.up("md")]: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "stretch",
    },
  },
  toolbar: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    height: "100px",
  },
  menu: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <CustomAppBar>
      <Toolbar className={classes.toolbar}>
        <Box className={classes.menu}>
          <HeaderMenu />
        </Box>
        <HeaderLogo className={`${classes.title} cursor-default uppercase`}/>
        <HeaderActions className={`${classes.mainButtonGroup}`} />
        <HeaderCart />
      </Toolbar>
    </CustomAppBar>
  );
}
