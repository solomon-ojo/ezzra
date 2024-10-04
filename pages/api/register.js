import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { fullname, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
      },
    });
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    return res.status(400).json({ error: "Email already exists" });
  }
}
