import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors"
import path from "path"
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

app.use("/folders", folders);
app.use("/todos", todos);
app.use("/users", users);

if (process.env.NODE_ENV === "production") {

  // We make our build folder the static folder
  app.use(express.static('client/build'));

  // Each request (except our api routes) will load the index.html file
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
);
}

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.bold
  )
);
