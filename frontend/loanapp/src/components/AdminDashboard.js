import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import item_management from "../assets/item_management.webp";
import loan_management from "../assets/loan_management.webp";
import customer_management from "../assets/customer_management.webp";

function AdminDashboard() {
  // const [admin, setAdmin] = useState();
  // const [user, setUser] = React.useState("");
  // React.useEffect(() => {
  //     const loggedInUser = sessionStorage.getItem("username");
  //     if (loggedInUser) {
  //         setUser(loggedInUser);
  //     }
  // }, [user]);

  return (
    <Container className="d-flex justify-content-center pt-5 mt-5 align-items-center h-100">
      <Row className="w-80 my-2 d-flex gx-5"  >
        <Col py={2} md={4} sm={12}>
          <Card style={{marginTop:'7px'}}>
            <Card.Img variant="top" src={customer_management} />
            <Card.Body>
              <Card.Title>
                <Card.Text>Customer Data Management</Card.Text>
              </Card.Title>
              <Link to="/admin/employee/add" style={{ padding: "10px" }}>
                <Button variant="success">Add Employee</Button>
              </Link>
              <Link to="/admin/employee/edit" style={{ padding: "10px" }}>
                <Button variant="info">Edit Employee</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col py={2} md={4} sm={12}>
          <Card  style={{marginTop:'7px'}}>
            <Card.Img variant="top" src={loan_management} />
            <Card.Body>
              <Card.Title>
                <Card.Text>Loan Card Management</Card.Text>
              </Card.Title>
              <Link to="/admin/loan/add" style={{ padding: "10px" }}>
                <Button variant="success">Add Loan Card</Button>
              </Link>
              <Link to="/admin/loan/edit" style={{ padding: "10px" }}>
                <Button variant="info">Edit Loan Card</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col py={2} md={4} sm={12}>
          <Card  style={{marginTop:'7px'}}>
            <Card.Img variant="top" src={item_management} />
            <Card.Body>
              <Card.Title>
                <Card.Text>Item Data Management</Card.Text>
              </Card.Title>
              <Link to="/admin/item/add" style={{ padding: "10px" }}>
                <Button variant="success">Add Items</Button>
              </Link>
              <Link to="/admin/item/edit" style={{ padding: "10px" }}>
                <Button variant="info">Edit Items</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
