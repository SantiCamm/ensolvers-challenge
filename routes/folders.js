import express from "express";
import { getFolders, addFolder, deleteFolder } from "../controllers/folders.js";
import auth from "../middleware/auth.js"

const router = express.Router();
router
    .route("/")
    .get(auth, getFolders)
    .post(auth, addFolder)

router
    .route("/:id")
    .delete(auth, deleteFolder)

export default router;