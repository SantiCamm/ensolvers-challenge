import axios from 'axios'

const todosAPI = axios.create({baseURL: "http://localhost:5000"})
const foldersAPI = axios.create({baseURL: "http://localhost:5000"})
const usersAPI = axios.create({baseURL: "http://localhost:5000"})

todosAPI.interceptors.request.use((req) => {
    const data = JSON.parse(localStorage.getItem("profile"));

    if(!req?.headers) {
        throw new Error(`Expected 'req' and 'req.headers' not to be undefined`);
    }
    
      if (data.token) {
        req.headers.authorization = `Bearer ${
          data.token
        }`;
      }
      return req;
});

foldersAPI.interceptors.request.use((req) => {
  const data = JSON.parse(localStorage.getItem("profile"));

  if(!req?.headers) {
      throw new Error(`Expected 'req' and 'req.headers' not to be undefined`);
  }
  
    if (data.token) {
      req.headers.authorization = `Bearer ${
        data.token
      }`;
    }
    return req;
});

//todosAPI
export const fetchTodos = () => todosAPI.get("/todos")
export const addTodo = (todo, config) => todosAPI.post("/todos", todo, config);
export const deleteTodo = (todoId) => todosAPI.delete(`/todos/${todoId}`)

//foldersAPI
export const fetchFolders = () => foldersAPI.get("/folders")
export const addFolder = (folder, config) => foldersAPI.post("/folders", folder, config);
export const deleteFolder = (folderId) => foldersAPI.delete(`/folders/${folderId}`)

//usersAPI
export const googleLogin = (token) => usersAPI.post("/users/auth", token);