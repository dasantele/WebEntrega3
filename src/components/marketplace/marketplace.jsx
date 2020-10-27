import { Box, Card, CardActionArea, CardMedia, Container, Grid, Typography, useTheme } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { useEffect } from "react";
import { listProductos } from "../../api/productos";
import Filters from "./filters";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Carrousel from "../home/carousel"

const useStyles = makeStyles((theme) => ({
  fallback: {
    height: "200px",
  },
  container: {
    padding: "24px",
  },
  noResults: {
    textAlign: "center",
    margin: "24px auto",
  },
  productCard: {
    width: "100%",
    minHeight: "320px",
  },
  media: {
    height: "320px",
    backgroundSize: "cover",
    
  }
}));


const Marketplace = (props) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const [productos, setProductos] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [filtered, setFiltered] = useState();
  useEffect(() => {
    async function getProductos() {
      try {
        let productos = await listProductos();
        setProductos(productos);
        setIsLoading(false);
      } catch (error) {
        setTimeout(() => {
          setIsLoading(false);
          setProductos(false);
        }, 50000);
      }
    }
    getProductos();
  }, []);

  useEffect(() => {
    let productsFiltered = productos || [];
    if (filters.search) {
      productsFiltered = productsFiltered.filter((product) =>
        product.nombre.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }
    if (filters.platform) {
      productsFiltered = productsFiltered.filter((product) =>
        product.plataforma.toLowerCase().includes(filters.platform.toLowerCase()),
      );
    }

    setFiltered(productsFiltered);
  }, [filters, productos]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Carrousel />
      <Grid container spacing={1} className={styles.container}>
        <Grid item xs={12} sm={8}>
          <Grid container spacing={3}>
            {isLoading &&
              [1, 2, 3, 4].map((value) => (
                <Grid key={value} item xs={12} sm={6} md={4}>
                  <Skeleton variant='rect' className={styles.fallback} />
                  <Box pt={0.5}>
                    <Skeleton />
                    <Skeleton width='60%' />
                  </Box>
                </Grid>
              ))}
            {!isLoading && filtered.length === 0 && (
              <div className={styles.noResults}>
                <Typography variant='h3'>No tenemos resultados</Typography>
                <Typography variant='subtitle1'>Intenta nuevamente</Typography>
              </div>
            )}
            {!isLoading && filtered.length !== 0 && (
              filtered.map((product, index) => (
                
                <Grid key={index} item xs={12} sm={6} md={4}>
                  <Card theme={theme}>
                    <CardActionArea href={`productos/${product._id}`}>
                      <CardMedia
                        image={product.imagenes[0]}
                        className={styles.media}
                        >
                          
                      </CardMedia>
                    </CardActionArea>
                  </Card>
                  {/**<Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle onClose={handleClose}>
                      {product.nombre}
                    </DialogTitle>
                  <DialogContent dividers>
                     <Typography gutterBottom>
                        {product.descripcion}
                     </Typography>
                     <CardMedia
                      image={product.imagenes[1]}
                      className={styles.media}
                      ></CardMedia>
                  </DialogContent>
                    <DialogActions>
                      <Button autoFocus href={`productos/${product._id}`} color="secondary">
                          Ver publicaciones
                      </Button>
                    </DialogActions>
              </Dialog>*/}
                </Grid>
                
              ))
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Filters setFilters={setFilters} filters={filters} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Marketplace;
