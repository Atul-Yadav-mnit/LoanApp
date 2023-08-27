import React from "react";
import { Modal, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import chakra ui
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/react";
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import { SimpleGrid } from "@chakra-ui/react";
import { Stack, HStack } from "@chakra-ui/react";
import { EditIcon, DeleteIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons";
import { deleteItem, editItem, getAllItems } from "../../api/service";
import { successToast, failureToast } from "../../utils/ToastUtils";

function AdminItemEdit() {
  const userName = sessionStorage.getItem("username");
  const [itemCards, setItemCards] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);

  const [editingItemId, setEditingItemId] = useState("");
  const [editingItemDescription, setEditingItemDescription] = useState("");
  const [editingItemCategory, setEditingItemCategory] = useState("");
  const [editingItemMake, setEditingItemMake] = useState("");
  const [editingItemValuation, setEditingItemValuation] = useState(0);

  const [errors, setErrors] = useState({
    itemDescription: "",
    itemMake: "",
    itemValuation: "",
  });

  const fetchAllItemCards = () => {
    getAllItems()
      .then((res) => {
        // console.log(res.data);
        if(res.data.body.length == 0)
        {
          successToast(res.data.message)
        }
        setItemCards(res.data.body);
      })
      .catch((err) => {
        console.log(err);
        failureToast("Error encountered: " + err.response.data.message);
      });
  };

  useEffect(() => {
    fetchAllItemCards();
  }, []);

  const handleDelete = (itemId) => {
    deleteItem(userName, itemId)
      .then((res) => {
        successToast(res.data.message);
        fetchAllItemCards();
      })
      .catch((err) => {
        console.log(err);
        failureToast("Error encountered: " + err.response.data.message);
      });
  };

  const handleEdit = (itemId) => {
    const filteredItemCards = itemCards.filter(
      (itemCard) => itemId == itemCard.itemId
    );
    if (filteredItemCards.length == 0) {
      failureToast("invalid item card selected to edit");
    }
    const editingItemCard = filteredItemCards[0];
    setEditingItemId(editingItemCard.itemId);
    setEditingItemDescription(editingItemCard.itemDescription);
    setEditingItemCategory(editingItemCard.itemCategory);
    setEditingItemMake(editingItemCard.itemMake);
    setEditingItemValuation(editingItemCard.itemValuation);
    handleOpen();
  };

  const validateFields = () => {
    const newErrors = {
      itemDescription: "",
      itemMake: "",
      itemValuation: "",
    };
  
    if (!editingItemDescription) {
      newErrors.itemDescription = "Item description cannot be empty.";
    }
  
    if (!editingItemMake) {
      newErrors.itemMake = "Item make cannot be empty.";
    }
  
    if (!editingItemValuation) {
      newErrors.itemValuation = "Item valuation cannot be empty.";
    } else if (isNaN(editingItemValuation) || Number(editingItemValuation) <= 0) {
      newErrors.itemValuation = "Item valuation must be a positive number.";
    }
  
    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === "");
  };

  const handleEditSubmit = () => {
    const isValid = validateFields();
    if (!isValid) {
      return;
    }

    const requestBody = {
      itemId: editingItemId,
      itemDescription: editingItemDescription,
      itemCategory: editingItemCategory,
      itemMake: editingItemMake,
      itemValuation: editingItemValuation,
    };
    editItem(
        userName,
        editingItemId,
        requestBody
      )
      .then((res) => {
        successToast(res.data.message);
        fetchAllItemCards();
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        failureToast("Error encountered: " + err.response.data.message);
      });
  };

  const handleClose = () => setShowEditForm(false);
  const handleOpen = () => setShowEditForm(true);

  return (
    <>
      <Modal show={showEditForm} onHide={handleClose} zIndex="2">
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => e.preventDefault()}
            className=" bg-light align-items-center"
          >
            <Form.Group className="mb-3" controlId="Item">
              <Form.Label>Item ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Item ID"
                value={editingItemId}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Item">
              <Form.Label>Item Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Item Description"
                value={editingItemDescription}
                onChange={(e) => setEditingItemDescription(e.target.value)}
                isInvalid={errors.itemDescription}
              />
              <Form.Control.Feedback type="invalid">{errors.itemDescription}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="Item">
              <Form.Label>Item Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Item Category"
                value={editingItemCategory}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Item">
              <Form.Label>Item Make</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Item Make"
                value={editingItemMake}
                isInvalid={errors.itemMake}
                onChange={(e) => setEditingItemMake(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">{errors.itemMake}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="Item">
              <Form.Label>Item Valuation</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Item Valuation"
                value={editingItemValuation}
                isInvalid={errors.itemValuation}
                onChange={(e) => setEditingItemValuation(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">{errors.itemValuation}</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline" colorScheme="red" onClick={handleClose}>
            <CloseIcon />
            Close
          </Button>
          <Button
            variant="outline"
            colorScheme="green"
            onClick={handleEditSubmit}
          >
            <CheckIcon />
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* card */}
      <div
        className="d-flex justify-content-center align-items-center "
        style={{ paddingTop: "2em", padding: "2rem" }}
      >
        <SimpleGrid columns={1} spacing={2}>
          <Card
            borderBottomWidth="10px"
            align="flex-start"
            borderRadius="lg"
            textAlign="left"
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            position="sticky"
            top="1"
            zIndex="1"
            padding="0.5em"
            boxShadow="lg"
            backgroundColor="gray.100"
          >
            <CardHeader fontSize="md" fontWeight="bold" width="10em">
              Item ID
            </CardHeader>
            <CardHeader fontSize="md" fontWeight="bold" width="10em">
              {" "}
              Description
            </CardHeader>
            <CardBody paddingInline={10} textAlign="left">
              <HStack spacing={10} align="start">
                <Text fontSize="md" width="10em">
                  Category
                </Text>
                <Text fontSize="md" width="10em">
                  Make
                </Text>
                <Text fontSize="md" width="10em">
                  {" "}
                  Valuation
                </Text>
              </HStack>
            </CardBody>
            <CardFooter paddingInline={10}>
              <Stack direction="row" spacing={6} align="center">
                <Text fontSize="md" width="10em">
                  Actions
                </Text>
              </Stack>
            </CardFooter>
          </Card>
          {itemCards.map((itemCard) => (
            <Card
              key={itemCard.itemId}
              borderWidth="1px"
              align="flex-start"
              borderRadius="sm"
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
            >
              <CardHeader width="10em">{itemCard.itemId}</CardHeader>
              <CardHeader fontSize="md" fontWeight="bold" width="10em">
                {itemCard.itemDescription}{" "}
              </CardHeader>
              <CardBody paddingInline={10} textAlign="left">
                <HStack spacing={10} align="start">
                  <Text fontSize="md" width="10em">
                    {itemCard.itemCategory}
                  </Text>
                  <Text fontSize="md" width="10em">
                    {itemCard.itemMake}
                  </Text>
                  <Text fontSize="md" width="10em">
                    {itemCard.itemValuation}
                  </Text>
                </HStack>
              </CardBody>

              <CardFooter paddingInline={10}>
                <Stack direction="row" spacing={6} align="center">
                  <Button
                    colorScheme="blue"
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(itemCard.itemId)}
                  >
                    <EditIcon />
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(itemCard.itemId)}
                  >
                    <DeleteIcon />
                    Delete
                  </Button>
                </Stack>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </div>
    </>
  );
}

export default AdminItemEdit;
