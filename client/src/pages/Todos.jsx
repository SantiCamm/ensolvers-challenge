import NewTodoInput from "../components/NewTodoInput";
import NewFolderInput from "../components/NewFolderInput";
import TodoList from "../components/TodoList";
import FolderList from "../components/FolderList";

const Todos = () => {
  return (
    <div className="todosPage">
      <div className="wrapper">
        <div className="container">
          <NewTodoInput />
        </div>
        <div className="container">
          <NewFolderInput />
        </div>
        <div className="container">
          <FolderList />
        </div>
      </div>
    </div>
  );
};

export default Todos;
