import React from "react";
import { Button, Carousel, Col, Row } from "react-bootstrap";
import { slider } from "../../data/hero.js";
import "./styles.css";

const Hero = () => {
  return (
    <Carousel>
      {slider.map((slide) => (
        <Carousel.Item>
          <Row style={{ background: `#${slide.bg}` }}>
            <Col className="m-auto hero-img">
              <img className="d-block hero" src={slide.img} alt="First slide" />
            </Col>
            <Col
              className="m-auto justify-content-center hero-text"
              style={{ color: `${slide.id % 2 === 0 ? "#FFF" : "#000"}` }}
            >
              <h3>{slide.title}</h3>
              <p>{slide.subTitle}</p>
              <Button
                className="slider-button"
                variant="link"
                style={{
                  color: `${slide.theme === "dark" ? "#000" : "#fff"}`,
                  backgroundColor: `${
                    slide.theme === "dark" ? "#FFF" : "#000"
                  }`,
                }}
              >
                Start a repair
              </Button>
            </Col>
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Hero;
