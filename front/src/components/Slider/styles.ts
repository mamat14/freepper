import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
  dot: {
    border: "none",
    width: "10px",
    height: "10px",
    background: "#c5c5c5",
    borderRadius: "50%",
    margin: "0 5px",
    padding: "5px",
    cursor: "pointer",
    "&focus": {
      outline: "none",
    },
  },
  active: {
    background: theme.palette.secondary.main,
  },
  navigationContainer: {
    background: theme.palette.background.default,
    bottom: 0,
    paddingLeft: "10px",
    paddingRight: "10px",
    height: "24px",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
  },
  arrow: {
    width: "30px",
    height: "30px",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    WebkitTransform: "translateY(-50%)",
    fill: "#fff",
    cursor: "pointer",
  },
  arrow_left: { left: "5px" },
  arrow_right: { left: "auto", right: "5px" },
  arrow_disabled: { fill: "rgba(255, 255, 255, 0.5)" },
  forwardButton: {
    position: "absolute",
    right: 3,
    top: "50%",
    transform: "translate(0,-50%)",
    zIndex: 10,
    background: "rgba(255, 255, 255, 0.3);",
    borderRadius: "50%",
    width: 30,
    height: 30,
    boxShadow: "0 2px 4px 0 rgba(0,0,0,0.5)",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.7);",
    },
  },
  backButton: {
    position: "absolute",
    left: 3,
    top: "50%",
    transform: "translate(0,-50%)",
    zIndex: 10,
    background: "rgba(255, 255, 255, 0.3);",
    borderRadius: "50%",
    width: 30,
    height: 30,
    boxShadow: "0 2px 4px 0 rgba(0,0,0,0.5)",
    outline: "none",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.7);",
    },
  },
  icon: {
    width: 20,
    height: 20,
    color: "kr_black",
  },
}));
