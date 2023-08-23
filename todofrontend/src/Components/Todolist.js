import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";

export const Todolist = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/todo")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const clearItemshandler = async (e) => {
    try {
      const response = await fetch("http://localhost:5000/api/todo/clear", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const updatedTodos = await fetch("http://localhost:5000/api/todo");
        let upto = await updatedTodos.json();
        let y = document.getElementById("te");
        y.value = "";
        setTodos(upto);
      } else {
        console.error("was not able to fetch");
      }
    } catch (err) {
      console.error(
        "error caused : error is ======>",
        err
      );
    }
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      let y = document.getElementById("te");
      let nitem = y.value;
      const response = await fetch("http://localhost:5000/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item: nitem }),
      });

      if (response.ok) {
        const updatedTodosResponse = await fetch(
          "http://localhost:5000/api/todo"
        );
        const updatedTodos = await updatedTodosResponse.json();
        setTodos(updatedTodos);
      } else {
        console.error("error in fetching updated todos , could be trying to add the same element twice");
      }
    } catch (err) {
      console.error("error in fetching todos ====>", err);
    }
  };

  //delete function
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todo/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const updatedTodosResponse = await fetch(
          "http://localhost:5000/api/todo"
        );
        const updatedTodos = await updatedTodosResponse.json();
        setTodos(updatedTodos);
      } else {
        console.error("something malfunctioned while deleting your todo item");
      }
    } catch (err) {
      console.error("error deleting your todoitem ", err);
    }
  };
  //delete ends here
  return (
    <>

      <div className="d-flex justify-content-center align-items-center my-5 mx-auto">
        <h1 className="display-1"><mark>ToDoList App</mark></h1>
      </div>
      <div className="d-flex flex-column my-3 mx-2">
        <form action="/" onSubmit={handleUpdate} method="post">
          <input type="text" className="form-control" id="te" />
        </form>
        <div className="d-flex justify-content-center align-items-center ">
        <button
          className="btn btn-primary mt-4 mb-2 mx-2"
          onClick={handleUpdate}
          type="submit"
        >
          submit
        </button>
        <button
          className="btn btn-primary mt-4 mb-2 mx-2"
          onClick={clearItemshandler}
        >
          clear
        </button>
        </div>
        <div>
          {todos.map((todo, index) => (
            <Todo
              item={todo.item}
              key={index}
              id={todo._id}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
};
