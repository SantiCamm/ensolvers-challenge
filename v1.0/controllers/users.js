import { OAuth2Client } from "google-auth-library";

import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const googleLogin = async (req, res, next) => {
  const { token } = req.body;
  const client = new OAuth2Client(process.env.CLIENT_ID);

  if (!token) {
    return res.status(500).json({ message: "No token provided" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
    });

    const decodedToken = ticket.getPayload();
    const { sub, name, email, picture } = decodedToken;

    let googleUser = await prisma.user.findUnique({ where: { email } });

    if (!googleUser) {
      await prisma.user.create({
        data: {
          id: sub,
          name,
          email
        }
      });
    }

    return res.status(200).json({ result: { sub, picture }, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
