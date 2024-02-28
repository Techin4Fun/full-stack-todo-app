import { useEffect, useState } from 'react'
import './App.css'


let currentId = 0;

function App() {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(function(){
    getAllTodos();
  }, []);

  function handleInput(e){
    setDescription(e.target.value);
  }

  // GET ALL TODOS
  async function getAllTodos(){
    try {
      const response = await fetch("http://localhost:8080/");
      const responseArray = await response.json();

      setTodos(responseArray);
      setDescription("");

    } catch (error) {
      console.error(error);
    }
  }

  // POST A TODO
  async function addATodo(e){
    e.preventDefault();
    try {
      const body = {description};
      const response = await fetch("http://localhost:8080/addtodo",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });
      setDescription(response);
      console.log(response);
      getAllTodos();

    } catch (error) {
      console.error(error);
    }

  }

  // UPDATE A TODO
  async function updateATodo(id){
    try {
      const body = {description};
      const response = await fetch(`http://localhost:8080/todo/${id}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });

      setDescription(response);
      console.log(response);

      // Reloads the page and get all todos
      getAllTodos();
    } catch (error) {
      console.error(error);
    }
  }

  // DELETE A TODO
  async function deleteTodo(id){
    try {
      const response = await fetch(`http://localhost:8080/todo/${id}`, {
        method: "DELETE"
      });

      console.log(`Todo: ${id} has been deleted`);
      getAllTodos();
      
    } catch (error) {
      console.error(error);
    }
  }

  // console.log(todos);
  return (
    <div>
      <h2>Todolist</h2>
      <input type="text" placeholder='Enter a todo' value={description} onChange={function(e){handleInput(e)}}/>
      <button onClick={function(e){addATodo(e)}}>Add New Todo</button>
      <button onClick={function(){updateATodo(currentId)}}>Save</button>
      <br />
      <br />
      {todos.map((todo)=>(
        <li key={todo.todo_id}>
            <span>{todo.description}</span>
            <button 
              onClick={
                function(){
                  currentId = todo.todo_id
                  console.log(`Current ID: ${currentId}`); 
                  setDescription(todo.description);
                }
              }
            >
                Edit
            </button>
            <button onClick={function(){deleteTodo(todo.todo_id)}}>Delete</button>
        </li>
      ))}
    </div>
  )
}

export default App
