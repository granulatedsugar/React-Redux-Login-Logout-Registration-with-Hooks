import React from "react";
import { Container, Row } from "react-bootstrap";
import Hero from "../../components/Hero";
import Service from "../../components/Service";
import "./styles.css";

const Home = () => {
  return (
    <Container>
      <Hero />
      <Row className="text-center p-5">
        <span className="section-title">What can we help you with?</span>
      </Row>
      <Container className="service-container">
        <Row className="section-service">
          <Service />
        </Row>
      </Container>
    </Container>
  );
};

export default Home;
