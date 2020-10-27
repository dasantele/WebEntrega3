import { CardMedia, Typography } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React from "react";
import Carousel from "react-material-ui-carousel";
import Banner from "./banner";
import redDead from "./red-dead.jpg";
import bioShock from "./bioshock-back.jpg";

const useStyles = makeStyles((theme) => ({
  carousel: {
    background: theme.palette.secondary.main,
  },
}));

const Homecarousel = (props) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const items = [
    {
      title: "Red Dead Redemption 2",
      description: "Busca las mejores novedades de videojuegos",
      image: redDead,
    },
    {
      title: "¿Tienes un juego que ya no usas?",
      description: "Busca con quien intercambiarlo",
      image: bioShock,
    },
  ];
  return (
    <Carousel
      autoPlay={false}
      timer={5000}
      timeout={1000}
      indicators={false}
      className={styles.carousel}
    >
      {items.map((item, i) => (
        <a href='/marketplace' style={{textDecoration: "none"}}>
          <Banner {...item} key={i}></Banner>
        </a>
      ))}
    </Carousel>
  );
};

export default Homecarousel;
