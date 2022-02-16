import express from "express";
import { getFolders, addFolder, deleteFolder } from "../controllers/folders.js";
//import auth from "../middleware/auth"

const router = express.Router();
router
    .route("/")
    .get(getFolders)
    .post(addFolder)

router
    .route("/:id")
    .delete(deleteFolder)

export default router;