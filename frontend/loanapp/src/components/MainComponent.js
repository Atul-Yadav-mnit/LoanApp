import React from 'react'
import LoginComponent from './LoginComponent'
import AboutUsComponent from './AboutUsComponent'
import HomeComponent from './HomeComponent'
import Register from './Register'
import { Routes, Route, Link } from 'react-router-dom';
import NotFoundComponent from './NotFoundComponent';

const MainComponent = () => {

  return (
    <div>
        <h3>MainComponent</h3>
        <Link to="home">HOME</Link>
        {' '}
        <Link to="login">LOGIN</Link>
        {' '}
        <Link to="register">REGISTER</Link>
        {' '}
        <Link to="aboutus">ABOUT US</Link>
        {' '}
        <Routes>
            <Route exact path="/home" element={<HomeComponent/>} />
            <Route exact path="/login" element={<LoginComponent/>} />
            <Route exact path="/register" element={<Register/>} />
            <Route exact path="/aboutus" element={<AboutUsComponent/>} />
            <Route path="*" element={<NotFoundComponent/>} />
        </Routes>
    </div>
  )

}

export default MainComponent