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
          style={{ width: "9.5rem", padding: "0px" }}
          className="service-card"
        >
          <Card.Img variant="top" src={service.img} />
          <Card.Body>
            <Card.Title className="card-title">{service.title}</Card.Title>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default Service;
