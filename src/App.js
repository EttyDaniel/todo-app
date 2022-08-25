
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
  //console.log("length: ",data?.length); //=> number of rows
  // console.log("myId: ",data?.[0]?.id); //=> todo id
  // console.log("myName: ",data?.[0]?.name); //=> todo name
  // console.log("completed: ",data?.[0]?.completed); //=> todo name
  // console.log("all: ",data);//=? all of todo rows

  function createTodoTaskList(data) {

    // let todoTask = {id: myTasks?.[0]?.id, name: myTasks?.[0]?.name, completed: myTasks?.[0]?.completed};
    // setTasks([tasks, todoTask]);
    // todoTask = {id: myTasks?.[1]?.id, name: myTasks?.[1]?.name, completed: myTasks?.[1]?.completed};
    // setTasks([tasks, todoTask]);
    //console.log('hello');

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
    //console.log(tasks);
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

    // const [result, refresh] = useFindOne(api.todotask, "2");
    // const { data, error, fetching } = result;

    // const taskListGadget = 
    //   <Todo
    //     id={data?.id}
    //     name={data?.name}
    //     completed={data?.completed}
    //     key={data?.id}
    //     toggleTaskCompleted={""}
    //     deleteTask={""}
    //     editTask={""}
    //   />



    // useEffect(() => {
    //   createAction();
    //   console.log(result2.data?.id); //=> a string
    // }, []);


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
