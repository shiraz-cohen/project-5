import React, { useEffect, useState } from 'react';

export default function Todos () {
    const [todos, setTodos] = useState([]);
    const [selector, setSelector] = useState('');
    const authorizedUser = JSON.parse(localStorage.getItem('authorizedUser'));
    const id= authorizedUser.id;
    useEffect(  ()=> {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
        .then((response) => response.json())
        .then(data=>setTodos(data))
        .catch((error) => {
          console.error('Error:', error);
        });
    },[id]);

    useEffect(() => {
      sortTodos();
    }, [selector]);
  
    const sortTodos = () => {
      let sortedTodos = [...todos]; // יצירת עותק של ה־todos
      
      switch (selector) {
        case 'serial':
          // מיון לפי סידור סידורי (לפי id)
          sortedTodos.sort((a, b) => a.id - b.id);
          break;
        case 'random':
          // מיון אקראי
          sortedTodos.sort(() => Math.random() - 0.5);
          break;
        case 'performance':
          // מיון לפי סידור ביצועים (לדוגמה, לפי זמן יצירה)
          sortedTodos.sort((a, b) => {
            // מיון לפי ערכי ה־true וה־false של ה־completed
            if (a.completed && !b.completed) {
              return -1; // אם a.completed הוא true ו־b.completed הוא false, a יופיע לפני b
            } else if (!a.completed && b.completed) {
              return 1; // אם a.completed הוא false ו־b.completed הוא true, a יופיע אחרי b
            } else {
              return 0; // אם שני ה־todos מכילים את אותו ערך של completed, הם ישמרו בסדר שבו הם היו במקור
            }
          });
          break;
        case 'alphabetical':
          // מיון לפי סדר אלפביתי (לפי title)
          sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default:
          break;
      }
      
      setTodos(sortedTodos); // עדכון ה־todos בהתאם למיון
    };
  
    const handleSerial = () => {
      setSelector('serial');
    };
  
    const handleRandom = () => {
      setSelector('random');
    };
  
    const handlePerformance = () => {
      setSelector('performance');
    };
  
    const handleAlphabetical = () => {
      setSelector('alphabetical');
    };
    
  
    
      return (
        <div>
          <h2>Todos</h2>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                "id": {todo.id} <br />
                "title": {todo.title}
                <br />
                "completed": {todo.completed ? 'true' : 'false'} <br />
              </li>
            ))}
          </ul>
          <select value={selector} onChange={(e) => setSelector(e.target.value)}>
            <option value="serial">serial</option>
            <option value="random">random</option>
            <option value="performance">performance</option>
            <option value="alphabetical">alphabetical</option>
          </select>
        </div>
      );
    
  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  