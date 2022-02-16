import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

// @desc Get todos
// @route GET /todos
export const getTodos = async (req, res, next) => {
  const { userId } = req;

  try {
    const todos = await prisma.todo.findUnique({
      where: {
        creator: userId,
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
  
    const newTodo = {
      creatorId: userId,
      text,
      completed,
      folder,
    };
  
    try {
      await prisma.user.create({
          data: newTodo,
      });
      res.status(200).json({ data: newTodo });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
};

export const deleteTodo = async (req, res, next) => {};
