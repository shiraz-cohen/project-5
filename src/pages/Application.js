import React from 'react';
import  { useState, createContext, useContext } from 'react';
import { Link,useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../App";

export default function Application ()  {
  const { id } = useParams();
  const authorizedUser = useContext(UserContext);
  const navigate=useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authorizedUser');
    navigate(`/`); // הפניה לעמוד הכניסה
  };

  return (
    // מסירה של המשתנה המצוי ב state לכל הקומפוננטות המצריכות אותו
  <div>
  <div>
    <h1>Welcome, {authorizedUser?.name}!</h1>
   
  </div>
  <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
    <div>
     <div><Link to={`/application/${id}/info`}>Info</Link></div>
      <div><Link to={`/application/${id}/todos`}>Todos</Link></div>
      <div><Link to={`/application/${id}/posts`}>Posts</Link></div>
      <div><Link to={`/application/${id}/albums`}>Albums</Link></div>
      
    </div>

</div>
  );
};




