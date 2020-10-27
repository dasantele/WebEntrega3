import { makeStyles, useTheme } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getPublicacion } from "../../api/publicacion";
import { createRecibo } from "../../api/recibo";

const { Container, Paper, Typography, Card, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } = require("@material-ui/core");
const { default: Skeleton } = require("@material-ui/lab/Skeleton");

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "24px",
    padding: "24px",
  },
}));

const Publicacion = ({ user }) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const id = useParams().id;
  const [isLoading, setIsLoading] = useState(true);
  const [publicacion, setPublicacion] = useState();
  const [open, setOpen] = useState(false);


  const handleExchangeButton = async() => {
    await createRecibo({ idPublicacion: publicacion._id, 
    idVendedor: publicacion.id_vendedor,
    idCliente: user._id,
    valor: publicacion.precio});
    setOpen(true);
  }
  
  const handleClose = () => {
    window.location.assign("/");
  };

  console.log(publicacion);
  useEffect(() => {
    async function getPublicacionId() {
      try {
        const publicacion = await getPublicacion(id);
        setPublicacion(publicacion);
        setIsLoading(false);
      } catch (error) {
        setPublicacion(undefined);
        setIsLoading(false);
      }
    }
    getPublicacionId();
  }, []);
  return (
    <Container maxWidth='md'>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Intercambio enviado</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Te enviaremos un correo confirmando el intercambio
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            ¡Genial!
          </Button>
        </DialogActions>
      </Dialog>
      {isLoading && (
        <>
          <Skeleton width='100%' height='320px' variant='text' />
          <Skeleton width='100%' variant='text' />
          <Skeleton width='100%' variant='text' />
          <Skeleton width='60%' variant='text' />
        </>
      )}
      {!isLoading && (
        <>
          <Paper className={styles.paper}>
            <Typography variant='h4' color='initial'>
              {publicacion.titulo}
            </Typography>
            <Typography variant='subtitle1' color='initial'>
              {publicacion.descripcion}
            </Typography>
            {/*<Typography variant='subtitle1' color='initial'>
              Tipo: {publicacion.tipoVenta}
            </Typography>*/}
            {/*<Typography variant='subtitle1' color='initial'>
              Precio: {publicacion.precio}
            </Typography>*/}
            <Card>
              <Typography variant='subtitle1' color='initial'>
                Opiniones:
              </Typography>
              {publicacion.opiniones.map((opinion) => (
                <Typography variant='subtitle1' color='initial'>
                  Opiniones
                </Typography>
              ))}
              {publicacion.opiniones.length === 0 && (
                <Typography variant='subtitle1' color='initial'>
                - No hay opiniones
              </Typography>
              )}
            </Card>
            <br></br>
            <Button fullWidth onClick={handleExchangeButton}>Intercambiar</Button>
          </Paper>
        </>
      )}
    </Container>
  );
};

export default Publicacion;
