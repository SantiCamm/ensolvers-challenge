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
      const {newFolder} = action.payload
      return {
        ...state,
        folders: [...state.folders, newFolder],
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
      return { ...state, todos: action.payload, isLoading: false };
    case "ADD_TODO":
      const {newTodo} = action.payload
      return {
        ...state,
        todos: [...state.todos, newTodo],
        // folders: [...state.folders, state.folders.map((folder) => folder.name === newTodo.folder ? [...folder.todos, newTodo.text] : [...folder.todos])]
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
