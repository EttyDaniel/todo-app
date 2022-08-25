import React,  { useState } from "react";
import { useAction, useFindMany } from "@gadgetinc/react";
import {api} from "../index.js"

export default function Form(props) {

  const [name, setName] = useState(''); 

  const [result2, createToDoTask] = useAction(api.todotask.create);
  const { data2, error2, fetching2 } = result2;

  
  function handleChange(e) {
    setName(e.target.value);
  }

  function HandleSubmit(e) {
    e.preventDefault();
    createAction(name);
    props.addTask(name);
    setName("");
  }
  
  async function createAction (newTodo) {
    await createToDoTask({
        todotask: {
          "name": newTodo
        },
    });
  }
  
  return(
    <form onSubmit={HandleSubmit}>
    <h2 className="label-wrapper">
      <label htmlFor="new-todo-input" className="label__lg">
        What needs to be done?
      </label>
    </h2>
    <input
      type="text"
      id="new-todo-input"
      className="input input__lg"
      name="text"
      autoComplete="off"
      value={name}
      onChange={handleChange}
    />
    <button type="submit" className="btn btn__primary btn__lg">
      Add
    </button>
  </form>);
}