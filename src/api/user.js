import axios from "axios";

const BASE_URL="https://gaymers06.herokuapp.com";

export async function getPublicacionesFromId(id) {
  const query = await axios.get(`${BASE_URL}/publicaciones`);
  let publicaciones = query.data;
  publicaciones = publicaciones.filter(publicacion => publicacion.id_vendedor === id);
  return publicaciones;
}