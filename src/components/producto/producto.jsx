import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Typography,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles, useTheme } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPublicacionesProducto } from "../../api/productos";
import ArrowForward from "@material-ui/icons/ArrowForward";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "24px",
  },
  noResults: {
    textAlign: "center",
    margin: "24px auto",
  },
}));

const PublicacionesProducto = (props) => {
  const params = useParams();
  const theme = useTheme();
  const styles = useStyles(theme);
  const [isLoading, setIsLoading] = useState(true);
  const [publicaciones, setPublicaciones] = useState();
  useEffect(() => {
    async function getPublicaciones() {
      try {
        const publications = await getPublicacionesProducto(params.id);
        setPublicaciones(publications);
        setIsLoading(false);
      } catch (error) {
        setPublicaciones([]);
        setIsLoading(false);
      }
    }
    getPublicaciones();
  }, []);
  console.log(publicaciones);
  return (
    <>
      <Container maxWidth='md' className={styles.root}>
        {isLoading && (
          <>
            <Box pt={0.5}>
              <Skeleton />
              <Skeleton width='60%' />
            </Box>
            <Box pt={3}>
              <Skeleton />
              <Skeleton width='60%' />
            </Box>
            <Box pt={3}>
              <Skeleton />
              <Skeleton width='60%' />
            </Box>
          </>
        )}
        {!isLoading && publicaciones.length === 0 && (
          <div className={styles.noResults}>
            <Typography variant='h3'>No encontramos publicaciones asociadas al producto</Typography>
            <Typography variant='subtitle1'>Intenta nuevamente</Typography>
          </div>
        )}
        {!isLoading &&
          publicaciones.length !== 0 &&
          publicaciones.map((publicacion, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ArrowForward />}
                aria-controls='panel1d-content'
                id='panel1d-header'
              >
                <Typography variant='subtitle1'>
                  {publicacion.titulo}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant='caption' style={{flex: 1}}>
                  {publicacion.descripcion}
                </Typography>
                <Button
                  color='default'
                  onClick={() =>
                    window.location.assign(`/publicaciones/${publicacion._id}`)
                  }
                >
                  Ver la publicación
                </Button>
              </AccordionDetails>
            </Accordion>
          ))}
      </Container>
    </>
  );
};

export default PublicacionesProducto;
