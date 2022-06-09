import React from "react";
import { Card, Button } from "react-bootstrap";
import { services } from "../../data/services";
import { AiOutlinePlus } from "react-icons/ai";
import "./styles.css";

const Service = () => {
  return (
    <>
      {services.map((service) => (
        <Card
          style={{ width: "18rem", margin: "20px", padding: "0px" }}
          className="service-card"
        >
          <Card.Img className="service-image" variant="top" src={service.img} />
          <Card.Body>
            <Card.Title>{service.title}</Card.Title>
            <Card.Text>SKU:{service.sku}</Card.Text>
            <Card.Text>Starts from ${service.startPrice}.00</Card.Text>
            <Button variant="primary">Customize</Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default Service;
