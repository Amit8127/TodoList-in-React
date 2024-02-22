import React, { useState } from "react";
import { deleteTodoWithId, editTodoWithId } from "../services/userServices";
import { toast } from "react-toastify";

const TodoCard = ({ todo, getAllTodosFun }) => {
  const [loading, setLoading] = useState(false);

  const deleteTodoFun = async () => {
    try {
      setLoading(true);
      const response = await deleteTodoWithId(todo._id);
      if(response.status !== 200) {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      await getAllTodosFun();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const editTodoFun = async () => {
    const newData = prompt("Enter new Todo Text here: ");
    if(newData !== null)
    try {
      setLoading(true);
      const response = await editTodoWithId(todo._id, newData);
      if (response.status !== 200) {
        toast.error(response.error);
        return;
      }
      toast.success(response.message);
      await getAllTodosFun();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="todo">
      <h5 style={{ minHeight: "50px" }}>{todo.todo}</h5>
      <div className="buttons">
        <button disabled={loading} onClick={editTodoFun}>
          Edit
        </button>
        <button disabled={loading} onClick={deleteTodoFun}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
