import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import { Col, Container, Form, Row } from "react-bootstrap";
import "./styles.css";
import axios from "axios";

const GenericForm = () => {
  const [countries, setCountries] = useState([]);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    street: Yup.string().required("Street Address is required"),
    apt: Yup.string().required("Apt / Floor/ Suite is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    zip: Yup.number().required("Zip / zip Code is required"),
    state: Yup.string().required("State is required"),
    phone: Yup.number().required("Phone is required"),
    email: Yup.string()
      .required("Email is required.")
      .email("Email is invalid"),
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Password must be at least 6 characters.")
      .max(20, "Password must not exceed 20 characters."),
    acceptTerms: Yup.bool().oneOf([true], "Accept terms is required."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
  };

  useEffect(() => {
    const countryList = async () => {
      try {
        const res = await axios.get(`https://restcountries.com/v3.1/all`);
        setCountries(res.data);
      } catch (err) {}
    };
    countryList();
  }, []);

  // useEffect(() => {
  //   const userCountry = async () => {
  //     try {
  //       const res = await axios.get(`http://ipinfo.io`);
  //       setCurrentCountry(res.data);
  //     } catch (err) {}
  //   };
  //   userCountry();
  // }, []);

  return (
    <Container className="pt-5 register-form">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="text-center mb-5">
          <h6>CREATE AN ACCOUNT</h6>
        </Row>
        <Row>
          <Col>
            <p style={{ fontSize: 12 }}>YOUR LOGIN INFORMATION</p>
            <Form.Group className="mb-5" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="*Email address"
                {...register("email")}
                className={`shadow-none ${errors.email ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </Form.Group>
          </Col>
          <Col>
            <p style={{ fontSize: 12, textAlign: "right" }}>Required *</p>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="*Password"
                {...register("password")}
                className={`shadow-none ${errors.password ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </Form.Group>
            <p style={{ fontSize: 12 }}>
              Your password must contain at least 6 characters without spaces
              with letters, at least one number, one capital letter, and one
              special character.
            </p>
          </Col>
        </Row>
        <Row>
          <p style={{ fontSize: 12 }}>SHIPPING ADDRESS</p>
          <Col>
            <Form.Group className="mb-5" controlId="formBasicText">
              <Form.Control
                type="text"
                placeholder="*First Name"
                {...register("firstName")}
                className={`shadow-none ${
                  errors.firstName ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.firstName?.message}
              </div>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-5" controlId="formBasicText">
              <Form.Control
                type="text"
                placeholder="*Last Name"
                {...register("lastName")}
                className={`shadow-none ${errors.lastName ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.lastName?.message}</div>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-5" controlId="formBasicText">
          <Form.Select
            {...register("country")}
            className={`shadow-none form-control ${
              errors.country ? "is-invalid" : ""
            }`}
          >
            <option>Philippines</option>
            <option>United States</option>
            {countries.map((country) => (
              <option>{country.name.common}</option>
            ))}
          </Form.Select>
          <div className="invalid-feedback">{errors.country?.message}</div>
        </Form.Group>
        <Form.Group className="mb-5" controlId="formBasicText">
          <Form.Control
            type="text"
            placeholder="*Street Address (No P.O. Box)"
            {...register("street")}
            className={`shadow-none ${errors.street ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.street?.message}</div>
        </Form.Group>
        <Form.Group className="mb-5" controlId="formBasicText">
          <Form.Control
            type="text"
            placeholder="*Apt / Floor / Suite"
            {...register("apt")}
            className={`shadow-none ${errors.apt ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.apt?.message}</div>
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-5" controlId="formBasicText">
              <Form.Control
                type="text"
                placeholder="*City"
                {...register("city")}
                className={`shadow-none ${errors.city ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.city?.message}</div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Control
                type="text"
                placeholder="*Zip / Postal Code"
                {...register("zip")}
                className={`shadow-none ${errors.zip ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.zip?.message}</div>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-5" controlId="formBasicText">
              <Form.Control
                type="text"
                placeholder="*State / Province"
                {...register("state")}
                className={`shadow-none ${errors.state ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.state?.message}</div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Control
                type="text"
                placeholder="*Phone"
                {...register("phone")}
                className={`shadow-none ${errors.phone ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.phone?.message}</div>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-5 terms-check" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="I have read the privacy policy and consent to the processing of my personal data in order for my account to be created. I wish to receive promotions and coupons. I wish to receive Fashion & Accessories news."
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="btn-register mb-5">
          CREATE AN ACCOUNT
        </Button>
      </Form>
      <p className="terms-check">
        By clicking on “Create an Account” you confirm you have read the Privacy
        Statement and consent to the processing of your personal data by AMFM
        for the management of your account, and AMFM client relationship in the
        conditions set forth in the Privacy Statement available in the footer
        and accessible here. By clicking on "Save" once your profile is
        completed and by validating the "Contact options", AMFM Couture and / or
        Parfums AMFM can contact you for communications purposes, including
        direct marketing, which may be tailored based on the personal data we
        know about you and your preferences. In order to provide you with the
        same personalized service worldwide, your personal data may be
        communicated to AMFM entities in France and abroad. As per applicable
        laws and regulations, you are entitled to access, correct and delete any
        data that may relate to you. You may also ask us not to send you
        personalized communications on our products and services. You may
        exercise these rights at any time directly in the menu “My Account”, or
        contacting us as set forth in our Privacy Statement.
      </p>
    </Container>
  );
};

export default GenericForm;
