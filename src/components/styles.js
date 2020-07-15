import { makeStyles } from "@material-ui/core/styles";
import FondoSideBar from "../assets/fondo-sidebar.jpg";
import FondoLogin from "../assets/fondo-login.jpg";
import LogoTexto from "../assets/logo-texto.jpeg";

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
  rootLogin: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${FondoLogin})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  logo: {
    backgroundImage: `url(${LogoTexto})`,
    height: "30vh",
    backgroundSize: "24vh",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
