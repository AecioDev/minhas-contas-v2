import { z } from "zod";

export const ExpenseSchema = z.object({
  id: z.string(),
  description: z.string(),
  amount: z.number(),
  dueDate: z.date(),
  paidAt: z.date().optional(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Expense = z.infer<typeof ExpenseSchema>;
