const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_FOLDER":
      return { ...state, folders: [...state.folders, action.payload] };
    case "DELETE_FOLDER":
      return {
        ...state,
        folders: state.folders.filter(
          (folder) => folder._id !== action.payload._id
        ),
        todos: state.todos.filter((todo) => todo.folder != action.payload.name),
      };
    case "GET_FOLDERS":
      return { ...state, folders: action.payload, isLoading: false };
    case "GET_TODOS":
      return { ...state, todos: action.payload, isLoading: false };
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload], folders: [...state.folders, action.payload]};
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
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
