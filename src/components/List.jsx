import React, { useContext } from 'react'
import TodoCard from './TodoCard';
import { TodoContext } from '../contexts/TodoContext';

const List = () => {
    const { todos } = useContext(TodoContext);
    return (
        <div className='list'>
            <h2>All Todos</h2>
            <div className="todos">
                {todos.length === 0 ? <span className='emptyList'>Your Todo List in Empty</span> : todos.map((todo, i) => (
                    <TodoCard todo={todo} index={i} key={i} />
                ))}
            </div>
        </div>
    )
}

export default List;