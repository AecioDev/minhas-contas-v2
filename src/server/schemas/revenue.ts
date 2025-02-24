import { z } from "zod";

export const RevenueSchema = z.object({
  id: z.string(),
  description: z.string(),
  amount: z.number(),
  receiveDate: z.date(),
  receivedAt: z.date().optional(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Revenue = z.infer<typeof RevenueSchema>;
