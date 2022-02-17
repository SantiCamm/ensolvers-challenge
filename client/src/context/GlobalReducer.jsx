const reducer = (state, action) => {
  switch (action.type) {
    case "GET_FOLDERS":
      return { ...state, folders: action.payload, isLoading: false, foldersSelect: action.payload.map((folder) => folder.name)};
    case "ADD_FOLDER":
      return { ...state, folders: [...state.folders, action.payload], foldersSelect: [...state.folders, action.payload.name] };
    case "DELETE_FOLDER":
      return {
        ...state,
        folders: state.folders.filter(
          (folder) => folder._id !== action.payload._id
        ),
        todos: state.todos.filter((todo) => todo.folder !== action.payload.name),
      };
    case "GET_TODOS":
      return { ...state, todos: action.payload, isLoading: false };
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload]};
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
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
