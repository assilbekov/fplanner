import { z } from "zod";

export const createFinancePlanFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  type: z.enum(["income", "expense"], { required_error: "Please select a type" }),
  monthlyAmount: z.coerce.number().min(1, { message: "Amount must be at least 1" }),
  interestRate: z.coerce.number().min(0, { message: "Interest rate must be at least 0" }),
  startDate: z.date(),
  endDate: z.date().optional(),
})