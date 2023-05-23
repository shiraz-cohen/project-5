import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [selector, setSelector] = useState('');

  const { id } = useParams();
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
      .then((response) => response.json())
      .then(data => setTodos(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [id]);

  useEffect(() => {
    sortTodos();
  }, [selector]);

  const sortTodos = () => {
    let sortedTodos = [...todos]; //  ־todos יצירת עותק של 

    switch (selector) {
      case 'serial':
        sortedTodos.sort((a, b) => a.id - b.id);
        break;
      case 'random':
        sortedTodos.sort(() => Math.random() - 0.5);
        break;
      case 'performance':
        sortedTodos.sort((a, b) => {
          if (a.completed && !b.completed) {
            return -1;
          } else if (!a.completed && b.completed) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      case 'alphabetical':
        sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setTodos(sortedTodos);
  };

  const handleCheckboxChange = (e, todo) => {
    const updatedTodo = { ...todo, completed: e.target.checked };
    console.log(updatedTodo);
    fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedTodo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedTodos = todos.map((t) => (t.id === todo.id ? data : t));
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Todos</h2>
      <select value={selector} onChange={(e) => setSelector(e.target.value)}>
        <option value="serial">serial</option>
        <option value="random">random</option>
        <option value="performance">performance</option>
        <option value="alphabetical">alphabetical</option>
      </select>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              className="liItem"
              type="checkbox"
              id={todo.id}
              checked={todo.completed}
              onChange={(e) => handleCheckboxChange(e, todo)}
            />
            {todo.title}
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};