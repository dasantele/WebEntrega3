import axios from "axios";

const BASE_URL="https://gaymers06.herokuapp.com";

export async function listProductos() {
  const productos = await axios.get(`${BASE_URL}/productos`);
  return productos.data;
}

export async function listPublicaciones() {
  const productos = await axios.get(`${BASE_URL}/publicaciones`);
  return productos.data;
}

export async function getProducto(idProducto) {
  const producto = await axios.get(`${BASE_URL}/productos/${idProducto}`);
  return producto.data;
}

export async function getPublicacionesProducto(idProducto) {
  const publicaciones = await axios.get(`${BASE_URL}/publicaciones`);
  let filtered = publicaciones.data;
  filtered = filtered.filter(publicacion => publicacion.id_producto === idProducto);
  filtered = filtered.filter(publicacion => publicacion.estado.toLowerCase() === "disponible");
  return filtered;
}