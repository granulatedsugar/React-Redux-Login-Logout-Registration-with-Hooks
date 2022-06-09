import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import GenericForm from "../../components/Form";

const Signup = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs lg="2"></Col>
        <Col md="auto">
          <GenericForm />
        </Col>
        <Col xs lg="2"></Col>
      </Row>
    </Container>
  );
};

export default Signup;
