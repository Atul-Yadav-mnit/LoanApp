import React from 'react'
import {Button,Modal,Form} from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';

function AdminItemEdit() {
  const userName = sessionStorage.getItem("username");
  const [itemCards, setItemCards] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);

  const [editingItemId, setEditingItemId] = useState("");
  const [editingItemDescription, setEditingItemDescription] = useState("");
  const [editingItemCategory, setEditingItemCategory] = useState("");
  const [editingItemMake, setEditingItemMake] = useState("");
  const [editingItemValuation, setEditingItemValuation] = useState("");

  const fetchAllItemCards = () => {
    axios.get(`http://localhost:8080/item/all`)
        .then((res) => {
          // console.log(res.data);
          setItemCards(res.data.body);
        })
        .catch((err) => {
          console.log(err);
          alert("Error: " + err);
        });
      }
  
  useEffect(() => {
    fetchAllItemCards();
  }, []);

  const handleDelete = (itemId) => {
    axios.delete(`http://localhost:8080/item/${itemId}?userName=${userName}`)
    .then((res) => {
      alert(res.data.message);
      fetchAllItemCards();
    }).catch((err) => {
      console.log(err);
      alert("Error: " + err);
    });

  }

  const handleEdit = (itemId) => {
    const filteredItemCards = itemCards.filter((itemCard) => itemId == itemCard.itemId);
    if (filteredItemCards.length == 0) {
      alert("invalid item card selected to edit");  
    }
    const editingItemCard = filteredItemCards[0];
    setEditingItemId(editingItemCard.itemId);
    setEditingItemDescription(editingItemCard.itemDescription);
    setEditingItemCategory(editingItemCard.itemCategory);
    setEditingItemMake(editingItemCard.itemMake);
    setEditingItemValuation(editingItemCard.itemValuation);
    handleOpen();
  }

  const handleEditSubmit = () => {
    const requestBody = {
      itemId: editingItemId,
      itemDescription: editingItemDescription,
      itemCategory: editingItemCategory,
      itemMake: editingItemMake,
      itemValuation: editingItemValuation,
    };
    axios.put(`http://localhost:8080/item/${editingItemId}?userName=${userName}`, requestBody)
    .then((res) => {
      alert(res.data.message);
      fetchAllItemCards();
      handleClose();
    }).catch((err) => {
      console.log(err);
      alert("Error: " + err);
    });
  }

  const handleClose = () => setShowEditForm(false);
  const handleOpen = () => setShowEditForm(true);

  return (
    <>
      <h1>Item Management</h1>
      <Modal show={showEditForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => e.preventDefault() } className="p-3 bg-light align-items-center" style={{ width: '50%' }}>

            <Form.Group className="mb-3" controlId="Item">
              <Form.Label>Item ID</Form.Label>
              <Form.Control type="text" placeholder="Enter Item ID" value={editingItemId} disabled />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Item">
              <Form.Label>Item Description</Form.Label>
              <Form.Control type="text" placeholder="Enter Item Description" value={editingItemDescription} onChange={(e) => setEditingItemDescription(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Item">
              <Form.Label>Item Category</Form.Label>
              <Form.Control type="text" placeholder="Enter Item Category" value={editingItemCategory} disabled />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Item">
              <Form.Label>Item Make</Form.Label>
              <Form.Control type="text" placeholder="Enter Item Make" value={editingItemMake} disabled />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Item">
              <Form.Label>Item Valuation</Form.Label>
              <Form.Control type="text" placeholder="Enter Item Valuation" value={editingItemValuation} onChange={(e) => setEditingItemValuation(e.target.value)} />
            </Form.Group>
          
           
          </Form>


        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEditSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
      </Modal>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Item Description</th>
            <th>Item Category</th>
            <th>Item Make</th>
            <th>Item Valuation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {itemCards.map((itemCard) => (
            <tr key={itemCard.itemId}>
              <td>{itemCard.itemId}</td>
              <td>{itemCard.itemDescription}</td>
              <td>{itemCard.itemCategory}</td>
              <td>{itemCard.itemMake}</td>
              <td>{itemCard.itemValuation}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(itemCard.itemId)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(itemCard.itemId)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>

  )
}

export default AdminItemEdit