const reducer = (state, action) => {
  switch (action.type) {
    case "GET_FOLDERS":
      return {
        ...state,
        folders: action.payload,
        isLoading: false,
        foldersSelect: action.payload.map((folder) => folder.name)
      };
    case "ADD_FOLDER":
      const { newFolder } = action.payload;
      return {
        ...state,
        folders: [...state.folders, newFolder],
        foldersSelect: [...state.foldersSelect, newFolder.name]
      };
    case "DELETE_FOLDER":
      const { deletedFolder } = action.payload;
      return {
        ...state,
        folders: state.folders.filter(
          (folder) => folder.id !== deletedFolder.id
        ),
        foldersSelect: state.foldersSelect.filter(
          (folder) => folder !== deletedFolder.name
        ),
        todos: state.todos.filter((todo) => todo.folder !== action.payload.name)
      };

    case "GET_TODOS":
      return { ...state, todos: action.payload, isLoading: false };
    case "ADD_TODO":
      const { newTodo } = action.payload;
      return {
        ...state,
        todos: [...state.todos, newTodo],
        folders: state.folders.map((folder) =>
          folder.id === newTodo.folderId
            ? { ...folder, todos: [...folder.todos, newTodo] }
            : folder
        )
      };
    case "DELETE_TODO":
      const { deletedTodo } = action.payload;
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
        folders: state.folders.map((folder) =>
          folder.id === deletedTodo.folderId
            ? {
                ...folder,
                todos: folder.todos.filter((todo) => deletedTodo.id !== todo.id)
              }
            : folder
        )
      };
    case "MODIFY_TODO":
      const { modifiedTodo } = action.payload;
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === modifiedTodo.id ? modifiedTodo : todo
        ),
        folders: state.folders.map((folder) =>
          folder.id === modifiedTodo.folderId
            ? {
                ...folder,
                todos: folder.todos.map((todo) => todo.id === modifiedTodo.id ? modifiedTodo : todo)
              }
            : folder
        )
      };
    case "COMPLETE_TODO":
      const { completedTodo } = action.payload;
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === completedTodo.id ? completedTodo : todo
        )
      };

    case "GOOGLE_LOGIN":
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      return { ...state, authData: { success: true, user: action.payload } };
    case "LOGOUT":
      localStorage.clear();
      return { ...state, authData: {} };
    default:
      return state;
  }
};

export default reducer;
