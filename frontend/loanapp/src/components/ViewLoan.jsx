import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllEmployeeCards, getEmployee } from "../api/service";
import { successToast, failureToast } from "../utils/ToastUtils";
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { SimpleGrid } from "@chakra-ui/react"
import { Stack, HStack } from "@chakra-ui/react"
import { EditIcon, DeleteIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons"

const ViewLoan = ({ loginUser }) => {

    let [user, setUser] = useState(sessionStorage.getItem("username"));
    const [loanDetails, setLoanDetails] = useState([]);
    const [designation, setDesignation] = useState("");
    const [department, setDepartment] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getEmployee(user)
            .then((res) => {
                setDesignation(res.data.body.designation);
                setDepartment(res.data.body.department);
            })
            .catch((err) => {
                console.log(err);
                failureToast("Error encountered: " + err.response.data.message);
            });
    }, []);


    useEffect(() => {
        if (user != null && user.length > 0) {
            fetchLoanDetails(user);
        } else {
            navigate('/login');
        }

    }, [user]);

    const fetchLoanDetails = (username) => {
        getAllEmployeeCards(username)
            .then((res) => {
                if(res.data.body.length == 0)
                {
                successToast(res.data.message)
                }
                setLoanDetails(res.data.body);
            })
            .catch((err) => {
                console.log(err);
                failureToast("Error encountered: " + err.response.data.message);
            });
    };

    return (
        // <div style={{ width: '100%' }}>
        //     <h1>Loan</h1>
        //     <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
        //             <span> Employee ID : {user}</span>
                
        //             <span>Designation : {designation}</span>
                
        //             <span>Department : {department}</span>
        //     </div>
        //     <table className="table table-bordered">
        //         <thead>
        //             <tr>
        //                 <th>Loan ID</th>
        //                 <th>Loan Type</th>
        //                 <th>Duration of Years</th>
        //                 <th>Card Issue Date</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {loanDetails.map((loan) => (
        //                 <tr key={loan.loanID}>
        //                     <td>{loan.loanCard.loanId}</td>
        //                     <td>{loan.loanCard.loanType}</td>
        //                     <td>{loan.loanCard.durationOfYears}</td>
        //                     <td>{loan.cardIssueDate}</td>
        //                 </tr>
        //             ))}
        //         </tbody>

        //     </table>
        // </div>
        <div style={{padding:"2rem"}}>
        <Card direction={{base:"column",sm:"row"}}
        variant="outline"
        position="sticky"
        top="1"
        zIndex="1"
        marginTop="2rem"
        
>
<CardHeader fontSize="md" fondWeight="bold">
  <Text>{user}</Text>
  </CardHeader>
  <CardBody fontSize="md" fondWeight="bold">
  <Text>designation:{designation}</Text>
  </CardBody>
  <CardFooter fontSize="md" fondWeight="bold">

  <Text>department:{department}</Text>
</CardFooter>
</Card>


<SimpleGrid columns={1} spacing="10px" marginTop="2rem">
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
            <CardHeader fontSize="md" fondWeight="bold"> Loan ID</CardHeader>
            <CardBody fontSize="md" fondWeight="bold">Loan Type</CardBody>
            <CardBody fontSize="md" fondWeight="bold">Duration of Years</CardBody>
            <CardBody fontSize="md" fondWeight="bold">Card Issue Date</CardBody>
            </Card>
            {loanDetails.map((loan) => (
                <Card borderBottomWidth="10px" align="flex-start" borderRadius="lg" textAlign="left" direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                >

                    <CardHeader fontSize="md" fondWeight="bold">{loan.loanCard.loanId}</CardHeader>
                    <CardBody fontSize="md" fondWeight="bold">{loan.loanCard.loanType}</CardBody>
                    <CardBody fontSize="md" fondWeight="bold">{loan.loanCard.durationOfYears}</CardBody>
                    <CardBody fontSize="md" fondWeight="bold">{loan.cardIssueDate}</CardBody>

                </Card> 
            ))}
            </SimpleGrid>

        </div>
    );
};

export default ViewLoan;