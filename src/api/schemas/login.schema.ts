import { object, string, TypeOf } from "zod";

export const loginSchema = {
  body: object({
    name: string({
      required_error: "User name is required",
    }),
    password: string({
      required_error: "password is required",
    })
      .min(8, "password must be at least 8 characters")
      .max(64, "password must not be longer than 64 charcters"),
  }),
};

export type LoginBody = TypeOf<typeof loginSchema.body>;
