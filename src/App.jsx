import React from "react";
import "./App.css";
import Input from "./components/Input";

function App() {
  // Are we updating?
  const [id2Edit, setId2Edit] = React.useState(null);

  // This is used to control the child component
  const [inputValue, setInputValue] = React.useState("");

  // Array destructuring
  const [todos, setTodos] = React.useState([]);

  const handleChange = (e) => {
    // As we type in the input, we want to update the state
    // This will updated the controlled Input component
    setInputValue(e.target.value);
  };

  const handleClick = (e) => {
    // Get the button text - which button was clicked?
    switch (e.target.innerText.toLowerCase()) {
      case "update":
        // We get the id from our data attribute in the button
        // We update state with this id
        // This will be checked when we submit so we can update, if necessary
        setId2Edit(e.target.dataset.todo);

        // How do we find the correct text to use?
        setInputValue(
          todos.find((todo) => todo.id === Number(e.target.dataset.todo)).text
        );
        break;
      case "delete":
        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo.id !== Number(e.target.dataset.todo))
        );
        break;
      default:
        throw new Error("Invalid! Check your button text!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const todoValue = form.elements[0].value.trim();

    if (todoValue) {
      // Check if this is an edit or a new todo
      if (id2Edit) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => {
            if (todo.id === Number(id2Edit)) {
              // Avoid mutating the original todo object
              // We create a new object by spreading out the original (...todo)
              // We compose the new object with the updated properties
              // `inputValue` is piece of state
              const updatedTodo = { ...todo, text: inputValue };
              return updatedTodo;
            }

            return todo;
          })
        );
        // ⚠️ Don't get stuck in edit mode!
        setId2Edit(null);

        // Clear the input
        setInputValue("");
      } else {
        setTodos((prevTodos) =>
          // Whatever is returned from the useState dispatch will be the new state
          // AVOID MUTATIONS!
          prevTodos.concat({
            id: prevTodos.length + 1,
            text: todoValue,
          })
        );

        setInputValue("");
      }
    }
  };

  return (
    // Fragment tag
    <>
      <form onSubmit={handleSubmit} className="p-4">
        {/* Input gets re-rendered whenever inputValue changes. */}
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
              // TODO{manav.misra}: Find out about naming rules on data attributes
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
