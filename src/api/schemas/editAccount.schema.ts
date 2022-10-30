import { object, number, TypeOf } from "zod";

export const editAccountSchema = {
  body: object({
    account_number: number({
      required_error: "User's account number is required",
    }),
    balance: number({
      required_error: "Account balance is required",
    }),
  }),
};

export type EditAccountInput = TypeOf<typeof editAccountSchema.body>;
