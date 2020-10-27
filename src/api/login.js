import Axios from "axios";
import axios from "axios";


const BASE_URL="https://gaymers06.herokuapp.com/usuarios/login";


// THIS IS REALLY BAD, MAN
export async function ultraUnsafeLogin({email, password}) {
  const query = await axios.post(BASE_URL, {
    "correo": email,
    "contrasenia": password,
  });
  return query.data;
}