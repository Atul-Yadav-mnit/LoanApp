import React, { useEffect, useState } from 'react'
import AboutUsComponent from './AboutUsComponent'
import HomeComponent from './HomeComponent'
import Register from './Register'
import { Routes, Route, useNavigate } from 'react-router-dom'
import NotFoundComponent from './NotFoundComponent';
import Login from './Login'
import ApplyLoan from './ApplyLoan'
import NavbarComponent from './NavbarComponent'
import NavbarComponentAdmin from './NavbarComponentAdmin'
import ViewLoan from './ViewLoan'
import UserDashboard from './UserDashboard'
import ViewItem from './ViewItem'
import GuardedRoute from './GuardedRoute'
import AdminDashboard from './AdminDashboard'
import AdminEmployeeAdd from './admin/AdminEmployeeAdd'
import AdminEmployeeEdit from './admin/AdminEmployeeEdit'
import AdminLoanAdd from './admin/AdminLoanAdd'
import AdminLoanEdit from './admin/AdminLoanEdit'
import AdminItemAdd from './admin/AdminItemAdd'
import AdminItemEdit from './admin/AdminItemEdit'

const MainComponent = () => {

  const [user,setUser] = useState("");
  const [role, setRole] = useState("");

    const navigate = useNavigate();

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    const userRole = sessionStorage.getItem("role");
        setUser(username);
        setRole(userRole);
  },[])

  const loginUser = (username, userRole) =>{
    
    sessionStorage.setItem("username",username);
    sessionStorage.setItem("role", userRole);
    setUser(username);
    setRole(userRole);
  }

  const logoutUser = () =>{
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("role");
    setUser("");
    setRole("");
    navigate('/');
  }

  return (
      <div className='h-100'>
        {(role==="admin") ? <NavbarComponentAdmin logoutUser={logoutUser} />
         : <NavbarComponent user={user} loginUser = {loginUser} logoutUser={logoutUser}/> }
        <div className="auth-wrapper h-100">
          <div className="auth-inner h-100">
            <Routes>
              <Route path="/" element={<HomeComponent user={user} role={role}/>} />
              <Route path="/about" element={<AboutUsComponent />} />
              <Route path="/register" element={<Register  user={user} loginUser = {loginUser}/>} />
              <Route path="/login" element={<Login  user={user} role={role} loginUser = {loginUser}/>} />
              <Route path="/loan/:username/all" element={<ViewLoan user={user} />} />
              <Route path="/loan/apply" element={<ApplyLoan user={user} />} />
              <Route path="*" element={<NotFoundComponent />} />
              <Route path="/loan/apply" element={<ApplyLoan />}/>
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/items" element={<ViewItem />} />
              
              <Route path="/admin/dashboard"  element={<GuardedRoute isAuth={role==="admin"}/>}>
                <Route path="/admin/dashboard" element = {<AdminDashboard/>} />
              </Route>
              <Route path="/admin/employee/add"  element={<GuardedRoute isAuth={role==="admin"}/>}>
                <Route path="/admin/employee/add" element = {<AdminEmployeeAdd/>} />
              </Route>
              <Route path="/admin/employee/edit"  element={<GuardedRoute isAuth={role==="admin"}/>}>
                <Route path="/admin/employee/edit" element = {<AdminEmployeeEdit/>} />
              </Route>
              <Route path="/admin/loan/add"  element={<GuardedRoute isAuth={role==="admin"}/>}>
                <Route path="/admin/loan/add" element = {<AdminLoanAdd/>} />
              </Route>
              <Route path="/admin/loan/edit"  element={<GuardedRoute isAuth={role==="admin"}/>}>
                <Route path="/admin/loan/edit" element = {<AdminLoanEdit/>} />
              </Route>
              <Route path="/admin/item/add"  element={<GuardedRoute isAuth={role==="admin"}/>}>
                <Route path="/admin/item/add" element = {<AdminItemAdd/>} />
              </Route>
              <Route path="/admin/item/edit"  element={<GuardedRoute isAuth={role==="admin"}/>}>
                <Route path="/admin/item/edit" element = {<AdminItemEdit/>} />
              </Route>


            </Routes>
          </div>
        </div>
      </div>
    
    
  )

}

export default MainComponent