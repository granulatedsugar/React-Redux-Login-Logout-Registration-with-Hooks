import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import { Col, Container, Form, Row } from "react-bootstrap";
import "./styles.css";
import axios from "axios";
import { register as registration } from "../../redux/actions/auth";
import toast, { Toaster } from "react-hot-toast";

const GenericForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCounrtry] = useState("");
  const [street, setStreet] = useState("");
  const [apt, setApt] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [countries, setCountries] = useState([]);
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    street: Yup.string().required("Street Address is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    zip: Yup.number().typeError("Zip / Postal Code is required"),
    state: Yup.string().required("State / Province is required"),
    phone: Yup.number()
      .typeError("A valid phone number is requried")
      .min(10, "Must be 10 characters"),
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
    setSuccessful(false);
    dispatch(
      registration(
        email,
        password,
        firstName,
        lastName,
        country,
        street,
        apt,
        city,
        state,
        zip,
        phone
      )
    )
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  useEffect(() => {
    const countryList = async () => {
      try {
        const res = await axios.get(
          `https://raw.githubusercontent.com/mledoze/countries/master/dist/countries.json`
        );
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </Form.Group>
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
                onChange={(e) => setFirstName(e.target.value)}
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
                onChange={(e) => setLastName(e.target.value)}
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
            onChange={(e) => setCounrtry(e.target.value)}
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
            onChange={(e) => setStreet(e.target.value)}
          />
          <div className="invalid-feedback">{errors.street?.message}</div>
        </Form.Group>
        <Form.Group className="mb-5" controlId="formBasicText">
          <Form.Control
            type="text"
            placeholder="Apt / Floor / Suite"
            {...register("apt")}
            className={`shadow-none`}
            onChange={(e) => setApt(e.target.value)}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-5" controlId="formBasicText">
              <Form.Control
                type="text"
                placeholder="*City"
                {...register("city")}
                className={`shadow-none ${errors.city ? "is-invalid" : ""}`}
                onChange={(e) => setCity(e.target.value)}
              />
              <div className="invalid-feedback">{errors.city?.message}</div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Control
                type="text"
                placeholder="*Zip / Postal Code"
                {...register("zip")}
                className={`shadow-none ${errors.zip ? "is-invalid" : ""}`}
                onChange={(e) => setZip(e.target.value)}
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
                onChange={(e) => setState(e.target.value)}
              />
              <div className="invalid-feedback">{errors.state?.message}</div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Control
                type="text"
                placeholder="*Phone"
                {...register("phone")}
                className={`shadow-none ${errors.phone ? "is-invalid" : ""}`}
                onChange={(e) => setPhone(e.target.value)}
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
        <Row className="m-auto">
          <Button variant="primary" type="submit" className="btn-register mb-5">
            CREATE AN ACCOUNT
          </Button>
        </Row>
        {message && (
          <div className="form-group">
            <div>
              {successful ? toast.success(message) : toast.error(message)}
              <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                  // Define default options
                  className: "",
                  duration: 5000,
                  style: {
                    background: "#363636",
                    color: "#fff",
                  },
                }}
              />
            </div>
          </div>
        )}
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
