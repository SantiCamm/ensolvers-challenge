import React, { createContext, useReducer } from "react-router";
import GlobalReducer from "./GlobalReducer";
import * as api from "../api";

const initialState = {
  todos: [],
  folders: [],
  isLoading: true,
  authData: {},
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  async function googleLogin(token, navigate) {
    try {
      const googleUserData = await api.googleLogin({ token });
      dispatch({
        type: "GOOGLE_LOGIN",
        payload: googleUserData.data,
      });
      navigate("/todos");
    } catch (error) {
      console.log(error);
    }
  }

  function logout(navigate) {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  }

  async function getFolders() {
    try {
      const folders = await api.fetchTodos();
      dispatch({
        type: "GET_FOLDERS",
        payload: folders.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function addFolder(folder) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await api.addFolder(todo, config);
      dispatch({
        type: "ADD_FOLDER",
        payload: res.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteFolder(folder) {
    try {
      await api.deleteFolder(folder._id);
      dispatch({ type: "DELETE_FOLDER", payload: folder });
    } catch (error) {
      console.log(error);
    }
  }

  async function getTodos() {
    try {
      const todos = await api.fetchTodos();
      dispatch({
        type: "GET_TODOS",
        payload: todos.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function addTodo(todo) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await api.addTodo(todo, config);
      dispatch({
        type: "ADD_TODO",
        payload: res.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTodo(todoId) {
    try {
      await api.deleteTodo(todoId);
      dispatch({ type: "DELETE_TODO", payload: todoId });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        state,
        googleLogin,
        logout,
        getFolders,
        addFolder,
        deleteFolder,
        getTodos,
        addTodo,
        deleteTodo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
  
};

