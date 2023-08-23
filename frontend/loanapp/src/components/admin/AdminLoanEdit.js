import React, { useState, useEffect} from 'react'
import axios from 'axios';
import { Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/react"
import { Heading, Text } from "@chakra-ui/react"
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { SimpleGrid } from "@chakra-ui/react"
import { Stack, HStack } from "@chakra-ui/react"
import { EditIcon, DeleteIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons"

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  IconButton,
  Tooltip,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from "@chakra-ui/react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon
} from "@chakra-ui/icons";



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
    axios.get(`http://localhost:8080/loanCard/all`)
        .then((res) => {
            setLoanCards(res.data.body);
            //console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
            alert("Error: " + err);
        });
  }

  const handleDelete = (loanId) => {
    axios.delete(`http://localhost:8080/loanCard/${loanId}?userName=${userName}`)
    .then((res) => {
      alert(res.data.message);
      fetchAllLoanCards();
    }).catch((err) => {
      console.log(err);
      alert("Error: " + err);
    });
  }

  const handleEdit = (loanId) => {
    const filteredLoanCards = loanCards.filter((loanCard) => loanId == loanCard.loanId);
    if (filteredLoanCards.length == 0) {
      alert("invalid loan card selected to edit");
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
      axios.put(`http://localhost:8080/loanCard/${editingLoanId}?userName=${userName}`, requestBody)
      .then((res) => {
        alert(res.data.message);
        fetchAllLoanCards();
        handleClose();
      }).catch((err) => {
        console.log(err);
        alert("Error: " + err);
      });
  }

  const handleClose = () => setShowEditForm(false);
  const handleOpen = () => setShowEditForm(true);

  // function CustomTable({ columns, data }) {
  //   // Use the state and functions returned from useTable to build your UI
  //   const {
  //     getTableProps,
  //     getTableBodyProps,
  //     headerGroups,
  //     prepareRow,
  //     page, // Instead of using 'rows', we'll use page,
  //     // which has only the rows for the active page

  //     // The rest of these things are super handy, too ;)
  //     canPreviousPage,
  //     canNextPage,
  //     pageOptions,
  //     pageCount,
  //     gotoPage,
  //     nextPage,
  //     previousPage,
  //     setPageSize,
  //     state: { pageIndex, pageSize }
  //   } = useTable(
  //     {
  //       columns,
  //       data,
  //       initialState: { pageIndex: 2 }
  //     },
  //     usePagination
  //     );
  //   return (
  //     <>
  //       <Table {...getTableProps()}>
  //         <Thead>
  //           {headerGroups.map(headerGroup => (
  //             <Tr {...headerGroup.getHeaderGroupProps()}>
  //               {headerGroup.headers.map(column => (
  //                 <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
  //               ))}
  //             </Tr>
  //           ))}
  //         </Thead>
  //         <Tbody {...getTableBodyProps()}>
  //           {page.map((row, i) => {
  //             prepareRow(row);
  //             return (
  //               <Tr {...row.getRowProps()}>
  //                 {row.cells.map(cell => {
  //                   return <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>;
  //                 })}
  //               </Tr>
  //             );
  //           })}
  //         </Tbody>
  //       </Table>
  //       <Flex justifyContent="space-between" alignItems="center" my={5}>
  //         <HStack>
  //           <Button
  //             onClick={() => gotoPage(0)}
  //             disabled={!canPreviousPage}
  //             leftIcon={<ChevronLeftIcon />}
  //           >
  //             {"<<"}
  //           </Button>
  //           <Button
  //             onClick={() => previousPage()}
  //             disabled={!canPreviousPage}
  //             leftIcon={<ArrowLeftIcon />}
  //           >
  //             {"<"}
  //           </Button>
  //           <Button
  //             onClick={() => nextPage()}
  //             disabled={!canNextPage}
  //             rightIcon={<ArrowRightIcon />}
  //           >
  //             {">"}
  //           </Button>
  //           <Button
  //             onClick={() => gotoPage(pageCount - 1)}
  //             disabled={!canNextPage}
  //             rightIcon={<ChevronRightIcon />}
  //           >
  //             {">>"}
  //           </Button>
  //         </HStack>
  //         <Flex alignItems="center">
  //           <Text mr={2}>Go to page:</Text>
  //           <NumberInput
  //             size="sm"
  //             maxW={20}
  //             value={pageIndex + 1}
  //             onChange={value => {
  //               const page = value ? Number(value) - 1 : 0;
  //               gotoPage(page);
  //             }}
  //             min={1}
  //           >
  //             <NumberInputField />
  //           </NumberInput>
  //           <Select
  //             size="sm"
  //             maxW={20}
  //             value={pageSize}
  //             onChange={e => {
  //               setPageSize(Number(e.target.value));
  //             }}
  //           >
  //             {[10, 20, 30, 40, 50].map(pageSize => (
  //               <option key={pageSize} value={pageSize}>
  //                 Show {pageSize}
  //               </option>
  //             ))}
  //           </Select>
  //         </Flex>
  //       </Flex>


  //     </>
  //   );
  // }

return (
  <>
  {/* <h1>Loan Management</h1>

    <Modal show={showEditForm}  onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Loan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={(e) => e.preventDefault()} className="p-3 bg-light align-items-center" style={{ width: '50%' }}>
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
          />
        </Form.Group>
        </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleEditSubmit}>Save Changes</Button>
      </Modal.Footer>
    </Modal>

    <table className="table table-striped">
       <thead>
           <tr>
               <th>Loan ID</th>
               <th>Loan Type</th>
               <th>Duration of Years</th>
               <th>Actions</th>
           </tr>
       </thead>
       
       <tbody> 
           {loanCards.map((loanCard) => (
               <tr key={loanCard.AdminLoanEdit}>
                  <td>{loanCard.loanId}</td>
                   <td>{loanCard.loanType}</td>                        
                   <td>{loanCard.durationOfYears}</td>
                   <td>
                    <Button variant="primary" onClick={() => handleEdit(loanCard.loanId)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(loanCard.loanId)}>Delete</Button>
                   </td>
               </tr>
           ))}
       </tbody>

       </table>    */}
    
    <Modal show={showEditForm} onHide={handleClose}
      zIndex="2"
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
    <div className="d-flex justify-content-center align-items-center" style={{ paddingTop: '2em', padding: '2rem',width:'100%', }}>
      <SimpleGrid columns={1} spacing={10}>
        <Card borderBottomWidth="10px" align="flex-start" borderRadius="lg" textAlign="left" direction={{ base: 'column', sm: 'row' }}
          overflow='hidden'
          variant='outline'
          position="sticky"
          top="1"
          zIndex="1"
          padding="0.5em"
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