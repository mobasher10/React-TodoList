import "./index.css";
import Sun from "./assets/images/icon-sun.svg";
import CrossIcon from "./assets/images/icon-cross.svg";
import { useState } from "react";

const initialTodos = [
  {
    id: crypto.randomUUID(),
    todoItem: "Wash Your Clothes 🧼",
    isCheked: false,
  },
  {
    id: crypto.randomUUID(),
    todoItem: "Clean Your Room 🧹",
    isCheked: false,
  },
  {
    id: crypto.randomUUID(),
    todoItem: "Wakeup Early 🕐",
    isCheked: false,
  },
];

function App() {
  const [todo, setTodo] = useState(initialTodos);

  function handleActive() {
    todo.filter((t) => !t.isCheked);
  }
  //NOTE:

  function handleClearAll() {
    setTodo((prevTodos) => []);
  }

  function hadleToggle(id) {
    setTodo((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCheked: !todo.isCheked } : todo
      )
    );
  }

  function handleToggleItem(id) {
    setTodo((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCheked: !todo.isCheked } : todo
      )
    );
  }

  function handleDelte(id) {
    setTodo(() => todo.filter((t) => t.id !== id));
  }

  function handleTodo(newTodoItem) {
    setTodo((prevTodos) => [...prevTodos, newTodoItem]);
  }

  return (
    <div className="app">
      <main className="main">
        <div className="top">
          <h1 className="main_header">Todo</h1>
          <img src={Sun} className="sun" />
        </div>
        <Form onAddTodo={handleTodo} />
        <TodoList
          todo={todo}
          onToggleHandler={handleToggleItem}
          onDeleteHandler={handleDelte}
          onHandleClearAll={handleClearAll}
        />
        {/* <Stats
          todo={todo}
          onHandleActive={handleActive}
          onHandleClearAll={handleClearAll}
        /> */}
      </main>
    </div>
  );
}

function Form({ onAddTodo }) {
  const [todoItem, setTodoItem] = useState("");
  // [isCheked , setIsChecked]=useState(fa)

  function handleSubmit(e) {
    e.preventDefault();

    if (!todoItem) return;

    const id = crypto.randomUUID();
    const newTodoItem = {
      id: id,
      todoItem,
      isCheked: false,
    };
    onAddTodo(newTodoItem);
    setTodoItem("");
    // console.log(todoItem);
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
      <button></button>
      {/* <span style={item.packed ? { textDecoration: "line-through" } : {}}> */}

      <input
        type="text"
        name="todo"
        id="todo"
        placeholder="Create a new todo"
        value={todoItem}
        onChange={(e) => setTodoItem(e.target.value)}
      />
    </form>
  );
}

function TodoList({
  todo,
  onToggleHandler,
  onDeleteHandler,
  onHandleClearAll,
}) {
  const [filter, setFilter] = useState("all");

  const numOfItems = todo.length;

  const filterTodos = todo.filter((t) => {
    if (filter === "all") {
      return true;
    } else if (filter === "active") {
      return !t.isCheked;
    } else {
      return t.isCheked;
    }
  });

  return (
    <>
      <ul className="todo_list">
        {filterTodos.map((todo) => (
          <Todo
            todo={todo}
            key={todo.id}
            onToggleHandler={onToggleHandler}
            onDeleteHandler={onDeleteHandler}
          />
        ))}
      </ul>
      <div className="stats">
        <p className="items_left">
          {numOfItems ? numOfItems + " " + "Todos left" : 0 + " " + " Todos"}
        </p>

        <div className="current_stats">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("active")}>Active</button>
          <button onClick={() => setFilter("complete")}>Complete</button>
        </div>
        <button onClick={onHandleClearAll} className="clearAllBtn">
          Clear All
        </button>
      </div>
    </>
  );
}

function Todo({ todo, onToggleHandler, onDeleteHandler }) {
  return (
    <li className="todo_item">
      <input
        type="checkbox"
        className="checkbox"
        checked={todo.isCheked}
        onClick={() => onToggleHandler(todo.id)}
        // onClick={() => onIsCheked(todo.isCheked)}
      />
      {/* <p>{todo.todoItem}</p> */}
      <p
        style={
          todo.isCheked
            ? {
                textDecoration: "line-through",
                textDecorationColor: "rgb(255, 90, 255)",
              }
            : {}
        }
      >
        {todo.todoItem}
      </p>
      <img
        src={CrossIcon}
        className="cross_icon"
        onClick={() => onDeleteHandler(todo.id)}
      />
    </li>
  );
}

// function Stats({ todo, onHandleActive, onHandleClearAll }) {
//   const numOfItems = todo.length;

//   return (

//   );
// }
// function Footer() {
//   return (
//     <div className="attribution">
//       Challenge by{" "}
//       <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
//         Frontend Mentor
//       </a>
//       . Coded by <a href="#">Your Name Here</a>.
//     </div>
//   );
// }
export default App;
