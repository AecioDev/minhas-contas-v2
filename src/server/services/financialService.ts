import { prisma } from "@/lib/prisma";
import type { Expense, Revenue } from "@prisma/client";

interface FinancialData {
  totalExpenses: number;
  totalRevenues: number;
  totalPaid: number;
  totalToPay: number;
}

export async function getFinancialData(userId: string): Promise<FinancialData> {
  const [expenses, revenues] = await Promise.all([
    prisma.expense.findMany({
      where: { userId },
    }),
    prisma.revenue.findMany({
      where: { userId },
    }),
  ]);

  const totalExpenses = expenses.reduce(
    (acc: number, expense: Expense) => acc + expense.amount,
    0
  );

  const totalRevenues = revenues.reduce(
    (acc: number, revenue: Revenue) => acc + revenue.amount,
    0
  );

  const totalPaid = expenses
    .filter(
      (expense: Expense): expense is Expense & { paidAt: Date } =>
        expense.paidAt !== null
    )
    .reduce(
      (acc: number, expense: Expense & { paidAt: Date }) =>
        acc + expense.amount,
      0
    );

  const totalToPay = totalExpenses - totalPaid;

  return {
    totalExpenses,
    totalRevenues,
    totalPaid,
    totalToPay,
  };
}

export async function getExpenses(userId: string): Promise<Expense[]> {
  return prisma.expense.findMany({
    where: { userId },
  });
}

export async function getRevenues(userId: string): Promise<Revenue[]> {
  return prisma.revenue.findMany({
    where: { userId },
  });
}
