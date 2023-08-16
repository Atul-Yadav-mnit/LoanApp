import React, {useEffect, useState} from "react";
import {Form, Button, Container} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewLoan = ({ user, loginUser}) => {
   

    useEffect(() => {
        if(user!=null && user.length > 0)
        {
            const loanDetails=fetchLoanDetails();
            //show loan details in table
            

        }else {
            navigate('/login');
        }
        
    },[user]);
    const navigate = useNavigate();

    const fetchLoanDetails = (user) => {
        
    };

    return (
       <></>
    );
};

export default ViewLoan;