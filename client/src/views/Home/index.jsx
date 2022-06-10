import React from "react";
import { Container, Row } from "react-bootstrap";
import Feature from "../../components/Feature";
import Hero from "../../components/Hero";
import "./styles.css";

const Home = () => {
  return (
    <Container>
      <Hero />
      <Container className="service-container pt-5 pb-5">
        <Feature />
      </Container>
    </Container>
  );
};

export default Home;
