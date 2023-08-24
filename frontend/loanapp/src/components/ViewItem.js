import React, { useEffect, useState } from "react";
import { getAllEmployeeIssues, getEmployee } from "../api/service";

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
        alert("Error: " + err);
      });
  }, []);

  useEffect(() => {
    getAllEmployeeIssues(username)
      .then((res) => {
        setIssues(res.data.body);
        console.log(res.data.body);
      })
      .catch((err) => {
        console.log(err);
        alert("Error: " + err);
      });
  }, []);

  return (
    <>
      <h1>Purchased Items</h1>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <span> Employee ID : {username}</span>

        <span>Designation : {designation}</span>

        <span>Department : {department}</span>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Issue ID</th>
            <th>Item Description</th>
            <th>Item Make</th>
            <th>Item Category</th>
            <th>Item Valuation</th>
          </tr>
        </thead>

        <tbody>
          {issues.map((issue) => (
            <tr key={issue.issueId}>
              <td>{issue.issueId}</td>
              <td>{issue.item.itemDescription}</td>
              <td>{issue.item.itemMake}</td>
              <td>{issue.item.itemCategory}</td>
              <td>{issue.item.itemValuation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ViewItem;
