import React from 'react';
import { useState, useEffect } from 'react';
import InputComponent from './Input-component';
import ToDoListing from './ToDo-listing';





export default function App() {

  // Initaizing and Declaration of States;
  const [toDo, setToDo] = useState('');
  const [toDos, setToDos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setToDos(storedTodos);
    }
  }, []);

  useEffect(() => {
    if (toDos.length !== 0) {
      localStorage.setItem("todos", JSON.stringify(toDos));
    } else {
      localStorage.removeItem("todos");
    }
  }, [toDos]);
  

  return (

    <div className='min-h-screen flex items-center justify-center' style={{ background: "linear-gradient(to right, rgb(2,0,36), rgb(0,150,136))" }}>

      <div className='bg-gray-800 w-96 p-8 rounded-lg shadow-lg'>

        <h1 className='text-5xl mb-5 text-center text-yellow-700 font-extrabold'>
          <span role='img' aria-label='checkmark'>✨</span> Let's Get Things Done <span role='img' aria-label='checkmark'>✨</span>
        </h1>

        <InputComponent setToDo={setToDo} toDo={toDo} toDos={toDos} setToDos={setToDos} error={error} setError={setError} />

        <ToDoListing toDos={toDos} setToDos={setToDos} />

        


      </div>

    </div>


  );
}
