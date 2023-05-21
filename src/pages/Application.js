import React from 'react';
import { Link } from 'react-router-dom';

const Application = () => {
  const authorizedUser = JSON.parse(localStorage.getItem('authorizedUser'));

  const handleLogout = () => {
    localStorage.removeItem('authorizedUser');
    window.location.href = '/Login'; // הפניה לעמוד הכניסה
  };

  return (
    <div>
      <h2>Welcome, {authorizedUser.name}!</h2>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
        <button>Info</button>
        <div><Link to={`/application/${authorizedUser.id}/todos`}>Todos</Link></div>
        <div><Link to={`/application/${authorizedUser.id}/posts`}>Posts</Link></div>
        <div><Link to={`/application/${authorizedUser.id}/albums`}>Albums</Link></div>
        
      </div>
      {/* הצגת התוכן המתאים לכל כפתור / לינק */}
    </div>
  );
};

export default Application;
