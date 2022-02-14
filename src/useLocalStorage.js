import React, { useEffect, useState } from 'react';

const useLocalStorage = () => {
   const [todo,setTodo] = useState(JSON.parse(localStorage.getItem('todo'))|| []);
   const changeTodo = (item)=>{
         setTodo(item)
   }
   useEffect(()=>{
       localStorage.setItem('todo',JSON.stringify(todo))
   })
   return {todo,changeTodo}
};

export default useLocalStorage;