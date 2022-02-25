import NewTodoInput from "../components/NewTodoInput";
import NewFolderInput from "../components/NewFolderInput";
import FolderList from "../components/FolderList";

const Todos = () => {
  const user = localStorage.getItem("profile")

  return (
    <div className="todosPage">
      {!user && (
        <div className="wrapper">
          <div className="container">
            <NewTodoInput />
            <NewFolderInput />
          </div>
          <div className="container">
            <FolderList />
          </div>
        </div>
      )}
    </div>
  );
};

export default Todos;
