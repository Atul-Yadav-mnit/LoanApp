import React, { useState, useEffect} from 'react'
import { Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { extendTheme } from "@chakra-ui/react"
import { Heading, Text } from "@chakra-ui/react"
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { SimpleGrid } from "@chakra-ui/react"
import { Stack, HStack } from "@chakra-ui/react"
import { EditIcon, DeleteIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons"
import { successToast, failureToast } from "../../utils/ToastUtils";

import { deleteLoanCard, editLoanCard, getAllLoanCards } from '../../api/service';



function AdminLoanEdit() {
  const userName = sessionStorage.getItem("username");
  const [loanCards, setLoanCards] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);

  const [editingLoanId, setEditingLoanId] = useState("");
  const [editingLoanType, setEditingLoanType] = useState("");
  const [editingDurationOfYears, setEditingDurationOfYears] = useState(0);

  const [errors, setErrors] = useState({
    durationOfYears: ""
  });

  useEffect(() => {
    fetchAllLoanCards();
}, []);

  const fetchAllLoanCards = () => {
    getAllLoanCards()
        .then((res) => {
          if(res.data.body.length == 0)
          {
            successToast(res.data.message)
          }
            setLoanCards(res.data.body);
            //console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
            failureToast("Error encountered: " + err.response.data.message);
        });
  }

  const handleDelete = (loanId) => {
    deleteLoanCard(userName, loanId)
    .then((res) => {
      successToast(res.data.message);
      fetchAllLoanCards();
    }).catch((err) => {
      console.log(err);
      failureToast("Error encountered: " + err.response.data.message);
    });
  }

  const handleEdit = (loanId) => {
    const filteredLoanCards = loanCards.filter((loanCard) => loanId == loanCard.loanId);
    if (filteredLoanCards.length == 0) {
      failureToast("invalid loan card selected to edit");
    }
    const editingLoanCard = filteredLoanCards[0];
    setEditingLoanId(editingLoanCard.loanId);
    setEditingLoanType(editingLoanCard.loanType);
    setEditingDurationOfYears(editingLoanCard.durationOfYears);
    handleOpen();
  }

  const validateFields = () => {
    const newErrors = {};
    if (!editingDurationOfYears) {
      newErrors.durationOfYears = "Loan Duration cannot be empty";
    } else if (editingDurationOfYears <= 0) {
      newErrors.durationOfYears = "Loan duration must be a positive integer";
    }
    setErrors(newErrors);
    console.log(newErrors);
    return Object.values(newErrors).every(error => error === "");
  }

  const handleEditSubmit = () => {
      const isValid = validateFields();
      if (!isValid) {
        return;
      }

      const requestBody = {
        loanId: editingLoanId,
        loanType: editingLoanType,
        durationOfYears: editingDurationOfYears
      };
      editLoanCard(userName, editingLoanId, requestBody)
      .then((res) => {
        successToast(res.data.message);
        fetchAllLoanCards();
        handleClose();
      }).catch((err) => {
        console.log(err);
        failureToast("Error encountered: " + err.response.data.message);
      });
  }

  const handleClose = () => setShowEditForm(false);
  const handleOpen = () => setShowEditForm(true);

return (
  <>
  
    
    <Modal show={showEditForm} onHide={handleClose}
      zIndex="299"
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Loan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => e.preventDefault()} className="p-3 bg-light align-items-center" >
          <Form.Group controlId="loanType">
            <Form.Label>Loan Id</Form.Label>
            <Form.Control
              type="text"
              value={editingLoanId}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="loanType">
            <Form.Label>Loan Type</Form.Label>
            <Form.Control
              type="text"
              value={editingLoanType}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="durationOfYears">
            <Form.Label>Duration in Years</Form.Label>
            <Form.Control
              type="number"
              value={editingDurationOfYears}
              onChange={(e) => setEditingDurationOfYears(e.target.value)}
              isInvalid={errors.durationOfYears}
            />  
            <Form.Control.Feedback type="invalid">{errors.durationOfYears}</Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline" colorScheme="red" onClick={handleClose}>
          <CloseIcon />
          Close
        </Button>
        <Button variant="outline" colorScheme="green" onClick={handleEditSubmit}>
          <CheckIcon />
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    <div className="d-flex justify-content-center align-items-center" style={{ paddingTop: '2em', width:'100%', }}>
      <SimpleGrid columns={1} spacing={2}>
        <Card borderBottomWidth="10px" align="flex-start" borderRadius="lg" textAlign="left" direction={{ base: 'column', sm: 'row' }}
          overflow='hidden'
          variant='outline'
          position="sticky"
          top="16"
          zIndex="199"
          boxShadow="lg"
          backgroundColor="gray.100"
        >
          <CardHeader fontsize="md" fontWeight="bold" width="10em"> Loan ID</CardHeader>
          <CardHeader fontsize="md" fontWeight="bold" width="10em"> Loan Type</CardHeader>
          <CardHeader fontsize="md" fontWeight="bold" width="10em"> Duration of Years</CardHeader>
          <CardHeader fontsize="md" fontWeight="bold" width="10em"> Actions</CardHeader>
        </Card>
        {loanCards.map((loanCard) => (
          <Card borderBottomWidth="10px" align="flex-start" borderRadius="lg" textAlign="left" direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
          >
            <CardHeader fontsize="md" width="10em">{loanCard.loanId}</CardHeader>
            <CardHeader fontsize="md" width="10em">{loanCard.loanType}</CardHeader>
            <CardHeader fontsize="md" width="10em">{loanCard.durationOfYears}</CardHeader>
            <CardFooter paddingInline={10}>
              <Stack direction="row" spacing={6} align="center">
                <Button variant="ghost" size="sm" colorScheme="blue" onClick={() => handleEdit(loanCard.loanId)}> <EditIcon /> Edit</Button>
                <Button variant="ghost" size="sm" colorScheme="red" onClick={() => handleDelete(loanCard.loanId)}> <DeleteIcon /> Delete</Button>
              </Stack>

            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </div>
    
          
  </>)
}

export default AdminLoanEdit