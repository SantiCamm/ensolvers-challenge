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
      console.log(action.payload);
      return {
        ...state,
        folders: [...state.folders, action.payload],
        foldersSelect: [...state.foldersSelect, action.payload]
      };
    case "DELETE_FOLDER":
      return {
        ...state,
        folders: state.folders.filter(
          (folder) => folder.id !== action.payload.id
        ),
        todos: state.todos.filter((todo) => todo.folder !== action.payload.name)
      };
    case "GET_TODOS":
      console.log("BOCAA");
      return { ...state, todos: action.payload, isLoading: false };
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload.newTodo],
        folders: [...state.folders, action.payload.folders]
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload)
      };
    case "MODIFY_TODO":
      const { modifiedTodo } = action.payload;
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === modifiedTodo.id ? modifiedTodo : todo
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
