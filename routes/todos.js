import express from "express";
import { getTodos, addTodo, deleteTodo } from "../controllers/todos.js";
//import auth from "../middleware/auth"

const router = express.Router();
router
    .route("/")
    .get(getTodos)
    .post(addTodo)

router
    .route("/:id")
    .delete(deleteTodo)

export default router;