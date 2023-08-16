
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./components/Register"

import { Navbar, Nav } from 'react-bootstrap';
import Login from "./components/Login"; 
import MainComponent from "./components/MainComponent";


function App() {
  return (
    <div className="App">
    

      <BrowserRouter>
        <MainComponent/>
      </BrowserRouter>
    </div>

  )
}

export default App
