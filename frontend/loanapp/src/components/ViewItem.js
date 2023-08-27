import React, { useEffect, useState} from 'react'
import axios from "axios";
import { successToast, failureToast } from "../utils/ToastUtils";
import { getAllEmployeeIssues, getEmployee } from "../api/service";
import { Heading, Text } from "@chakra-ui/react";
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import { SimpleGrid } from "@chakra-ui/react";
import { Stack, HStack } from "@chakra-ui/react";

const ViewItem = () => {
  const [issues, setIssues] = useState([]);
  const username = sessionStorage.getItem("username");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    getEmployee(username)
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
    getAllEmployeeIssues(username)
      .then((res) => {
        if(res.data.body.length == 0)
        {
          successToast(res.data.message)
        }
        setIssues(res.data.body);
        console.log(res.data.body);
      })
      .catch((err) => {
        console.log(err);
        failureToast("Error encountered: " + err.response.data.message);
      });
  }, []);

  return (
   <div className="container" >
      <Card direction={{base:"column",sm:"row"}}
        variant="outline"
        position="sticky"
        top="1"
        zIndex="1"
        marginTop="2rem"
        
>
<CardHeader fontSize="md" fondWeight="bold">
  <Text>{username}</Text>
  </CardHeader>
  <CardBody fontSize="md" fondWeight="bold">
  <Text>designation:{designation}</Text>
  </CardBody>
  <CardFooter fontSize="md" fondWeight="bold">

  <Text>department:{department}</Text>
</CardFooter>
</Card>
<SimpleGrid columns={1} spacing={2} marginTop="2rem">
  <Card borderBottomWidth="10px"
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
    <CardHeader fontSize="md" fondWeight="bold">
      <Text>Issue Id</Text>
    </CardHeader>
   <CardBody fontSize="md" fondWeight="bold">
      <Text>Issue Description</Text>
    </CardBody>
    <CardBody fontSize="md" fondWeight="bold">
      <Text> Item Make</Text>

    </CardBody>
    <CardBody fontSize="md" fondWeight="bold">
      <Text> Item Category</Text>
      </CardBody>
      <CardFooter fontSize="md" fondWeight="bold">
        <Text> Item Valuation</Text>
        </CardFooter>
            </Card>
            {
            issues.map((issue) => (
              <Card 
            align="flex-start"
            borderRadius="lg"
            textAlign="left"  
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            >
                <CardHeader fontSize="md" fondWeight="bold">
                  <Text>{issue.issueId}</Text>
                </CardHeader>
                <CardBody fontSize="md" fondWeight="bold">
                  <Text>{issue.item.itemDescription}</Text>
                </CardBody>
                <CardBody fontSize="md" fondWeight="bold">
                  <Text>{issue.item.itemMake}</Text>
                </CardBody>
                <CardBody fontSize="md" fondWeight="bold">
                  <Text>{issue.item.itemCategory}</Text>
                </CardBody>
                <CardFooter fontSize="md" fondWeight="bold">
                  <Text>{issue.item.itemValuation}</Text>
                </CardFooter>
            </Card>
            ))
            }
          </SimpleGrid>


</div>
  );
};

export default ViewItem;
