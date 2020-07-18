import { makeStyles } from "@material-ui/core/styles";
import FondoSideBar from "../assets/fondo-sidebar.jpg";

const drawerWidth = 240;

// eslint-disable-next-line import/prefer-default-export
export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    background: "linear-gradient(45deg, #64485C 30%, #83677B 90%)",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: `url(${FondoSideBar})`,
  },
  MenuItem: {
    color: "lightblue",
  },
  title: {
    flexGrow: 1,
  },
  table: {
    minWidth: 700,
  },
}));
