import React, { Component, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import CreatePublicacion from "./components/dashboard/createPublicacion";
import Dashboard from "./components/dashboard/dashboard";
import Home from "./components/home/home";
import SignIn from "./components/login/login";
import Marketplace from "./components/marketplace/marketplace";
import Posts from "./components/posts/posts";
import NavBar from "./components/navbar/navbar";
import PublicacionesProducto from "./components/producto/producto";
import useUser from "./hooks/useUser";
import Publicacion from "./components/publicaciones/publicacion";

export default function AppRouter() {
  const [user, setUser] = useUser();
  return (
    <BrowserRouter>
      <NavBar user={user} />
      <Switch>
        {user && <Route path='/user/createPublicacion' component={() => <CreatePublicacion user={user} setUser={setUser} />}></Route>}
        {user && <Route path='/user' component={() => <Dashboard user={user} setUser={setUser} />}></Route>}
        <Route path='/productos/:id' component={() => <PublicacionesProducto user={user} />} />
        {!user && <Route path='/publicaciones/:id' component={() => <SignIn redirectPrefix={"/publicaciones"} setUser={setUser} user={user} />} />}
        {user && <Route path='/publicaciones/:id' component={() => <Publicacion user={user} setUser={setUser} />} />}
        <Route path="/login" component={() => <SignIn user={user} setUser={setUser} />}></Route>
        <Route path='/marketplace' component={() => <Marketplace user={user} />} />
        <Route path='/' component={() => <Home user={user} />} />
      </Switch>
    </BrowserRouter>
  );
}
