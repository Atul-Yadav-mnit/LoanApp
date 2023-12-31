import React, { useEffect, useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { successToast, failureToast } from "../../utils/ToastUtils";
import { Button } from "@chakra-ui/react"
import { addEmployee } from '../../api/service';

const AdminEmployeeAdd = ({user}) => {
  const [userDetails, setUserDetails] = useState({
    employeeName:"",
    designation:"",
    department:"",
    gender:"",
    dateOfJoining:"",
    dateOfBirth:"",
    password:"" 
  });
  const userName = sessionStorage.getItem('userName');
  const [errors, setErrors] = useState({
    name: '',
    designation: '',
    department: '',
    gender: '',
    dob: '',
    doj: '',
    password: ''
  });
  const validateFields = () => {
    let newErrors = {};
    if(!userDetails.employeeName || userDetails.employeeName === '') {
      newErrors['name'] = 'Name cannot be empty';
    }
    if (!userDetails.designation || userDetails.designation === '') {
      newErrors['designation'] = 'Designation cannot be empty';
    }
    if (!userDetails.department || userDetails.department === '') {
      newErrors['department'] = 'Department cannot be empty';
    }
    if(!userDetails.dateOfBirth || userDetails.dateOfBirth === '' || new Date(userDetails.dateOfBirth) > new Date()) {
      newErrors['dob']='Please enter a valid date of birth'
    }
    if(!userDetails.dateOfJoining || userDetails.dateOfJoining === '' || new Date(userDetails.dateOfJoining) > new Date()) {
      newErrors['doj']='Please enter a valid date of joining'
    }
    if(!userDetails.password || userDetails.password === '' || userDetails.password.length < 8) {
      newErrors['password']='Password should be atleast 8 characters long'
    }
    setErrors(newErrors);
    return Object.keys(newErrors).every(x => newErrors[x] === '');
  }

 const handleChanges = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.id]: e.target.value
    });
  }

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const errorsVal = validateFields();
    if(!errorsVal) {
      return;
    }
    addEmployee(userDetails)
      .then((res) => {
        successToast("Employee created with ID: " + res.data.body.employee.employeeID);
        navigate("/admin/employee/edit");
        console.log(JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
        failureToast("Error encountered: " + err.response.data.message);
      });

  };

  return (
    <Container className="d-flex justify-content-center align-items-center ">
      <Form onSubmit={handleSubmit} className="p-3 bg-light align-items-center form-inline" style={{ width: '50%',marginTop:'30px',borderRadius:'10px' }}>
        <h3 className="text-danger text-center mb-3">Add New Employee</h3>
        <Form.Group controlId="employeeName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={userDetails.employeeName}
            onChange={handleChanges}
            isInvalid={errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="designation">
          <Form.Label>Designation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Designation"
            value={userDetails.designation}
            onChange={handleChanges}
            isInvalid={errors.designation}
          />
          <Form.Control.Feedback type="invalid">
            {errors.designation}  
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="department">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            placeholder="Department"
            value={userDetails.department}
            onChange={handleChanges}
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
              checked={userDetails.gender==='M'}
              onChange={handleChanges}
              inline
            />
            <Form.Check
              type="radio"  
              label="Female"
              name="gender"
              value="F"
              checked={userDetails.gender==='F'}
              onChange={handleChanges}
              inline
            />
          </div>
          </Form.Group>
          <Form.Group controlId="dateOfBirth">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            value={userDetails.dateOfBirth}
            onChange={handleChanges}
            isInvalid={errors.dob}
          />
          <Form.Control.Feedback type="invalid">
            {errors.dob}
          </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="dateOfJoining">
          <Form.Label>Date of Joining</Form.Label>
          <Form.Control

            type="date"
            value={userDetails.dateOfJoining}
            onChange={handleChanges}
            isInvalid={errors.doj}
          />
          <Form.Control.Feedback type="invalid">
            {errors.doj}
          </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password" 
            placeholder="Password"
            value={userDetails.password}
            onChange={handleChanges}
            isInvalid={errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
          </Form.Group>
          <div className="text-center pt-2">
          <Button colorScheme="blue" variant="outline" type="submit">  
            Add
          </Button>
          
        </div>
      </Form>
    </Container>
  );
};

export default AdminEmployeeAdd;
