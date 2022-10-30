import { object, string, number, TypeOf } from "zod";

export const createAccountSchema = {
  body: object({
    user_name: string({
      required_error: "User's name is required",
    }),
    balance: number({
      required_error: "Account balance is required",
    }),
  }),
};

export type CreateAccountInput = TypeOf<typeof createAccountSchema.body>;
