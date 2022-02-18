import { OAuth2Client } from "google-auth-library";

import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();


const auth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(
      res.status(404).json({ message: "Not authorized to access this route" })
      );
    }
    try {
      const client = new OAuth2Client(process.env.CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
      });
      
      const decodedToken = ticket.getPayload();

      const user = await prisma.user.findUnique({ where: { id: decodedToken.sub } });

    if (!user) {
      return next(
        res.status(404).json({ message: "User not found with that ID" })
      );
    }
    
    req.userId = decodedToken?.sub;

    next();
  } catch (error) {
    console.log(error)
    return next(
      res.status(401).json({ message: "Not authorized to access this route" })
    );
  }
};

export default auth;
