import React, { useContext } from 'react'
import { TodoContext } from '../contexts/TodoContext';

const TodoCard = ({ todo, index }) => {
    const { deleteTodo } = useContext(TodoContext);
    const handleDeleteTodo = () => {
        deleteTodo(index);
    }
    return (
        <div className="todo">
            <h3>ID : {index + 1}</h3>
            <h4>{todo.title}</h4>
            <div className="buttons">
                <button>Edit</button>
                <button onClick={handleDeleteTodo}>Delete</button>
            </div>
        </div>
    )
}

export default TodoCard