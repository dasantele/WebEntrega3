import { Container } from "@material-ui/core";
import React from "react";
import Homecarousel from "./carousel";
import Content from "./content";

const Home = (props) => {
  return <>
    <Homecarousel />
    <section id="content">
      <Container maxWidth="md">
        <Content />
      </Container>
    </section>
  </>;
};

export default Home;