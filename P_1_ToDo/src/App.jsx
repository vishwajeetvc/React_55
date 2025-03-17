import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([
    { title: "Title1", isDone: false, id: 1981324124 },
    { title: "Title2", isDone: false, id: 1981324194 },
  ]);

  const add = (title) => {
    if (!title || todos.some((todo) => todo.title == title)) return;
    setTodos((prev) => [...prev, { title, id: Date.now(), isDone: false }]);
  };

  const del = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const done = (id) => {
    const newTodos = todos.map((todo) => {
      if(todo.id == id){
        return {title : todo.title, id : todo.id, isDone : true};
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <>
      <AddTodo add={add} />
      <List del={del} todos={todos} done={done}/>
    </>
  );
}

function List({ del, todos, done }) {
  return (
    <>
      <table>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>
                {todo.isDone ? "***" : " "}
                {todo.id.toString().slice(-4)} {todo.title}
              </td>
              <td onClick={()=>done(todo.id)}>Done</td>
              <td onClick={()=>del(todo.id)}>Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function AddTodo({ add }) {
  const [title, setTitle] = useState("");
  return (
    <>
      <input value={title} type="text" onChange={(e) => setTitle(e.target.value)} />
      <button onClick={() => {
        add(title);
        setTitle("");
      }}>Add</button>
    </>
  );
}
