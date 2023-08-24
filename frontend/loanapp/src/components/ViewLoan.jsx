import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllEmployeeCards, getEmployee } from "../api/service";

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
                alert("Error: " + err);
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
                setLoanDetails(res.data.body);
            })
            .catch((err) => {
                console.log(err);
                alert("Error: " + err);
            });
    };

    return (
        <div style={{ width: '100%' }}>
            <h1>Loan</h1>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
                    <span> Employee ID : {user}</span>
                
                    <span>Designation : {designation}</span>
                
                    <span>Department : {department}</span>
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Loan ID</th>
                        <th>Loan Type</th>
                        <th>Duration of Years</th>
                        <th>Card Issue Date</th>
                    </tr>
                </thead>
                <tbody>
                    {loanDetails.map((loan) => (
                        <tr key={loan.loanID}>
                            <td>{loan.loanCard.loanId}</td>
                            <td>{loan.loanCard.loanType}</td>
                            <td>{loan.loanCard.durationOfYears}</td>
                            <td>{loan.cardIssueDate}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default ViewLoan;