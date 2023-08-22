import React, { useState } from 'react'
import { Navigate, Outlet, Route,  } from 'react-router-dom'

export default function GuardedRoute({isAuth}) {
  console.log(isAuth);
  const [role, setRole] = useState(sessionStorage.getItem("role"));

  return role==="admin" ? <Outlet/> : <Navigate to="/login"/>;
}
