import { api } from "./serviceUtils";

export const signUp = async (userData) => {
  try {
    const response = await api.post("/register", {
      name: userData.name,
      password: userData.password,
      email: userData.email,
      username: userData.username,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const logIn = async (formData) => {
  try {
    const response = await api.post("/login", {
      loginId: formData.email,
      password: formData.password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/logout");
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const logoutfromAll = async () => {
  try {
    const response = await api.post("/logout_from_all_devices");
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const createTodo = async (todoText) => {
  try {
    const response = await api.post("/create-item", { todoText: todoText });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getAllTodos = async (perPage, currentPage) => {
  try {
    const response = await api.get("/read-item", {
      params: { page: currentPage, limit: perPage }, // Pass parameters as query parameters
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const editTodoWithId = async (id, newData) => {
  try {
    const response = await api.post("/edit-item", { id: id, newData: newData });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const updateStatusTodoWithId = async (id, status) => {
  try {
    const response = await api.put("/update-item", { id: id, status: status });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const deleteTodoWithId = async (id) => {
  try {
    const response = await api.delete(`/delete-item/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
