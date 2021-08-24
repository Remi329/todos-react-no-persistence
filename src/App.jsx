import React from "react";
import "./App.css";
import Input from "./components/Input";

// TODO: Use `useReducer` to manage complex state - CRUD

function App() {
  const [inputValue, setInputValue] = React.useState("");

  // Array destructuring
  const [todos, setTodos] = React.useState([]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClick = (e) => {
    switch (e.target.innerText.toLowerCase()) {
      case "update":
        setTodos((prevTodos) =>
          prevTodos.map((todo) => {
            if (todo.id === Number(e.target.dataset.todo)) {
              // Avoid mutating the original todo object
              // We create a new object by spreading out the original (...todo)
              // We compose the new object with the updated properties
              const updatedTodo = { ...todo, text: "Updated!" };
              return updatedTodo;
            }

            return todo;
          })
        );

        break;
      case "delete":
        console.log("Delketing", e.target.dataset.todo);
        break;
      default:
        console.log("👋🏾");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newTodo = form.elements[0].value.trim();
    if (newTodo) {
      setTodos((prevTodos) =>
        // Whatever is returned from the useState dispatch will be the new state
        // AVOID MUTATIONS!
        prevTodos.concat({
          id: prevTodos.length + 1,
          text: newTodo,
        })
      );
    }

    form.reset();
  };

  return (
    // Fragment tag
    <>
      <form onSubmit={handleSubmit} className="p-4">
        <Input value={inputValue} changeHandler={handleChange} />
        <button
          type="submit"
          className="bg-green-500 ml-1 p-4 rounded-sm text-white my-2"
        >
          Add Todo
        </button>
      </form>

      <ol className="p-4">
        {todos.map(({ id, text }) => (
          // TODO: Move this to a new component
          <li key={id} className="my-2">
            {text}{" "}
            <button
              className="bg-yellow-500 ml-1 rounded-xl p-2"
              onClick={handleClick}
              // TODO: Find out about naming rules on data attributes
              data-todo={id}
            >
              Update
            </button>
            <button
              className="bg-red-500 ml-1 rounded-xl text-white p-2"
              onClick={handleClick}
              data-todo={id}
            >
              Delete
            </button>
          </li>
        ))}
      </ol>
    </>
  );
}

export default App;
