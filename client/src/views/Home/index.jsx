import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Feature from "../../components/Feature";
import Hero from "../../components/Hero";
import "./styles.css";
import UserService from "../../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);
  return (
    <Container>
      <Hero />
      <Container className="service-container pt-5 pb-5">
        <Feature />
      </Container>
      {content}
    </Container>
  );
};

export default Home;
