import React, { Component, useState } from 'react'
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [department, setDepartment] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [doj, setDoj] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = {
            employeeName: name,
            designation,
            department,
            gender,
            dateOfBirth: dob,
            dateOfJoining: doj
        }
        console.log(JSON.stringify(requestBody));
        // console.log(typeof requestBody.dob);

        axios.post("http://localhost:8080/saveEmployee", requestBody)
        .then((res) =>{
            alert("created  user");
        })
        .catch((err)=>{
          console.log(err);
            alert("error==="+err);
        })
    }

    return (
      <form onSubmit={handleSubmit}>
        <h3 className='text-warning bg-danger'>Register</h3>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            onChange={(e) => {setName(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <label>Designation</label>
          <input
            type="text"
            className="form-control"
            placeholder="Designation"
            onChange={(e) => {setDesignation(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <label>Department</label>
          <input
            type="text"
            className="form-control"
            placeholder="Department"
            onChange={(e) => {setDepartment(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <label>Gender</label>
          <input
            type="radio"
            className="form-control"
            value="M"
            name="gender"
            id="genderm"
            onChange={(e) => {setGender(e.target.value)}}
          />
          <label for="genderm">male</label>
          <input
            type="radio"
            className="form-control"
            value="F"
            id="genderf"
            name="gender"
            onChange={(e) => {setGender(e.target.value)}}
          />
          <label for="genderf">female</label>

        </div>
        <div className="mb-3">
          <label>Date of Birth</label>
          <input
            type="date"
            className="form-control"
            placeholder="Date of Birth"
            onChange={(e) => {setDob(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <label>Date of Joining</label>
          <input
            type="date"
            className="form-control"
            placeholder="Date of Joining"
            onChange={(e) => {setDoj(e.target.value)}}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    )
}

export default Register;