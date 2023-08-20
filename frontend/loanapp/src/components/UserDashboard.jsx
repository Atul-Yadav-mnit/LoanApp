import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import apply_loan from "../assets/apply_loan.jpg"
import view_loans from "../assets/view_loan.jpg";
import view_items from "../assets/view_items.jpg";

function UserDashboard() {
  const [user, setUser] = React.useState("");
  React.useEffect(() => {
    const loggedInUser = sessionStorage.getItem("username");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, [user]);

  return (
    <Container className="d-flex justify-content-center align-items-center h-100">
      <Row className="w-80 d-flex">
        <Col>
          <Card className="h-100">
            <Card.Img variant="top" src={view_loans} /> 
            <Card.Body>
              <Card.Title>
                <Link to={`/loan/${user}/all`}>
                  <Button variant="primary">View Loans</Button>
                </Link>
              </Card.Title>
              <Card.Text>View all your loans here.</Card.Text>
            </Card.Body>
            {/* <Card.Footer>
          {/* <small className="text-muted">Last updated 3 mins ago</small> }
        </Card.Footer> */}
          </Card>
        </Col>
        <Col>
          <Card className="h-100">
          <Card.Img variant="top" src={apply_loan} /> 
            <Card.Body>
              <Card.Title>
                <Link to="/loan/apply">
                  <Button variant="primary">Apply Loans</Button>
                </Link>
              </Card.Title>
              <Card.Text>Apply for a new loan here.</Card.Text>
            </Card.Body>
            {/* <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer> */}
          </Card>
        </Col>
        <Col>
          <Card className="h-100">
          <Card.Img variant="top" src={view_items} /> 
            <Card.Body>
              <Card.Title>
                <Link to="/items">
                  <Button variant="primary">Item Purchaces</Button>
                </Link>
              </Card.Title>
              <Card.Text>View all your item purchaces here.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UserDashboard;
