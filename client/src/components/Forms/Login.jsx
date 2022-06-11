import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Form, Row, Button } from "react-bootstrap";
import "./styles.css";
import { login } from "../../redux/actions/auth";
import toast, { Toaster } from "react-hot-toast";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required.")
      .email("Email is invalid"),
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Password must be at least 6 characters.")
      .max(20, "Password must not exceed 20 characters."),
  });

  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);
    dispatch(login(email, password))
      .then(() => {
        props.history.push("/profile");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });

    notify();
  };

  //TODO : SETUP TOAST
  const notify = () => {
    return message === "200"
      ? toast.success("Account verified!")
      : toast.error("Something went wrong. Please try again.");
  };

  return (
    <Form>
      <Row className="text-center mb-5">
        <h6>LOGIN</h6>
        <p style={{ fontSize: 12 }}>To access your account</p>
      </Row>
      <Row>
        <Form.Group className="mb-5" controlId="formBasicEmail">
          <Form.Control
            type="email"
            name="email"
            placeholder="*Email address"
            {...register("email")}
            className={`shadow-none ${errors.email ? "is-invalid" : ""}`}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group className="mb-5" controlId="formBasicPassword">
          <Form.Control
            type="password"
            name="password"
            placeholder="*Password"
            {...register("password")}
            className={`shadow-none ${errors.password ? "is-invalid" : ""}`}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </Form.Group>
      </Row>
      <Row className="m-auto">
        <Button
          variant="primary"
          type="submit"
          className="btn-login mb-5"
          disabled={loading}
          onClick={handleLogin}
        >
          {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          SIGN IN
        </Button>
      </Row>
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
    </Form>
  );
};

export default Login;
