
import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    const url = `https://jsonplaceholder.typicode.com/users?username=${username}&lat=${password}`;
    fetch(url)
      .then((response) => response.json())
      .then((users) => {
        const filteredUsers = users.filter((user) => {
          return user.username === username && user.address?.geo?.lat?.endsWith(password);
        });

        if (filteredUsers.length > 0) {
          const user = filteredUsers[0];

          localStorage.setItem('user', JSON.stringify(user));
          navigate(`/Application/${user.id}`);

        } else {
          alert('Login failed');
        }
      })
      .catch((error) => {
        alert('Error:', error);
      });
  };


  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}
