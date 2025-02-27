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
    maxAge: 60 * 60, // 1 hora
  });
};

export const removeAuthCookie = async () => {
  const cookieStore = await cookies(); // Aguarda a Promise

  cookieStore.delete("token");
};
