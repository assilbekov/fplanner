import type { InferSelectModel } from "drizzle-orm";
import type { finances as financesSchema } from "~/server/db/schema";
import { api } from "~/trpc/react"

export type FinancesModel = InferSelectModel<typeof financesSchema>;

export const useFinancesData = ({ finances }: {
  finances: FinancesModel[];
}) => {
  const { 
    data, 
    refetch
  } = api.finance.getAll.useQuery(undefined, { initialData: finances });
  const {
    mutateAsync: createUpdateAsync,
    isLoading: createIsLoading
  } = api.finance.create.useMutation({
    onSuccess: () => refetch(),
  });
  const {
    mutateAsync: uptateMutateAsync,
    isLoading: uptateIsLoading
  } = api.finance.update.useMutation({
    onSuccess: () => refetch(),
  });

  return {
    finances: data,
    createUpdateAsync,
    uptateMutateAsync,
    createIsLoading,
    uptateIsLoading
  }
}