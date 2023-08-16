import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

function UserDashboard() {
  return (
    <Container className="d-flex justify-content-center align-items-center ">
    <CardGroup  style={{ width: '80%',marginTop:'30px',borderRadius:'10px' }}>
      <Card>
        
        <Card.Body>
          <Card.Title>
            
            <Link to="/loan/view">
                <Button variant="primary">View Loans</Button>
            </Link>
          </Card.Title>
          <Card.Text>
            View all your loans here.   
          </Card.Text>
        </Card.Body>
        {/* <Card.Footer>
          {/* <small className="text-muted">Last updated 3 mins ago</small> }
        </Card.Footer> */}
      </Card>
      <Card>
        
        <Card.Body>
          <Card.Title>
            
            <Link to="/loan/apply">
                <Button variant="primary">Apply Loans</Button>
            </Link>
          </Card.Title>
          <Card.Text>
            Apply for a new loan here.   
          </Card.Text>
        </Card.Body>
        {/* <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer> */}
      </Card>
      
      <Card>
        
        <Card.Body>
          <Card.Title>
            
            <Link to="/items">
                <Button variant="primary">Item Purchaces</Button>
            </Link>
          </Card.Title>
          <Card.Text>
            View all your item purchaces here.  
          </Card.Text>
        </Card.Body>
        
      </Card>
    </CardGroup>
    </Container>
  );
}

export default UserDashboard;