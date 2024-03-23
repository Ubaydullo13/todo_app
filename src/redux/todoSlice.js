import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todos: [],
    },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id!== action.payload);
        },
        editTodo: (state, action) => {
            state.todos = state.todos.map((todo) =>
                todo.id === action.payload.id
                 ? {...todo, text: action.payload.text }
                    : todo
            );
        },
        toggleCompleted: (state, action) => {
            state.todos = state.todos.map((todo) =>
                todo.id === action.payload.id
                ? {...todo, completed:!todo.completed }
                    : todo
            );
        },
        setTodos: (state, action) => {
            state.todos = action.payload;
        },
    },
})


export const { addTodo, deleteTodo, editTodo, toggleCompleted, setTodos } = todoSlice.actions;

export default todoSlice.reducer;