import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

// @desc Get todos
// @route GET /todos
export const getTodos = async (req, res, next) => {
  const { userId } = req;

  try {
    const todos = await prisma.todo.findMany({
      where: {
        creatorId: userId
      },
      select: {
        id: true,
        text: true,
        completed: true,
        createdAt: true,
        folder: true
      }
    });

    return res.status(200).json({ data: todos });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const addTodo = async (req, res, next) => {
  const { text, completed, folder } = req.body;
  const { userId } = req;

  try {
    const { id } = await prisma.folder.findUnique({
      where: { name: folder },
      select: { id: true }
    });

    const newTodo = await prisma.todo.create({
      data: {
        text,
        completed,
        folderId: id,
        creatorId: userId
      },
      select: { id: true, text: true, completed: true, folderId: true }
    });

    // await prisma.folder.update({
    //   where: { name: folder },
    //   data: { todos: { create: { text, completed, creatorId: userId } } }
    // });

    // const folders = await prisma.folder.findMany({
    //   where: {
    //     creatorId: userId
    //   },
    //   select: {
    //     id: true,
    //     name: true,
    //     todos: true
    //   }
    // });

    res.status(200).json({ data: { newTodo } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const deleteTodo = async (req, res, next) => {
  const todoId = req.params.id;

  try {
    const deletedTodo = await prisma.todo.delete({
      where: { id: parseInt(todoId) },
      select: { folderId: true, id: true }
    });

    return res.status(200).json({ data: { deletedTodo } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const modifyTodo = async (req, res, next) => {
  const todoId = req.params.id;
  const { text } = req.body;

  try {
    const modifiedTodo = await prisma.todo.update({
      where: { id: parseInt(todoId) },
      data: { text },
      select: { id: true, text: true, completed: true, folderId: true }
    });

    return res.status(200).json({ data: { modifiedTodo } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const completeTodo = async (req, res, next) => {
  const todoId = req.params.id;
  const completedParam = req.params.completed;
  const completed = completedParam === "true";

  try {
    const completedTodo = await prisma.todo.update({
      where: { id: parseInt(todoId) },
      data: { completed },
      select: { id: true, text: true, completed: true }
    });

    return res.status(200).json({ data: { completedTodo } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
