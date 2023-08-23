import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Navigate } from "react-router-dom";

function ApplyLoan() {
  let [loanCards, setLoanCards] = useState([]);

  let [empId, setEmpId] = useState(sessionStorage.getItem("username"));
  let [items, setItems] = useState([]);
  let [itemCategory, setItemCategory] = useState([]);
  let [selectedItemCategory, setSelectedItemCategory] = useState("");
  let [itemDescription, setItemDescription] = useState([]);
  let [selectedItemDescription, setSelectedItemDescription] = useState("");
  let [itemValue, setItemValue] = useState("");
  let [itemMake, setItemMake] = useState([]);
  let [selectedItemMake, setSelectedItemMake] = useState("");
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/loanCard/all")
      .then((res) => {
        setLoanCards(res.data.body);
        setItemCategory(res.data.body.map((obj) => obj["loanType"]));
      })
      .catch((err) => {
        console.log(err);
        alert("Error: " + err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/item/all")
      .then((res) => {
        setItems(res.data.body);
      })
      .catch((err) => {
        console.log(err);
        alert("Error: " + err);
      });
  }, []);

  useEffect(() => {
    const filteredItemMakes = items
      .filter((item) => item.itemCategory == selectedItemCategory)
      .map((obj) => obj["itemMake"]);
    setItemMake([...new Set(filteredItemMakes)]);
    setSelectedItemMake("");
  }, [selectedItemCategory, items]);

  useEffect(() => {
    const filteredItemDescription = items
      .filter(
        (item) =>
          item.itemCategory == selectedItemCategory &&
          item.itemMake == selectedItemMake
      )
      .map((obj) => obj["itemDescription"]);
    setItemDescription([...new Set(filteredItemDescription)]);
    setSelectedItemDescription("");
  }, [selectedItemMake]);

  useEffect(() => {
    const filteredItemValue = items
      .filter(
        (item) =>
          item.itemCategory == selectedItemCategory &&
          item.itemMake == selectedItemMake &&
          item.itemDescription == selectedItemDescription
      )
      .map((obj) => obj["itemValuation"]);
    setItemValue(filteredItemValue.length > 0 ? filteredItemValue[0] : "");
  }, [selectedItemDescription]);

  const [errors, setErrors] = useState({
    itemCategory: "",
    itemMake: "",
    itemDescription: "",
  });

  const validateFields = () => {
    let newErrors = {};

    if (!selectedItemCategory) {
      newErrors.itemCategory = "Please select Item Category!";
    }
    if (!selectedItemMake) {
      newErrors.itemMake = "Please select Item Make";
    }
    if (!selectedItemDescription) {
      newErrors.itemDescription = "Please select Item Description";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateFields();
    if (!isValid) {
      return;
    }

    let filteredLoanCards = loanCards.filter(
      (obj) => obj["loanType"] === selectedItemCategory
    );
    if (filteredLoanCards.length == 0) {
      alert("please choose category");
      return;
    }
    const loanCardId = filteredLoanCards[0].loanId;

    let filteredItems = items.filter(
      (obj) =>
        obj["itemCategory"] === selectedItemCategory &&
        obj["itemMake"] === selectedItemMake &&
        obj["itemDescription"] === selectedItemDescription
    );
    if (filteredItems.length == 0) {
      alert("please choose all fields");
      return;
    }
    let itemId = filteredItems[0].itemId;

    const requestBody = {
      employeeId: empId,
      loanCardId: loanCardId,
      itemId: itemId,
    };

    axios
      .post("http://localhost:8080/loan/apply", requestBody)
      .then((res) => {
        alert(res.data.message);
        navigate(`/loan/all`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="p-3 bg-light align-items-center"
        style={{ width: "50%" }}
      >
        <h3 className="text-warning bg-danger text-center mb-3">
          Select Product and Apply for Loan
        </h3>

        <Form.Group controlId="empId">
          <Form.Label> Employee ID</Form.Label>
          <Form.Control type="text" value={empId} disabled />
        </Form.Group>

        <Form.Group controlId="Item Category">
          <Form.Label>Item Category</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={selectedItemCategory}
            onChange={(event) => setSelectedItemCategory(event.target.value)}
            isInvalid={errors.itemCategory}
          >
            <option>Open this select menu</option>
            {itemCategory.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.itemCategory}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="Item Make">
          <Form.Label>Item Make</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={selectedItemMake}
            onChange={(e) => setSelectedItemMake(e.target.value)}
            isInvalid={errors.itemMake}
          >
            <option>Open this select menu</option>
            {itemMake.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.itemMake}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="Item Description">
          <Form.Label>Item Description</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={selectedItemDescription}
            onChange={(e) => setSelectedItemDescription(e.target.value)}
            isInvalid={errors.itemDescription}
          >
            <option>Open this select menu</option>
            {itemDescription.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.itemDescription}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="Item Value">
          <Form.Label>Item Value</Form.Label>
          <Form.Control type="text" value={itemValue} disabled />
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit">
            Apply Loan
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default ApplyLoan;
