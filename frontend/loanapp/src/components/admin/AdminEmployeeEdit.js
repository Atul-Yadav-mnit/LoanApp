import React from 'react'
import {  Modal, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/react"
import { Heading, Text } from "@chakra-ui/react"
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { SimpleGrid } from "@chakra-ui/react"
import { Stack, HStack } from "@chakra-ui/react"
import { EditIcon, DeleteIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons"
import { deleteEmployee, editEmployee, getAllEmployees } from '../../api/service';
import { successToast, failureToast } from "../../utils/ToastUtils";

function AdminEmployeeEdit() {
  const userName = sessionStorage.getItem("username");
  const [employees, setEmployees] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);

  const [editingEmployee, setEditingEmployee] = useState({
    employeeID: "",
    employeeName: "",
    department: "",
    designation: "",
    gender: "",
    dateOfBirth: "",
    dateOfJoining: ""
  })

  const [errors, setErrors] = useState({
    employeeID: "",
    employeeName: "",
    department: "",
    designation: "",
    gender: "",
    dateOfBirth: "",
    dateOfJoining: ""
  })

  const validateFields = () => {
    let newErrors = {};
  
    if (!editingEmployee.employeeID) {
      newErrors.employeeID = "Employee ID is required";
    }
  
    if (!editingEmployee.employeeName) {
      newErrors.employeeName = "Employee Name is required";
    }
  
    if (!editingEmployee.department) {
      newErrors.department = "Department is required";
    }
  
    if (!editingEmployee.designation) {
      newErrors.designation = "Designation is required";
    }
  
    if (!editingEmployee.gender) {
      newErrors.gender = "Gender is required";
    } else if (editingEmployee.gender !== "M" && editingEmployee.gender !== "F") {
      newErrors.gender = "Gender must be 'M' or 'F'";
    }
  
    if (!editingEmployee.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required";
    } else {
      const currentDate = new Date();
      const dob = new Date(editingEmployee.dateOfBirth);
      if (dob >= currentDate) {
        newErrors.dateOfBirth = "Date of Birth must be before the current date";
      }
    }
  
    if (!editingEmployee.dateOfJoining) {
      newErrors.dateOfJoining = "Date of Joining is required";
    } else {
      const currentDate = new Date();
      const doj = new Date(editingEmployee.dateOfJoining);
      if (doj >= currentDate) {
        newErrors.dateOfJoining = "Date of Joining must be before the current date";
      }
    }
  
    setErrors(newErrors);
    console.log(newErrors);
    return Object.values(newErrors).every(error => error === "");
  };

  useEffect(() => {
    fetchAllEmployee();
  }, []);

  const fetchAllEmployee = () => {
    getAllEmployees(userName)
      .then((res) => {
        if(res.data.body.length == 0)
        {
          successToast(res.data.message)
        }
        setEmployees(res.data.body);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        failureToast("Error encountered: " + err.response.data.message);
      });
  }
  

  const handleDelete = (id) => {

    deleteEmployee(userName, id)
      .then((res) => {
        successToast(res.data.message);
        fetchAllEmployee();
      })
      .catch((err) => {
        failureToast("Error encountered: " + err.response.data.message);
      });
  }

  const handleEdit = (id) => {

    const filteredEmployee = employees.filter((employee) => id === employee.employeeID);
    if(filteredEmployee.length == 0){
      failureToast("Invalid Employee selected to edit!")
    }

    setEditingEmployee(filteredEmployee[0]);
    handleOpen();
  }

  const handleChange = (e) => {
    setEditingEmployee({
      ...editingEmployee,
      [e.target.name] : e.target.value
    });
  }

  const handleEditSubmit =()=>{
    const isValid = validateFields();
    console.log("isvalid", isValid);
    if (!isValid) {
      return;
    }

    const requestBody = editingEmployee;
    editEmployee(userName, editingEmployee.employeeID, requestBody)
      .then((res) => {
        successToast(res.data.message);
        fetchAllEmployee();
        handleClose();
      })
      .catch((err) => {
        failureToast("Error encountered: " + err.response.data.message);
      });
  }

  const handleClose = () => setShowEditForm(false);
  const handleOpen = () => setShowEditForm(true);


  return (
    
    <>
    <Modal show={showEditForm} onHide={handleClose}
      zindex="299"
      >
      <Modal.Header closeButton>
        <Modal.Title>Edit Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => e.preventDefault()} className="p-3 bg-light align-items-center" style={{ width: '50%' }} noValidate>
          <Form.Group controlId="id">
            <Form.Label>Employee Id</Form.Label>
            <Form.Control
              type="text" 
              name="employeeID"
              value={editingEmployee.employeeID}
              disabled
            />

          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              name="employeeName"
              value={editingEmployee.employeeName}
              isInvalid={errors.employeeName}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">{errors.employeeName}</Form.Control.Feedback> 
          </Form.Group>
          <Form.Group controlId="designation">
            <Form.Label>Designation</Form.Label>
            <Form.Control
              type="text"
              placeholder="Designation"
              name="designation"
              value={editingEmployee.designation}
              isInvalid={errors.designation}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">{errors.designation}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="department">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Department"
              name="department"
              value={editingEmployee.department}
              isInvalid={errors.department}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">{errors.department}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="gender">
               <Form.Label>Gender</Form.Label>
               <div>
                 <Form.Check
                   type="radio"
                   label="Male"
                   name="gender"
                   value="M"
                   checked={editingEmployee.gender === 'M'}
                   onChange={handleChange}
                   isInvalid={errors.gender}
                   inline
                 />
                 <Form.Check
                   type="radio"
                   label="Female"
                   name="gender"
                   value="F"
                   checked={editingEmployee.gender === 'F'}
                   onChange={handleChange}
                   isInvalid={errors.gender}
                   inline
                 />
               </div>
            <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
             </Form.Group>

             <Form.Group controlId="dob">
               <Form.Label>Date of Birth</Form.Label>
               <Form.Control
                 type="date"
                 value={editingEmployee.dateOfBirth}
                 isInvalid={errors.dateOfBirth}
                 name="dateOfBirth"
                 onChange={handleChange}
               />
            <Form.Control.Feedback type="invalid">{errors.dateOfBirth}</Form.Control.Feedback>
             </Form.Group>

             <Form.Group controlId="doj">
               <Form.Label>Date of Joining</Form.Label>
               <Form.Control
                 type="date"
                 value={editingEmployee.dateOfJoining}
                 isInvalid={errors.dateOfJoining}
                 name="dateOfJoining"
                 onChange={handleChange}
               />
            <Form.Control.Feedback type="invalid">{errors.dateOfJoining}</Form.Control.Feedback>
             </Form.Group>
           </Form>
         </Modal.Body>
         <Modal.Footer>
           <Button variant="ghost" colorScheme="red" onClick={handleClose}> <CloseIcon/> Close</Button>
           <Button variant="ghost" colorScheme="green"onClick={handleEditSubmit}> <CheckIcon/> Save Changes</Button>
         </Modal.Footer>
      </Modal>

      <div className=" justify-content-center align-items-center"style={{ paddingTop: '2em',paddingLeft:'1rem',width: '90%' }}>
        <SimpleGrid columns={1} spacing={1} >
        <Card borderBottomWidth="1px" align="flex-start" borderRadius="lg" textAlign="left" direction={{ base: 'column', sm: 'row' }}
          overflow='hidden'
          variant='outline'
          position="sticky"
          top="1"
          zIndex="199"
          padding="0.5em"
          boxShadow="lg"
          backgroundColor="gray.100"
          marginTop="3rem"
        >
          <CardHeader
            fontSize="md"
            fontWeight="bold"
            width="9em"
            >
            Employee ID
            </CardHeader>
            <CardBody fontSize="md" fontWeight="semibold" >
              Employee Details
            </CardBody>
            
          </Card>
          {employees.map((employee) => (
            <Card borderBottomWidth="1px" align="left" borderRadius="lg" textAlign="left" direction={{ base: 'column', sm: 'row' }}
              
              variant='outline'
              >
              <CardHeader
                fontSize="md"
                fontWeight="bold"
                width="7em"
                >
                {employee.employeeID}
              </CardHeader>
              <CardBody fontSize="md"  >
                <Text> Employee Name: {employee.employeeName}</Text>  
                <Text> Designation: {employee.designation}</Text>
                <Text> Department: {employee.department}</Text>
              </CardBody>
              <CardBody fontSize="md"  >
                <Text> Gender: {employee.gender}</Text>
                <Text> Date of Birth: {employee.dateOfBirth}</Text>
                <Text> Date of Joining: {employee.dateOfJoining}</Text>
              </CardBody>
              <CardFooter fontSize="md" fontWeight="semibold">
                <HStack >
                  <Button variant='ghost' colorScheme="blue" onClick={() => handleEdit(employee.employeeID)}> <EditIcon/> Edit</Button>
                  <Button variant='ghost' colorScheme="red" onClick={() => handleDelete(employee.employeeID)}> <DeleteIcon/> Delete</Button>
                </HStack>
              </CardFooter>

              </Card>
          ))}
        </SimpleGrid>
      </div>
    </>
  )
}

export default AdminEmployeeEdit;