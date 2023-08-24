import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginAdmin, loginEmployee } from "../api/service";

const Login = ({ user, role, loginUser }) => {
  const [submitAdmin, setSubmitAdmin] = useState(true);
  const [employeeID, setEmployeeID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);

  const [errors, setErrors] = useState({
    employeeID: "",
    password: "",
  });

  const validateFields = () => {
    let newErrors = {};
    if (!employeeID) {
      newErrors.employeeID = "Please enter Employee ID!";
    }
    if (!password) {
      newErrors.password = "Please enter your Password!";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  useEffect(() => {
    if (role === "admin") {
      navigate("/");
    } else if (role === "user") {
      navigate("/");
    }
  }, [user]);

  const handleUserLogin = (e) => {
    e.preventDefault();
    const isValid = validateFields();
    if (!isValid) {
      return;
    }

    const requestBody = {
      employeeID,
      password,
    };

    loginEmployee(requestBody)
      .then((res) => {
        alert(res.data.message);
        if (res.data.message.includes("successfull")) {
          loginUser(employeeID, "user");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error: " + err);
      });
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const isValid = validateFields();
    if (!isValid) {
      return;
    }

    const requestBody = {
      username: employeeID,
      password,
    };

    loginAdmin(requestBody)
      .then((res) => {
        alert(res.data.message);
        if (res.data.message.includes("Successfully")) {
          loginUser(employeeID, "admin");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error: " + err);
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center text-left h-100">
      <Form
        noValidate
        validated={validated}
        onSubmit={submitAdmin ? handleAdminLogin : handleUserLogin}
        className=" bg-light align-items-center"
        style={{ width: "40%", borderRadius: "10px" }}
      >
        <h3
          className="text-warning bg-danger text-center  mb-3 py-2 "
          style={{
            width: "100%",
            borderRadius: "10px 10px 0px 0px",
            overflow: "hidden",
          }}
        >
          Login
        </h3>
        <div className="p-4 text-left">
          <Form.Group controlId="employeeID">
            <Form.Label
              className="w-100 text-left"
              style={{ textAlign: "left", paddingLeft: "5px" }}
            >
              {" "}
              Employee ID
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Employee ID"
              value={employeeID}
              onChange={(e) => setEmployeeID(e.target.value)}
              isInvalid={errors.employeeID}
            />
            <Form.Control.Feedback type="invalid">
              {errors.employeeID}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="text-left w-90" controlId="password">
            <Form.Label
              className="text-left mt-3 w-100 ml-2 pl-2"
              style={{ textAlign: "left", paddingLeft: "5px" }}
            >
              Password
            </Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
            <br />
          </Form.Group>
          <div className="text-center">
            <Button
              variant="primary"
              type="submit"
              onClick={() => setSubmitAdmin(false)}
            >
              Login as User
            </Button>{" "}
            <Button variant="danger" type="submit">
              Login as Admin
            </Button>
            <p
              className="forgot-password text-right mt-2 "
              style={{ color: "blue", textDecoration: "underline" }}
            >
              <a href="#">Forgot password?</a>
            </p>
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
