import React, { useState, useEffect} from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';

function AdminLoanEdit() {
  const [loanCards, setLoanCards] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/loanCard/all`)
        .then((res) => {
            setLoanCards(res.data);
            //console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
            alert("Error: " + err);
        });
}, []);

return (
  <>
  <h1>Loan Management</h1>
    <table className="table table-bordered">
       <thead>
           <tr>
               <th>Loan ID</th>
               <th>Loan Type</th>
               <th>Duration of Years</th>
               <th>Edit</th>
               <th>Delete</th>
           </tr>
       </thead>
       
       <tbody> 
           {loanCards.map((loanCard) => (
               <tr key={loanCard.AdminLoanEdit}>
                  <td>{loanCard.loanId}</td>
                   <td>{loanCard.loanType}</td>                        
                   <td>{loanCard.durationOfYears}</td>
                   <td><Button>Edit</Button></td>
                   <td><Button>Delete</Button></td>
               </tr>
           ))}
       </tbody>

       </table>   
  </>)
}

export default AdminLoanEdit