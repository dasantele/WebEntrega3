import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "./listitems";
import Chart from "./chart";
import Deposits from "./deposit";
import Orders from "./orders";
import { listProductos } from "../../api/productos";
import { Button, MenuItem, TextField } from "@material-ui/core";
import { addPublication } from "../../api/publicacion";

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {"Copyright © "}
      <Link color='inherit' href='https://localhost:3000/'>
        Gaymers
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  cssLabel: {
    color: `white !important`,
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `white !important`,
      boxShadow: "0 0 0 100px transparent inset !important",
    },
    boxShadow: "0 0 0 100px transparent inset !important"

  },

  field: {
    
  },

  labelFocused: {
    color: "#ffffff",
  },

  cssFocused: {
    boxShadow: "0 0 0 100px transparent inset !important"
  },

  notchedOutline: {
    borderWidth: '1px',
    borderColor: `white !important`,
    boxShadow: "0 0 0 100px transparent inset !important"
  },

  divider: {
    height: 28,
    margin: 4,
  },
  
  iconButton: {
    padding: 10,
  },


  
  txtField: {
    boxShadow: "0 0 0 100px transparent inset !important",
    WebkitBoxShadow: "0 0 0 100px transparent inset !important"
  }
}));

export default function Dashboard({ user, setUser }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [productos, setProductos] = React.useState([]);
  const [publicacion, setPublicacion] = React.useState({});
  useEffect(() => {
    async function getProductos() {
      try {
        const productList = await listProductos();
        setProductos(productList);
      } catch(error) {
        setProductos([]);
      }
    }
    getProductos();
  }, []);
  const handleInputChange = (llave, value) => {
    let pub = publicacion;
    pub["id_vendedor"] = user._id;
    pub["opiniones"] = [];
    pub["fechaPublicacion"] = Date.now();
    pub[llave] = value;
    setPublicacion(pub);
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogoutButtonPress = () => {
    setUser(null);
    window.location.assign("/");
  };

  const handleSubmitPress = async() => {
    try {
      console.log(publicacion);
      await addPublication(publicacion);
      window.location.assign("/user");
    } catch(error) {
      console.log("TODO: FEEDBACK to user");
    }
  }

  const handleDashboardButtonPress = () => {
    window.location.assign("/user");
  };

  const handleCreatePublicacionButtonPress = () => {
    window.location.assign("/user/createPublicacion");
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant='permanent'
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          {open && (
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          )}
          {!open && (
            <IconButton onClick={handleDrawerOpen}>
              <ChevronRightIcon />
            </IconButton>
          )}
        </div>
        <Divider />
        <List>
          {mainListItems({
            dashboardAction: () => handleDashboardButtonPress(),
            addPublicacionAction: () => handleCreatePublicacionButtonPress(),
          })}
        </List>
        <Divider />
        <List>{secondaryListItems(handleLogoutButtonPress)}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Paper className={classes.paper}>
            <Typography>Crear publicación</Typography>
            <TextField
            variant="outlined"
            backgroundColor="black"
            margin="normal"
            required
            fullWidth
            id="ciudad"
            label="Ciudad"
            name="ciudad"
            onChange={(event) => handleInputChange("ciudad", event.target.value)}
            autoFocus
            className={classes.txtField}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
              
            }}
          />
          <TextField
            variant="outlined"
            backgroundColor="black"
            margin="normal"
            required
            fullWidth
            id="descuento"
            label="Descuento"
            name="descuento"
            onChange={(event) => handleInputChange("descuento", event.target.value)}
            autoFocus
            className={classes.txtField}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
              
            }}
          />
          <TextField
            variant="outlined"
            backgroundColor="black"
            margin="normal"
            required
            fullWidth
            id="titulo"
            label="Titulo"
            name="titulo"
            onChange={(event) => handleInputChange("titulo", event.target.value)}
            autoFocus
            className={classes.txtField}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
              
            }}
          />
          <TextField
            variant="outlined"
            backgroundColor="black"
            margin="normal"
            required
            fullWidth
            id="descripcion"
            label="Descripción"
            name="Descripción"
            onChange={(event) => handleInputChange("descripcion", event.target.value)}
            multiline
            autoFocus
            className={classes.txtField}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
              
            }}
          />
          <TextField
            variant="outlined"
            backgroundColor="black"
            margin="normal"
            required
            fullWidth
            id="tipo"
            label="Tipo"
            onChange={(event) => handleInputChange("tipoVenta", event.target.value)}
            name="tipo"
            autoFocus
            select
            className={classes.txtField}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
              
            }}
          >
            <MenuItem value="Intercambio">Intercambio</MenuItem>
            <MenuItem value="Venta">Venta</MenuItem>
          </TextField>
          <TextField
            variant="outlined"
            backgroundColor="black"
            margin="normal"
            required
            fullWidth
            id="estado"
            label="Estado"
            name="estado"
            onChange={(event) => handleInputChange("estado", event.target.value)}
            select
            autoFocus
            className={classes.txtField}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
              
            }}
          ><MenuItem value="Disponible">Disponible</MenuItem></TextField>
          <TextField
            variant="outlined"
            backgroundColor="black"
            margin="normal"
            required
            fullWidth
            id="precio"
            label="Precio"
            name="Precio"
            inputMode = "numeric"
            autoFocus
            onChange={(event) => handleInputChange("precio", event.target.value)}
            className={classes.txtField}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
              type: "number",
            }}
          />
          <TextField
            variant="outlined"
            backgroundColor="black"
            margin="normal"
            required
            fullWidth
            select
            id="producto"
            label="Producto"
            name="producto"
            onChange={(event) => handleInputChange("id_producto", event.target.value)}
            autoFocus
            className={classes.txtField}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
              
            }}
          >
            {productos.map(producto => (
              <MenuItem key={producto._id} value={producto._id}>{producto.nombre}</MenuItem>
            ))}
          </TextField>
          <Button onClick={handleSubmitPress}>Crear</Button>
          </Paper>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
