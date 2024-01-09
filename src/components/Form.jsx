import React, { useContext, useState } from 'react'
import { TodoContext } from '../contexts/TodoContext';

const Form = () => {
    const { addTodo } = useContext(TodoContext);
    const [title, setTitle] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        addTodo(title);
        setTitle("");
    }
    return (
        <div className='form'>
            <form>
                <input className='input' type="text" placeholder='Write your task here' value={title} onChange={(e) => setTitle(e.target.value)} />
                <button onClick={handleSubmit}>Add Todo</button>
            </form>
        </div>
    )
}

export default Form;