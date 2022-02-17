import React, { createContext, useReducer } from "react";
import GlobalReducer from "./GlobalReducer";
import * as api from "../api";

const initialState = {
  todos: [],
  folders: [],
  isLoading: true,
  authData: {success: false},
  foldersSelect: [],
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
      const folders = await api.fetchFolders();
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

      const res = await api.addFolder(folder, config);
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
      console.log("DALE BO")
      const todos = await api.fetchTodos();
      console.log(todos.data.data)
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

  async function modifyTodo(todoId, todoText) {
    try {
      const res = await api.modifyTodo(todoId, todoText);
      dispatch({ type: "MODIFY_TODO", payload: res.data.data });
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

  async function completeTodo(todoId, completed) {
    try {
      const res = await api.completeTodo(todoId, completed);
      dispatch({ type: "COMPLETE_TODO", payload: res.data.data });
    } catch (error) {
      
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        todos: state.todos,
        folders: state.folders,
        isLoading: state.isLoading,
        authData: state.authData,
        foldersSelect: state.foldersSelect,
        googleLogin,
        logout,
        getFolders,
        addFolder,
        deleteFolder,
        getTodos,
        addTodo,
        modifyTodo,
        deleteTodo,
        completeTodo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
  
};

