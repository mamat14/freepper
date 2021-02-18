import React from "react";
import {makeStyles, Theme} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { Box } from "@material-ui/core";
import HeaderMenu from "./HeaderMenu";
import HeaderCart from "./HeaderCart";
import HeaderLogo from "./HeaderLogo";
import HeaderActions from "./HeaderActions";
import { CustomAppBar } from "./CustomAppBar";
import PetBedIcon from "../../Icons/PetBedIcon";
import Collar from "../../Icons/Collar";
import HouseIcon from "../../Icons/HouseIcon";
import ShopIcon from "../../Icons/ShopIcon";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon/SvgIcon";
import GroupIcon from "../../Icons/GroupIcon";

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
  },
  menu: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

type Pages =
  | "home"
  | "about"
  | "delivery-and-payment-info"
  | "returns-policy"
  | "cooperation"
  | "public-offer"
  | "privacy-policy"
  | "attributions"
  | "ammo"
  | "beds";

type PageGroup = {
  id: string;
  name: string;
  icon?: OverridableComponent<SvgIconTypeMap>;
  children: Page[];
};

export type Page = {
  id: string;
  name: string;
  path: string;
  icon?: OverridableComponent<SvgIconTypeMap>;
};

export const pages: Record<Pages, Page> = {
  home: {id: "home", path: "/", name: "Домой", icon: HouseIcon},
  beds: {
    id: "beds",
    path: "/categories/beds/products",
    name: "Лежанки",
    icon: PetBedIcon,
  },
  ammo: {
    id: "ammo",
    path: "/categories/ammo/products",
    name: "Аммуниция",
    icon: Collar,
  },
  about: {
    id: "about",
    path: "/about",
    name: "О наc",
    icon: GroupIcon,
  },
  "delivery-and-payment-info": {
    id: "delivery-and-payment-info",
    path: "/delivery-and-payment-info",
    name: "Доставка и оплата",
  },
  "returns-policy": {
    id: "returns-policy",
    path: "/returns-policy",
    name: "Обмен и возврат",
  },
  cooperation: {
    id: "cooperation",
    path: "/cooperation",
    name: "Сотрудничество",
  },
  "public-offer": {
    id: "public-offer",
    path: "/public-offer",
    name: "Публичная офферта",
  },
  "privacy-policy": {
    id: "privacy-policy",
    path: "/privacy-policy",
    name: "Политика конфеденциальности",
  },
  attributions: {
    id: "attributions",
    path: "/attributions",
    name: "Атрибуции",
  },
};


export const shopPageGroup: PageGroup = {
  id: "shop-page-group",
  name: "Магазин",
  icon: ShopIcon,
  children: [pages.beds, pages.ammo],
};

type ModelPages =
  | "lukoshko-s"
  | "lukoshko-m"
  | "chemodan"
  | "kvadro-soft"
  | "kvadro-strong";

export const modelPages: Record<ModelPages, Page> = {
  "kvadro-soft": {
    id: "kvadro-soft",
    path: "#",
    name: "Квадро Софт",
  },
  "kvadro-strong": {
    id: "kvadro-strong",
    path: "#",
    name: "Квадро Стронг",
  },
  chemodan: {
    id: "chemodan",
    path: "#",
    name: "Чемодан",
  },
  "lukoshko-s": {
    id: "lukoshko-s",
    path: "#",
    name: "Лукошко Эйфель",
  },
  "lukoshko-m": {
    id: "lukoshko-m",
    path: "#",
    name: "Лукошко",
  },
};

export default function Header() {
  const classes = useStyles();
  return (
    <CustomAppBar>
      <Toolbar className={classes.toolbar}>
        <Box className={classes.menu}>
          <HeaderMenu />
        </Box>
        <Box className={`${classes.title} cursor-default uppercase`}>
          <HeaderLogo />
        </Box>
        <HeaderActions className={`${classes.mainButtonGroup}`} />
        <HeaderCart />
      </Toolbar>
    </CustomAppBar>
  );
}
