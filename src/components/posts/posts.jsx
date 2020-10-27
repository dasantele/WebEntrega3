
import React, { useState } from "react";
import Carrousel from "../home/carousel"
import { Box, CardMedia, Container, Grid, Typography, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useEffect } from "react";
import { listPublicaciones } from "../../api/productos";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Skeleton from "@material-ui/lab/Skeleton";


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

const Posts = (props) => {
    const theme = useTheme();
    const styles = useStyles(theme);
    const [publicaciones, setPublicaciones] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


    useEffect(() => {
        async function getPublicaciones() {
          try {
            let publicaciones = await listPublicaciones();
            setPublicaciones(publicaciones);
            setIsLoading(false);
          } catch (error) {
            setTimeout(() => {
              setIsLoading(false);
              setPublicaciones(false);
            }, 50000);
          }
        }
        getPublicaciones();
      }, []);


    return (
        <Container>
            <Carrousel/>
            <Grid container spacing={1} className={styles.container}>
            <Grid item xs={12} sm={12}>
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
              {!isLoading && publicaciones.length === 0 && (
              <div className={styles.noResults}>
                <Typography variant='h3'>No tenemos resultados</Typography>
                <Typography variant='subtitle1'>Intenta nuevamente</Typography>
              </div>
            )}
            {!isLoading && publicaciones.length !== 0 && (
              publicaciones.map((post, index) => (
                <Accordion expanded={expanded === 'panel'+index} onChange={handleChange('panel'+index)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                         id="panel2bh-header"
                    >
                        <Typography className={styles.heading}>Oferta: </Typography>
                        <Typography className={styles.secondaryHeading}>
                         {post.titulo}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                        <List>
                            <ListItem>
                                <ListItemText primary={`Descripción de la Oferta: ${post.descripcion}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Ciudad: ${post.ciudad}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Fecha: ${post.fechaPublicacion}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`TipoVenta: ${post.tipoVenta}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Precio: ${post.precio}`} />
                            </ListItem>
                        </List>
                        
                    </AccordionDetails>
                    <Divider />
                    <AccordionActions>
                        <Button size="small">Cancel</Button>
                        <Button href={`post/${post._id}`} size="small" color="primary">
                            Aceptar
                        </Button>
                    </AccordionActions>
                </Accordion>
              ))
            )}

            </Grid>
            </Grid>
        </Container>
        
  );
};

export default Posts;



