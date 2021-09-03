import React ,{useState,useEffect}from "react";
import './App.css';
import Form from "./Components/Form";
import TodoList from "./Components/TodoList";



export default function App() {
  const [inputText,setInputText]=useState("");
  const [todos,setTodos]=useState([]);
  const [status,setStatus]=useState('all');
  const [filteredTodos,setFilteredTodos]=useState([]);


  useEffect(()=>{
    getLocalTodos();
  },[]);

  // USE EFFECT
   useEffect(()=>{  
      saveLocalTodos();
      filterHandler();
  },[todos,status]);

  // save to local 
  const saveLocalTodos=()=>{
    if(localStorage.getItem('todos')==  null){
      localStorage.setItem('todos',JSON.stringify([]));
  }else{
    localStorage.setItem('todos',JSON.stringify(todos));
  }
}
  const getLocalTodos=()=>{
    if(localStorage.getItem('todos')==  null){
      localStorage.setItem('todos',JSON.stringify([]));
  }else{
   let todoLocal= JSON.parse(localStorage.getItem('todos'));
   setTodos( todoLocal);
  }
};

  // Functions
  const filterHandler =()=>{
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo=>todo.completed==true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo=>todo.completed==false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  return (
    <div className="App">
        <header>
          <h1>Zuber's Todo List</h1>
        </header>
        <Form  
          inputText={inputText}  
          todos={todos} 
          setTodos={setTodos}   
          setInputText={setInputText}
          setStatus={setStatus}
        
        />

        <TodoList
         setTodos={setTodos}
          todos={todos}
          filteredTodos={filteredTodos}
          />
    </div>
  );
};



