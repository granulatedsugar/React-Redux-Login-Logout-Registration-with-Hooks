import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Service from "../Service";
import "./styles.css";

const Feature = () => {
  return (
    <Container fluid className="p-0 m-auto">
      <Row className="d-flex align-items-center justify-content-evenly">
        <Col sm={12} lg={2} className="d-flex flex-column flex-wrap">
          <span className="feature-title">Discover Services</span>
          <span className="feature-caption">FOR EVERY JEWELRY</span>
        </Col>
        <Col
          xs={12}
          sm={12}
          lg={10}
          className="d-flex flex-wrap justify-content-between"
        >
          <Service />
        </Col>
      </Row>
    </Container>
  );
};

export default Feature;
