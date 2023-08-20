import React, { useEffect, useState } from 'react'
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import {useNavigate} from 'react-router-dom';

function HomeComponent({user,role}) {

  const [display,setDisplay] = useState(<></>)
  
  const navigate = useNavigate();
  
  useEffect(() =>{ 
    if(user!=null && user.length > 0)
    {
      if(role == 'admin')
      {
        setDisplay(<AdminDashboard/>);
      }
      else
      {
        setDisplay(<UserDashboard/>);
      }
    }
    else
    {
      // setDisplay("Hello Guest User, Please Login!");
      navigate("/login");
    }

  },[user]);


 
  return (
    <>
      {display}
    </>
  )

}

export default HomeComponent