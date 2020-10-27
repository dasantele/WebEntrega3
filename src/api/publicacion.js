import axios from "axios";

const BASE_URL="https://gaymers06.herokuapp.com";

export async function addPublication(publicacion) {
  await axios.post(`${BASE_URL}/publicaciones`, publicacion);
}

export async function getPublicacion(id) {
  let query = await axios.get(`${BASE_URL}/publicaciones/${id}`);
  return query.data;
}