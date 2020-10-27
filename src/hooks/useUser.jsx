import {useState, useEffect} from "react";

export default function useUser() {
  const [user, setUser] = useState(
    localStorage.getItem("usuario") && localStorage.getItem("usuario") !== "undefined" ? JSON.parse(localStorage.getItem("usuario")) : undefined,
  );
  const setUsuario = (usuario) => {
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setUser(usuario);
  }
  return [user, setUsuario];
}