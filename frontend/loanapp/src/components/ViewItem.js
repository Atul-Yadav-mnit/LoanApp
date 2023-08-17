import React, { useEffect, useState} from 'react'
import axios from "axios";


const ViewItem = () => {
    const [issues, setIssues] = useState([]);
    const username = sessionStorage.getItem("username");
    const [designation, setDesignation] = useState("");
    const [department, setDepartment] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/employee/${username}`)
            .then((res) => {
                setDesignation(res.data.designation);
                setDepartment(res.data.department);
                //console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
                alert("Error: " + err);
            });
    }, []);

    useEffect(() => {
        const res = axios.get(`http://localhost:8080/employeeIssue/${username}/all`)
        .then((res) => {
            setIssues(res.data);
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
            alert("Error: " + err);
        });
    }, [])



    return (
       <>
       <h1>Purchased Items</h1>
       <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
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
}

export default ViewItem