import React, { useEffect, useState } from 'react'
import UserDashboard from './UserDashboard';

function HomeComponent({user}) {

  const [display,setDisplay] = useState("")
  
  useEffect(() =>{ 
    if(user!=null && user.length > 0)
    {
      setDisplay("Hello "+user+", Welcome to Loan App!");
    }
    else
    {
      setDisplay("Hello Guest User, Please Login!");
    }

  },[user]);


 //display user dashboard if user is logged in
  if(user!=null && user.length > 0)
  {
    return (
      <div>
        <UserDashboard user={user}/>
      </div>
    )
    }else {
      return (
        <div>
          <h1>{display}</h1>
        </div>
      )
    }

}

export default HomeComponent