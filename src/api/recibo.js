import axios from "axios";

const BASE_URL="https://gaymers06.herokuapp.com";

export async function createRecibo({idPublicacion, idVendedor, idCliente, valor}) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  let date = JSON.stringify(new Date());
  let pos = date.lastIndexOf(':');
  console.log({
    fecha: date.replace("T", " ").substring(1, pos),
    valor, idPublicacion, idCliente, idVendedor,
    calificacionVendedor: 5,
    calificacionCliente: 5,
  });
  await axios.post(`${BASE_URL}/recibos`, {
    fecha: date.replace("T", " ").substring(1, pos),
    valor, idPublicacion, idCliente, idVendedor,
    calificacionVendedor: 5,
    calificacionCliente: 5,
  })
}