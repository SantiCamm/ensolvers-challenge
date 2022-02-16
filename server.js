import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors"

import todos from "./routes/todos.js";
import users from "./routes/users.js";
import folders from "./routes/folders.js";

dotenv.config({ path: ".env" });
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use("/folders", users);
app.use("/todos", todos);
app.use("/users", users);

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.bold
  )
);
