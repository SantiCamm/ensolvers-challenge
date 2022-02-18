import express from "express";
import { getTodos, addTodo, deleteTodo, modifyTodo, completeTodo } from "../controllers/todos.js";
import auth from "../middleware/auth.js"

const router = express.Router();
router
    .route("/")
    .get(auth, getTodos)
    .post(auth, addTodo)

router
    .route("/:id")
    .delete(auth, deleteTodo)

router
    .route("/:id")
    .post(auth, modifyTodo)

    router
    .route("/:id/:completed")
    .post(auth, completeTodo)


export default router;