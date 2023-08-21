import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewLoan = ({ loginUser }) => {

    let [user, setUser] = useState(sessionStorage.getItem("username"));
    const [loanDetails, setLoanDetails] = useState([]);
    const [designation, setDesignation] = useState("");
    const [department, setDepartment] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/employee/${user}`)
            .then((res) => {
                setDesignation(res.data.body.designation);
                setDepartment(res.data.body.department);
                //console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
                alert("Error: " + err);
            });
    }, []);


    useEffect(() => {
        if (user != null && user.length > 0) {
            const loanDetails = fetchLoanDetails(user);
        } else {
            navigate('/login');
        }

    }, [user]);

    const fetchLoanDetails = (user) => {
        axios.get(`http://localhost:8080/employeeCard/${user}/all`)
            .then((res) => {
                setLoanDetails(res.data.body);
                //console.log(res.data);
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