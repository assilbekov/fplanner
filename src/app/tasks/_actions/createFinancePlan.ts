"use server"

import { api } from "~/trpc/server";
import { createFinancePlanFormSchema } from "../_schemas/financePlanFormSchema";

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function onCreateFinancePlanAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  console.log({ prevState, data });
  const formData = Object.fromEntries(data);
  const parsed = createFinancePlanFormSchema.safeParse(formData);

  console.log({ prevState, parsed, formData });

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key]!.toString();
    }
    return {
      message: "Invalid form data",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  await api.finance.create.mutate(parsed.data);

  return { message: "User registered" };
}