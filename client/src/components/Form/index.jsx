import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

const GenericForm = () => {
  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Full Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    username: Yup.string()
      .required("Username is required")
      .min(6, "Username must be at least 6 characters.")
      .max(20, "Username must not exceed 20 characters."),
    email: Yup.string()
      .required("Email is required.")
      .email("Email is invalid"),
    password: Yup.string()
      .required("Password is required.")
      .max(6, "Password must be at least 6 characters.")
      .max(20, "Password must not exceed 20 characters."),
    confirmPassword: Yup.string()
      .required("Please re-enter password.")
      .oneOf([Yup.ref("password"), null], "Password does not match"),
    acceptTerms: Yup.bool().oneOf([true], "Accept terms is required."),
  });

  const {
    register,
    handleSumit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default GenericForm;
