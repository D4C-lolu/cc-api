import { object, string, TypeOf } from "zod";

export const registerUserSchema = {
  body: object({
    name: string({
      required_error: "ame is required",
    }),
    password: string({
      required_error: "password is required",
    })
      .min(8, "Password must be at least 8 characters long")
      .max(64, "Password should not be longer than 64 characters"),
    confirmPassword: string({
      required_error: "Confirm password is required",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
};

export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>;
