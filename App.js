import React, { useState } from 'react';
import './App.css';
import Button from './components/Button';

function App() {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [todos, setTodos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);

  const handleDelete = (index, isDone) => {
    if (isDone) {
      setDoneTodos(doneTodos.filter((todo, i) => i !== index));
    } else {
      setTodos(todos.filter((todo, i) => i !== index));
    }
  };

  const handleCancel = (index) => {
    const newDoneTodos = [...doneTodos];
    const canceledTodo = newDoneTodos.splice(index, 1)[0];
    canceledTodo.isDone = false;
    setTodos([...todos, canceledTodo]);
    setDoneTodos(newDoneTodos);
  };

  const handleDone = (index) => {
    const newTodos = [...todos];
    const doneTodo = newTodos.splice(index, 1)[0];
    doneTodo.isDone = true;
    setDoneTodos([...doneTodos, doneTodo]);
    setTodos(newTodos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && detail) {
      setTodos([...todos, { title, detail, isDone: false }]);
      setTitle('');
      setDetail('');
    }
  };

  return (
    <div className='body'>
      <div className='header'>
        <div>My Todo List</div>
        <div>React</div>
      </div>

      <div className='task'>
        <div>
          <label>Title&ensp;</label>
          <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} />
          &ensp;&ensp;&ensp;&ensp;&ensp;
          <label>Detail&ensp;</label>
          <input type='text' id='detail' value={detail} onChange={(e) => setDetail(e.target.value)} />
          &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
          <Button text="Add" onClick={handleSubmit} />
        </div>
      </div>

      <div className='work'>
        <p>Working.. 🔥</p>
        <div className='goals-container'>
          {todos.map((todo, index) => (
            <div key={index} className='goal'>
              <h2>{todo.title}</h2>
              <p>{todo.detail}</p>
              <Button className="delete" text="Delete" onClick={() => handleDelete(index, false)} />&ensp;&ensp;&ensp;&ensp;&ensp;
              {todo.isDone ? (
                <Button className="donecancel" text="Canceled" onClick={() => handleCancel(index)} />
              ) : (
                <Button className="donecancel" text="Done" onClick={() => handleDone(index)} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className='done'>
        <p>Done..! 🎉</p>
        <div className='goals-container'>
          {doneTodos.map((todo, index) => (
            <div key={index} className='goal'>
              <h2>{todo.title}</h2>
              <p>{todo.detail}</p>
              <Button className="delete" text="Delete" onClick={() => handleDelete(index, true)} />
              &ensp;&ensp;&ensp;
              {todo.isDone ? (
                <Button text="Cancel" onClick={() => handleCancel(index)} />
              ) : (
                <Button text="Done" onClick={() => handleDone(index)} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
