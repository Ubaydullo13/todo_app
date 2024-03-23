import { MdModeEdit, MdDelete } from "react-icons/md";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  editTodo,
  toggleCompleted,
  setTodos
} from "./redux/todoSlice";
function App() {
  const todoRef = useRef();
  const editTaskRef =useRef();
  let todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      dispatch(setTodos(storedTodos));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function validate() {
    if (todoRef.current.value.trim() === "") {
      todoRef.current.classList.add("border-red-500");
      return false;
    }
    todoRef.current.classList.remove("border-red-500");
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const todo = {
      id: Date.now(),
      text: todoRef.current.value,
      completed: false,
    };
    if (validate()) {
      dispatch(addTodo(todo));
      todoRef.current.value = "";
    }
  }

  function handleEdit(todo) {
    setEdit(todo);
  }

  function handleSubmitEdit(e) {
    e.preventDefault();
    const updatedTask = {
      ...edit,
      text: editTaskRef.current.value,
    };
      dispatch(editTodo(updatedTask));
      editTaskRef.current.value = "";
    
    setEdit(null);
  }

  function handleCompleted(id, completed) {
    dispatch(toggleCompleted({ id, completed }));
  }
  return (
    <div className="max-w-[1200px] w-full box-border mx-auto">
      <h1 className="text-5xl text-center font-bold mt-5">Todo List</h1>
      <form
        onClick={handleSubmit}
        className="flex justify-center items-center gap-3 mt-5"
      >
        <input
          ref={todoRef}
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-2xl"
          required
        />
        <button className="btn btn-primary text-white">ADD</button>
      </form>
      <ul className="flex flex-col items-center gap-3 mt-10">
        {todos.length > 0 &&
          todos.map((todo, index) => {
            return (
              <li
                key={index}
                className="border rounded-lg flex items-center justify-between p-1 max-w-3xl w-full"
              >
                <div className="flex items-center gap-4">
                  <input
                    onChange={(e) => {
                      handleCompleted(todo.id, e.target.checked);
                    }}
                    checked={todo.completed ? true : false}
                    type="checkbox"
                    className="checkbox checkbox-secondary rounded-full ml-3"
                  />
                   <span
                      className={
                        todo.completed
                          ? "line-through text-xl"
                          : "text-gray-300 text-xl"
                      }
                    >
                      {todo.text}
                    </span>
                </div>

                <div>
                  <button
                    onClick={() => handleEdit(todo)}
                    className="btn btn-ghost text-lg"
                  >
                    <MdModeEdit />
                  </button>
                  <button
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    className="btn btn-ghost text-lg"
                  >
                    <MdDelete />
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
      {edit && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-slate-800 p-5 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl font-bold mb-2">Edit Task</h2>
            <form onSubmit={handleSubmitEdit}>
              <input
                type="text"
                placeholder="Enter Name..."
                className="input input-bordered w-full mb-2"
                ref={editTaskRef}
                defaultValue={edit.text}
              />
              <div className="flex items-center gap-1">
              <button
                type="submit"
                className="btn btn-secondary w-[49%] max-w-xl text-fuchsia-50 text-lg"
              >
                EDIT
              </button>
              <button
                onClick={() => setEdit(null)}
                className="btn btn-error w-[49%] max-w-xl text-fuchsia-50 text-lg"
              >CANCEL</button>
              </div>
              </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
