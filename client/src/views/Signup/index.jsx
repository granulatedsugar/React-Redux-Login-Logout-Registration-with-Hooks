import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import GenericForm from "../../components/Forms/Registration";

const Signup = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <GenericForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
