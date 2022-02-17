import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import NewTodoInput from "../components/NewTodoInput";
import NewFolderInput from "../components/NewFolderInput";
import TodoList from "../components/TodoList";
import FolderList from "../components/FolderList";

const Todos = () => {
  const user = localStorage.getItem("profile")

  return (
    <div className="todosPage">
      {user && (
        <div className="wrapper">
          <div className="container">
            <NewTodoInput />
            <NewFolderInput />
          </div>
          <div className="container">
            <TodoList />
          </div>
        </div>
      )}
    </div>
  );
};

export default Todos;
