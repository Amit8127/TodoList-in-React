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
  const [perPage, setPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  const getAllTodosFun = async () => {
    try {
      const response = await getAllTodos(perPage, currentPage);
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

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handle items per page change
  const handlePerPageChange = (event) => {
    setPerPage(parseInt(event.target.value));
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  useEffect(() => {
    getAllTodosFun();
  }, [perPage, currentPage]);

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
          <button
            disabled={loading}
            className=" btn btn-outline-primary formBtn"
            onClick={addNewTodo}
          >
            Add Todo
          </button>
        </form>
      </div>
      <div style={{ paddingInline: "1rem" }}>
        <h2>All Todos</h2>
        <hr></hr>
      </div>
      <div className="todos">
        {todos.length === 0 ? (
          currentPage === 1 ? (
            <span className="emptyList">
              Your Todo List in Empty<br></br>
              <img src={emptyList} alt="empty" height={"400px"} />
            </span>
          ) : (
            <span className="emptyList">
              No More Todos found<br></br>
            </span>
          )
        ) : (
          todos
            .sort((a, b) => {
              // First, sort by status (false on top)
              if (a.status !== b.status) {
                return a.status === false ? -1 : 1;
              }
              // If status is the same, then sort by creation time
              return new Date(b.date) - new Date(a.date);
            })
            .map((todo, i) => (
              <TodoCard todo={todo} key={i} getAllTodosFun={getAllTodosFun} />
            ))
        )}
      </div>
      <div className="d-flex justify-content-center gap-2 mb-3 pagination">
        <p className="m-0">Todos per page : {perPage}</p>
        <select
          className="form-select form-select-sm"
          style={{ width: "10px" }}
          aria-label="Small select example"
          value={perPage}
          onChange={handlePerPageChange}
        >
          <option value="9">9</option>
          <option value="18">18</option>
          <option value="36">36</option>
        </select>
        <p
          className="m-0"
          style={{ cursor: "pointer" }}
          onClick={() =>
            handlePageChange(currentPage === 1 ? currentPage : currentPage - 1)
          }
        >
          {"<"}
        </p>
        <p className="m-0">{currentPage}</p>
        <p
          className="m-0"
          style={{ cursor: "pointer" }}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {">"}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
