import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export const getFolders = async (req, res, next) => {
  const { userId } = req;

  try {
    const folders = await prisma.folder.findMany({
      where: {
        creatorId: userId
      }, select : {
          id: true,
          name: true,
          todos: true,
      }
    });

    return res.status(200).json({ data: folders });
  } catch (error) {
      console.log(error)
    return res.status(500).json({ message: error });
  }
};

export const addFolder = async (req, res, next) => {
  const { userId } = req;
  const { name } = req.body;

  try {
    await prisma.folder.create({
      data: {
        name,
        todos: {},
        creatorId: userId
      }
    });

    res.status(200).json({ data: name });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const deleteFolder = async (req, res, next) => {};
