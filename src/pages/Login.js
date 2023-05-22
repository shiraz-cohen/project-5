import React, { useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

// // יצירת משתנה מסוג context עם ערכי המשתמש
// const UserContext = createContext({
//   authorizedUser: null,
//   setAuthorizedUser: () => {},
// });

export default function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();

  // // גישה למשתנה המצוי ב context
  // const { setAuthorizedUser } = useContext(UserContext);

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
        const authorizedUser = users.find((user) => {
          const lat = user.address?.geo?.lat;
          if (lat) {
            const lastFourDigits = lat.substring(lat.length - 4);
            return lastFourDigits === password;
          }
          return false;
        });

        if (authorizedUser) {
          console.log('Login successful');
          console.log('Authorized User:', authorizedUser);

          //  שימוש במשתנה המצוי ב context כדי לשמור את המשתמש
          props.setAuthorizedUser(authorizedUser);

          navigate(`/Application/${authorizedUser.id}`);

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








// import React, { useState,createContext,useContext } from 'react';
// import './login.css';
// import { useNavigate } from 'react-router-dom';
// // יצירת משתנה מסוג context עם ערכי המשתמש
// const UserContext = createContext({
//   authorizedUser: null,
//   setAuthorizedUser: () => {},
// });

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate=useNavigate();

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleLogin = () => {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((users) => {
//         const authorizedUser = users.find((user) => {
//           const lat = user.address?.geo?.lat;
//           if (lat) {
//             const lastFourDigits = lat.substring(lat.length - 4);
//             return lastFourDigits === password;
//           }
//           return false;
//         });

//         if (authorizedUser) {
//           console.log('Login successful');
//           console.log('Authorized User:', authorizedUser);

//           //  LocalStorage-שמירת המשתמש ב
//           localStorage.setItem('authorizedUser', JSON.stringify(authorizedUser));
//           console.log(authorizedUser.id);
//           navigate(`/Application/${authorizedUser.id}`); 

//         } else {
//           alert('Login failed');
//           console.log('Login failed');
//         }
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };


//   return (
//     <div>
//       <h2>Login</h2>
//       <form>
//         <div>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={handleUsernameChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={handlePasswordChange}
//           />
//         </div>
//         <button type="button" onClick={handleLogin}>
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };