
import React, {useState, useEffect} from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";

import { useFindOne, useAction, useFindMany} from "@gadgetinc/react";
import {api} from "./index.js"

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  const [tasksData, setTasksData ] = useFindMany(api.todotask);
  const { data, error, fetching } = tasksData;

  function createTodoTaskList(data) {

    console.log(data?.length);
    for(let i = 0; i < data?.length; i++){
      let todoTask = {id: data?.[i]?.id, name: data?.[i]?.name, completed: data?.[i]?.completed};
      console.log(todoTask);
      setTasks([...tasks, todoTask]);
    }
    
  }

  useEffect(() => {
    createTodoTaskList(data);
    }, []);

    

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false};
    setTasks([...tasks, newTask]);
  };

  
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if(id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  
  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      if(id === task.id) {
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const taskList = tasks.map(task => (
    <Todo 
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  //need to take care of tasklist length changing dynamically 
  //const headingText = `${taskList.length} tasks remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>Todo-App</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        <FilterButton/>
        <FilterButton/>
        <FilterButton/>
      </div>
      <h2 id="list-heading">
        {/* {headingText} */}
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
        {/* {taskListGadget} */}
      </ul>
    </div>
  );
}


export default App;
