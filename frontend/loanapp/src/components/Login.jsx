import React, {useEffect, useState} from "react";
import {Form, Button, Container} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ user, loginUser}) => {
    const [employeeID, setEmployeeID] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        if(user!=null && user.length > 0)
        {
            navigate('/');
        }
    },[user])

    const handleUserLogin = (e) => {
        e.preventDefault();
        const requestBody = {
            employeeID,
            password
        };
        
        // loginUser(employeeID);

        axios.post("http://localhost:8080/employee/login", requestBody)
            .then((res) => {
                alert(res.data);
                if (res.data.includes('success')) {
                    loginUser(employeeID);
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Error: " + err);
            });
    };

    
    const handleAdminLogin = (e) => {
        e.preventDefault();
        const requestBody = {
            username: employeeID,
            password
        };
        
        // loginUser(employeeID);

        axios.post("http://localhost:8080/admin/login", requestBody)
            .then((res) => {
                alert(res.data);
                if (res.data.includes('success')) {
                    loginUser(employeeID);
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Error: " + err);
            });
    };

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Form  className=" bg-light align-items-center" style={{width: '50%',marginTop:'30px',borderRadius:'10px'}}>
                <h3 className="text-warning bg-danger text-center  mb-3 py-2 " tyle={{width: '100%'}}>Login</h3>
              <div className="p-4 text-left">
                <Form.Group controlId="employeeID">
                    <Form.Label>Employee ID</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Employee ID"
                        value={employeeID}
                        onChange={(e) => setEmployeeID(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className=" text-left w-90 " controlId="password">
                    <Form.Label className="text-left w-90 ml-2 pl-2">Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br/>
                </Form.Group>
                <div className="text-center">
                    <Button variant="primary" type="submit" onClick={handleUserLogin}>
                        Login as User
                    </Button>
                    {' '}
                    <Button variant="danger" type="submit" onClick={handleAdminLogin}>
                        Login as Admin
                    </Button>
                    <p className="forgot-password text-right">
                        <a href="#">Forgot password?</a>
                    </p>
                </div>

                </div>
            </Form>
        </Container>
    );
};

export default Login;