import React, { useEffect, useState } from 'react'
import { Form,Button, Container } from 'react-bootstrap'
import { Link,useParams } from 'react-router-dom'
import { addItem, getAllLoanCards } from '../../api/service';

const AdminItemAdd = () => {
  const [username, setUsername] = useState(sessionStorage.getItem("username"));
 const [item, setItem] = useState(
    []
 );
  const [loanCards, setLoanCards] = useState([]);

 const [error, setError] = useState({
    itemDescriptionError: '',
    itemCategoryError: '',
    itemMakeError: '',
    itemValuationError: ''
  });

  const validate = () => {
    let newError = {
      itemDescriptionError: '',
      itemCategoryError: '',
      itemMakeError: '',
      itemValuationError: ''
    };

    if(!item.itemDescription||item.itemDescription===''){
      newError.itemDescriptionError = 'Item Description is Required';
    }
    if(!item.itemCategory|| item.itemCategory===''){
      newError.itemCategoryError = 'Item Category is Required';
    }
    if(!item.itemMake || item.itemMake===''){
      newError.itemMakeError = 'Item Make is Required';
    }
    if(!item.itemValuation|| item.itemValuation===''){
      newError.itemValuationError = 'Item Valuation is Required';
    }

    setError(newError);
    console.log(newError);
    return Object.values(newError).every((x) => x === '');
  };

  useEffect(()=>{
        getAllLoanCards()
      .then((res) => {
        
        const loanCard = res.data.body.map((loanCard) => loanCard.loanType);
        setLoanCards(loanCard);
      })
      .catch((err) => {
        console.log(err);
        alert("Error: " + err);
      });
      }, []);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    const isValid = validate();
    console.log(isValid)
    if(isValid){
      addItem(username, item)
      .then((response) => {
        // console.log(response);
        // console.log(response.data);
        alert("Item Added Successfully");
      })
      .catch((error) => {
        console.log(error);
        alert("Item Addition Failed");
      });
    }
    else {
      return;
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center ">
      <Form onSubmit={handleSubmit} className="p-3 bg-light align-items-center form-inline" style={{ width: '50%',marginTop:'30px',borderRadius:'10px' }}>
      <h3 className="text-warning bg-danger text-center mb-3">Add Item</h3>
      <Form.Group controlId='itemCategory'>

          <Form.Label>Item Category</Form.Label>
          <Form.Control as="select" onChange={handleChange} value={item.itemCategory} error={error.itemCategoryError} >
            <option value="">Select</option>
            {loanCards.map((itemCategory) => (
              <option value={itemCategory}>{itemCategory}</option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {error.itemCategoryError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='itemDescription'>
          <Form.Label>Item Description</Form.Label>
          <Form.Control

            type='text'
            placeholder='Enter Item Description'
            value={item.itemDescription}
            onChange={handleChange}
            error={error.itemDescriptionError}
           
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {error.itemDescriptionError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='itemMake'>
          <Form.Label>Item Make</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Item Make'
            value={item.itemMake}
            onChange={handleChange}
            error={error.itemMakeError}
           
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {error.itemMakeError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='itemValuation'>
          <Form.Label>Item Value</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Item Value'
            value={item.itemValuation}
            onChange={handleChange}
            error={error.itemValuationError}
           
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {error.itemValuationError}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Add Item
        </Button>
      </Form>
    </Container>
    
  );
}

export default AdminItemAdd
