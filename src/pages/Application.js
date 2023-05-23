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
          <div className="button-wrapper">
            <Link to={`/application/${user.id}/info`} className="button">
              Info
            </Link>
          </div>
          <div className="button-wrapper">
            <Link to={`/application/${user.id}/todos`} className="button">
              Todos
            </Link>
          </div>
          <div className="button-wrapper">
            <Link to={`/application/${user.id}/posts`} className="button">
              Posts
            </Link>
          </div>
          <div className="button-wrapper">
            <Link to={`/application/${user.id}/albums`} className="button">
              Albums
            </Link>
          </div>
        </div>
      </div>
    
    
  );
  
};




