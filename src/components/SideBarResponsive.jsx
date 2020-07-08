import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuList from "@material-ui/core/MenuList";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import MenuItem from "@material-ui/core/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FondoSideBar from "../assets/fondo-sidebar.jpg";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
}));

const titulos = {
  "/": "Home",
  "/usuario": "Usuarios",
  "/estado": "Estado",
  "/video": "Videos",
};

const SideBarResponsive = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    location: { pathname },
  } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <MenuList>
        <MenuItem
          component={Link}
          to="/"
          selected={pathname === "/"}
          className={classes.MenuItem}
        >
          <ListItemIcon>
            <FontAwesomeIcon icon="home" className={classes.MenuItem} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </MenuItem>
        <MenuItem
          component={Link}
          to="/estado"
          selected={pathname === "/estado"}
          className={classes.MenuItem}
        >
          <ListItemIcon>
            <FontAwesomeIcon icon="chart-bar" className={classes.MenuItem} />
          </ListItemIcon>
          <ListItemText primary="Estado" />
        </MenuItem>
        <MenuItem
          component={Link}
          to="/usuario"
          selected={pathname === "/usuario"}
          className={classes.MenuItem}
        >
          <ListItemIcon>
            <FontAwesomeIcon icon="user" className={classes.MenuItem} />
          </ListItemIcon>
          <ListItemText primary="Usuarios" />
        </MenuItem>
        <MenuItem
          component={Link}
          to="/video"
          selected={pathname === "/video"}
          className={classes.MenuItem}
        >
          <ListItemIcon>
            <FontAwesomeIcon icon="file-video" className={classes.MenuItem} />
          </ListItemIcon>
          <ListItemText primary="Videos" />
        </MenuItem>
      </MenuList>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <FontAwesomeIcon icon="bars" />
          </IconButton>
          <Typography variant="h6" noWrap>
            {titulos[pathname]}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default withRouter(SideBarResponsive);
