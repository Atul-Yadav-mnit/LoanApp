import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router';

function AdminLoanAdd() {
  const userName = sessionStorage.getItem("username");
  const [loanType, setLoanType] = useState("");
  const [durationOfYears, setDurationOfYears] = useState("");
  const navigate = useNavigate();

  const addLoanCard = () => {
    axios.post(`http://localhost:8080/loanCard/add?userName=${userName}`, {
      loanType,
      durationOfYears
    }).then((res) => {
      alert("new loan type created with id " + res.data.loanId);
      navigate("/admin/loan/edit");
    }).catch((err) => {
      alert("error " + err);
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addLoanCard();
  }

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Form onSubmit={handleSubmit} className="p-3 bg-light align-items-center" style={{ width: '50%' }}>
        <h3 className="text-warning bg-danger text-center mb-3">Add New Loan Type</h3>
        
        
        <Form.Group controlId="loanType">
          <Form.Label>Loan Type</Form.Label>
          <Form.Control
            type="text"
            value={loanType}
            onChange={(e) => setLoanType(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="durationOfYears">
          <Form.Label>Duration in Years</Form.Label>
          <Form.Control
            type="number"
            value={durationOfYears}
            onChange={(e) => setDurationOfYears(e.target.value)}
          />
        </Form.Group>
        

        <div className="text-center">
          <Button variant="primary" type="submit">
            Add New Loan
          </Button>
        </div>
      </Form>
    </Container>
    )
}

export default AdminLoanAdd