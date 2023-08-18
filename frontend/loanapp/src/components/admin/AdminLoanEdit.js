import React, { useState, useEffect} from 'react'
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

function AdminLoanEdit() {
  const userName = sessionStorage.getItem("username");
  const [loanCards, setLoanCards] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);

  const [editingLoanId, setEditingLoanId] = useState("");
  const [editingLoanType, setEditingLoanType] = useState("");
  const [editingDurationOfYears, setEditingDurationOfYears] = useState("");

  useEffect(() => {
    fetchAllLoanCards();
}, []);

  const fetchAllLoanCards = () => {
    axios.get(`http://localhost:8080/loanCard/all`)
        .then((res) => {
            setLoanCards(res.data);
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
      alert(res.data);
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

  const handleClose = () => setShowEditForm(false);
  const handleOpen = () => setShowEditForm(true);

return (
  <>
  <h1>Loan Management</h1>

    <Modal show={showEditForm}  onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Loan</Modal.Title>
      </Modal.Header>
      <Modal.Body>


      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleClose}>Save Changes</Button>
      </Modal.Footer>
    </Modal>

    <table className="table table-bordered">
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

       </table>   
  </>)
}

export default AdminLoanEdit