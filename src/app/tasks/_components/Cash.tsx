"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"

const formSchema = z.object({
  cash: z.coerce.number().min(1, { message: "Amount must be at least 1" }),
});

export type CashFormInfered = z.infer<typeof formSchema>

export type EditCashFormProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  onSubmit: (values: CashFormInfered) => Promise<void>;
  defaultValues: Partial<CashFormInfered>;
}

export function EditCashForm(props: EditCashFormProps) {
  const form = useForm<CashFormInfered>({
    resolver: zodResolver(formSchema),
    defaultValues: props.defaultValues,
  })

  async function onSubmit(values: CashFormInfered) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    await props.onSubmit(values)
    props.setOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-8">
        <FormField
          control={form.control}
          name="cash"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Cash</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={props.isLoading}>Submit</Button>
        </div>
      </form>
    </Form>
  )
}

type CashDialogProps = Omit<EditCashFormProps, "setOpen">;

export function CashDialog(props: CashDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} size="icon" variant="ghost">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"></path>
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit cash</DialogTitle>
          <EditCashForm {...props} setOpen={setOpen} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
