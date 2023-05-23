
import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => {
        const user = users.find((user) => {
          const lat = user.address?.geo?.lat;
          if (lat) {
            const lastFourDigits = lat.substring(lat.length - 4);
            return lastFourDigits === password;
          }
          return false;
        });

        if (user) {
          console.log('Login successful');
          console.log('Authorized User:', user);

          localStorage.setItem('user', JSON.stringify(user));
          navigate(`/Application/${user.id}`);

        } else {
          alert('Login failed');
          console.log('Login failed');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
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