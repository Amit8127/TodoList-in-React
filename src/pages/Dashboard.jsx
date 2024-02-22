import React, { useEffect, useMemo, useState } from "react";
import { doLogOut } from "../auth/auth";
import { Link, useNavigate } from "react-router-dom";
import TodoCard from "../components/TodoCard";
import { createTodo, getAllTodos, logout } from "../services/userServices";
import { toast } from "react-toastify";
import emptyList from "../assets/empty.gif";
import profile from "../assets/profile.png";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [loading, setLoading] = useState(false);
  const memoizedTodoText = useMemo(() => todoText, [todoText]);
  const navigate = useNavigate();

  const getAllTodosFun = async () => {
    try {
      const response = await getAllTodos();
      if (response.status === 200) setTodos(response.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const addNewTodo = async (e) => {
    e.preventDefault();
    if (todoText.trim() !== "")
      try {
        setLoading(true);
        const response = await createTodo(todoText);
        getAllTodosFun();

        if (response.status !== 201) {
          toast.error(response.message);
          return;
        }
        toast.success(response.message);
        setTodoText("");
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
  };

  const logoutfun = async () => {
    try {
      setLoading(true);
      const response = await logout();
      if (response.status !== 200) {
        toast.error(response);
        return;
      }
      doLogOut();
      navigate("/");
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTodosFun();
  }, []);

  return (
    <div className="dashboard">
      <nav className="bg-dark z-2">
        <h2 className="logo">Todo App</h2>
        <div className="d-flex">
          <img src={profile} alt="profile" className="me-2" height={25} />
          {!loading ? (
            <Link onClick={logoutfun}>Logout</Link>
          ) : (
            <Link>Logout</Link>
          )}
        </div>
      </nav>
      <div className="form">
        <form>
          <input
            className="input"
            type="text"
            placeholder="Write your task here"
            value={memoizedTodoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
          <button disabled={loading} className="formBtn" onClick={addNewTodo}>
            Add Todo
          </button>
        </form>
      </div>
      <div style={{ paddingInline: "1rem" }}>
        <h2>All Todos</h2>
        <hr></hr>
      </div>
      <div className="list">
        <div className="todos">
          {todos.length === 0 ? (
            <span className="emptyList">
              Your Todo List in Empty<br></br>
              <img src={emptyList} alt="empty" height={"400px"} />
            </span>
          ) : (
            todos.map((todo, i) => (
              <TodoCard todo={todo} key={i} getAllTodosFun={getAllTodosFun} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
