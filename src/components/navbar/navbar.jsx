import React from "react";
import {
  AppBar,
  Button,
  Grid,
  Link,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none!important",
  },
}));

const NavBar = ({ user }) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  return (
    <AppBar position='static' color='primary'>
      <Toolbar>
        <Grid item xs={10}>
          <Link href='/' color='inherit' className={styles.link}>
            <Button style={{ flexGrow: 1 }} color='inherit'>
              <Icon>sports_esports</Icon>
              <Hidden smDown>Gaymers</Hidden>
            </Button>
          </Link>
          <Link href='/marketplace' color='inherit' className={styles.link}>
            <Button style={{ flexGrow: 1 }} color='inherit'>
              <Icon>videogame_asset</Icon>
              <Hidden smDown>Juegos</Hidden>
            </Button>
          </Link>
          <Button style={{ flexGrow: 1 }} color='inherit'>
            <Icon>storefront</Icon>
            <Hidden smDown>Categorias</Hidden>
          </Button>
          <Link href='/posts' color='inherit' className={styles.link}>
          <Button style={{ flexGrow: 1 }} color='inherit'>
            <Icon>sync_alt</Icon>
            <Hidden smDown>Intercambiar</Hidden>
          </Button>
          </Link>
        </Grid>
        <Grid item xs={2}>
          {!user &&
          <Link href={"/login"} className={styles.link} color="inherit">
            <Button color='inherit'>
              <Icon>login</Icon>
              <Hidden smDown>Iniciar sesión</Hidden>
            </Button>
          </Link>}
          {user && 
          <Link href={"/user"} className={styles.link} color="inherit">
          <Button color='inherit'>
            <Icon>person</Icon>
            <Hidden smDown>{user.nombre}</Hidden>
          </Button>
        </Link>
          }
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
