import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../api/service";

const Register = ({ user, loginUser }) => {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [doj, setDoj] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user != null && user.length > 0) {
      navigate("/");
    }
  }, [user]);

  const [validated, setValidated] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    designation: "",
    department: "",
    gender: "",
    dateOfBirth: "",
    dateOfJoining: "",
    password: "",
  });

  const validateFields = () => {
    let newErrors = {};

    if (!name) {
      newErrors.name = "Employee Name is required";
    }

    if (!department) {
      newErrors.department = "Department is required";
    }

    if (!designation) {
      newErrors.designation = "Designation is required";
    }

    if (!gender) {
      newErrors.gender = "Gender is required";
    } else if (gender !== "M" && gender !== "F") {
      newErrors.gender = "Gender must be 'M' or 'F'";
    }

    if (!dob) {
      newErrors.dateOfBirth = "Date of Birth is required";
    } else {
      const currentDate = new Date();
      const dobTemp = new Date(dob);
      if (dobTemp >= currentDate) {
        newErrors.dateOfBirth = "Date of Birth must be before the current date";
      }
    }

    if (!doj) {
      newErrors.dateOfJoining = "Date of Joining is required";
    } else {
      const currentDate = new Date();
      const dojTemp = new Date(doj);
      if (dojTemp >= currentDate) {
        newErrors.dateOfJoining =
          "Date of Joining must be before the current date";
      }
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateFields();
    if (!isValid) {
      return;
    }

    const requestBody = {
      employeeName: name,
      designation,
      department,
      gender,
      dateOfBirth: dob,
      dateOfJoining: doj,
      password,
    };

    addEmployee(requestBody)
      .then((res) => {
        alert("Registered new employee with Id:" + res.data.body.employeeID);
        navigate("/login");
        console.log(JSON.stringify(res.data.body));
      })
      .catch((err) => {
        console.log(err);
        alert("Error: " + err);
      });
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center h-100">
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="bg-light align-items-center form-inline"
          style={{ width: "50%", borderRadius: "10px" }}
        >
          <h3
            className="text-warning bg-danger text-center  mb-3 py-2 "
            style={{
              width: "100%",
              borderRadius: "10px 10px 0px 0px",
              overflow: "hidden",
            }}
          >
            Register
          </h3>
          <div className="p-4 text-left">
            <Row>
              <Col>
                <Form.Group controlId="name" className="col">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    isInvalid={errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="designation" className="col">
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    isInvalid={errors.designation}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.designation}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="department">
              <Form.Label>Department</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                isInvalid={errors.department}
              />
              <Form.Control.Feedback type="invalid">
                {errors.department}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Male"
                  name="gender"
                  value="M"
                  checked={gender === "M"}
                  onChange={(e) => setGender(e.target.value)}
                  inline
                  isInvalid={errors.gender}
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  name="gender"
                  value="F"
                  checked={gender === "F"}
                  onChange={(e) => setGender(e.target.value)}
                  inline
                  isInvalid={errors.gender}
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ display: "block" }}
                >
                  {errors.gender}
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group controlId="dob">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    isInvalid={errors.dateOfBirth}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dateOfBirth}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="doj">
                  <Form.Label>Date of Joining</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    value={doj}
                    onChange={(e) => setDoj(e.target.value)}
                    isInvalid={errors.dateOfBirth}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dateOfJoining}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
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
            </Form.Group>
          </div>

          <div className="text-center">
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
            <p className="forgot-password mt-3">
              Already registered? <a href="/login">Login</a>
            </p>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Register;
