import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

interface UserData {
  id: number;
  email: string;
  role: string;
}

export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: string;
}) => {
  const hashedPassword = await hash(userData.password, 12);

  return prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });
};

export const validateUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return null;

  const isValid = await compare(password, user.password);
  if (!isValid) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

export const generateToken = (userData: UserData): string => {
  return jwt.sign(userData, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string): UserData | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as UserData;
  } catch (error) {
    return null;
  }
};

export const setAuthCookie = async (token: string) => {
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/", // Disponível em todas as páginas
    maxAge: 60 * 60 * 24, // Expira em 1 dia
  });
};

export const removeAuthCookie = async () => {
  const cookieStore = await cookies(); // Aguarda a Promise

  cookieStore.delete("token");
};
