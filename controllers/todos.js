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
    return res.status(500).json({ message: error });
  }
};

export const addTodo = async (req, res, next) => {
  const { text, completed, folder } = req.body;
  const { userId } = req;

  const newTodo = { text, completed, folder };

  try {
    await prisma.todo.create({
      data: {
        text,
        completed,
        folderId: 1,
        creatorId: userId
      }
    });

    await prisma.folder.update({
      where: { name: folder },
      data: { todos: { create: { text, completed, creatorId: userId } } }
    });
    res.status(200).json({ data: newTodo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const deleteTodo = async (req, res, next) => {
  const { userId } = req;
  const { todoId } = req.body;

  try {
    await prisma.todo.delete({
      where: { id: todoId }
    });

    return res.status(200).json({ data: "Todo deleted succesfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
