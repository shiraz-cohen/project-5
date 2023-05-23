import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function Application() {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate(`/`); // הפניה לעמוד הכניסה
  };

  return (
    // מסירה של המשתנה המצוי ב state לכל הקומפוננטות המצריכות אותו
    <div>
      <div>
        <h1>Welcome, {user.name}!</h1>
      </div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
        <div><Link to={`/application/${user.id}/info`}>Info</Link></div>
        <div><Link to={`/application/${user.id}/todos`}>Todos</Link></div>
        <div><Link to={`/application/${user.id}/posts`}>Posts</Link></div>
        <div><Link to={`/application/${user.id}/albums`}>Albums</Link></div>
      </div>

    </div>
  );
};




