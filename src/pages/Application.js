import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Application.css'


export default function Application() {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate(`/`); // הפניה לעמוד הכניסה
  };

  return (
    <div className="container">
      <div>
        <h1 className="title">Welcome, {user.name}!</h1>
      </div>
      <div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="nav-links">
        <div className="nav-link">
          <Link to={`/application/${user.id}/info`}>Info</Link>
        </div>
        <div className="nav-link">
          <Link to={`/application/${user.id}/todos`}>Todos</Link>
        </div>
        <div className="nav-link">
          <Link to={`/application/${user.id}/posts`}>Posts</Link>
        </div>
        <div className="nav-link">
          <Link to={`/application/${user.id}/albums`}>Albums</Link>
        </div>
      </div>
    </div>
  );
  
};




