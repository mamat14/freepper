import { useRouter } from "next/router";
import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles, Theme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import Fade from "@material-ui/core/Fade";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import Link from "next/link";
import { Page, pages, shopPageGroup } from "./pages";
import ContactUsSnackBar from "../../ContactUs/ContactUsSnackBar";
import ContactsIcon from "../../Icons/ContactsIcon";

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  drawer: {
    width: "70vw",
    maxWidth: "300px",
    overflow: "visible",
  },
  closeMenuButton: {
    position: "absolute",
    top: 5,
    right: -65,
    background: theme.palette.background.paper,
    borderRadius: "50%",
  },
  nestedList: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function HeaderMobileSidebar({ open, toggle }) {
  const classes = useStyles();
  const router = useRouter();
  const [curPath] = router.asPath.split("?");
  const [shopGroupOpen, setShopGroupOpen] = React.useState(true);
  const toggleShopGroupOpen = () => {
    setShopGroupOpen(!shopGroupOpen);
  };

  const handleListClick = (path) => (event) => {
    if (path === curPath) {
      toggle(false)(event);
    }
  };
  const [contactsOpen, setContactsOpen] = useState(false);
  const sideBarOpenTime = 250;

  function pageRepresentation(
    page: Page,
    className: string = "",
    fontSizeOverride?: string,
  ): React.ReactNode {
    const { name, path, Icon } = page;
    const styleProp = fontSizeOverride ? { fontSize: fontSizeOverride } : {};
    return (
      <Link key={name + path} href={path}>
        <ListItem
          className={className}
          button
          selected={curPath === path}
          onClick={handleListClick(path)}
        >
          <ListItemIcon>
            <Icon fontSize="large" style={styleProp} />
          </ListItemIcon>
          <ListItemText primary={name}>{name}</ListItemText>
        </ListItem>
      </Link>
    );
  }
  return (
    <Drawer
      className="relative"
      classes={{ paper: classes.drawer }}
      open={open}
      onClose={toggle(false)}
      transitionDuration={sideBarOpenTime}
    >
      <Fade
        in={open}
        style={{
          transitionDelay: open ? `${sideBarOpenTime / 2}ms` : "0ms",
        }}
      >
        <Box
          component="span"
          className={classes.closeMenuButton}
          onClick={toggle(false)}
        >
          <IconButton>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
      </Fade>
      <Box
        height="100vh"
        className="flex flex-col justify-between overflow-y-scroll"
        pb={5}
      >
        <List component="nav" aria-label="shop navigation">
          {pageRepresentation(pages.home)}
          <ListItem button onClick={toggleShopGroupOpen}>
            <ListItemIcon>
              {React.createElement(shopPageGroup.icon)}
            </ListItemIcon>
            <ListItemText primary={shopPageGroup.name}>
              {shopPageGroup.name}
            </ListItemText>
            {shopGroupOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={shopGroupOpen} timeout="auto">
            <List component="div" disablePadding>
              {shopPageGroup.children.map((page) =>
                pageRepresentation(page, classes.nestedList, "28px"),
              )}
            </List>
          </Collapse>
        </List>
        {pageRepresentation(pages.about)}
        <Box marginTop="auto" aria-label="contact-us-form">
          <ListItem button onClick={() => setContactsOpen(true)}>
            <ListItemIcon>
              <ContactsIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText>Контакты</ListItemText>
          </ListItem>
        </Box>
      </Box>
      <ContactUsSnackBar
        open={contactsOpen}
        close={() => setContactsOpen(false)}
      />
    </Drawer>
  );
}
