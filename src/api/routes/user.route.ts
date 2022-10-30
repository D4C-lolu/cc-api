import express from "express";
import { processRequestBody } from "zod-express-middleware";
import { loginHandler, signUpHandler } from "../controllers/user.controller";
import requireUser from "../middleware/requireUser";
import { loginSchema } from "../schemas/login.schema";
import { registerUserSchema } from "../schemas/registerUser.schema";

const userRouter = express.Router();

userRouter.get("/", requireUser, (req, res) => {
  return res.send(res.locals.user);
});

userRouter.post("/", processRequestBody(loginSchema.body), loginHandler);

userRouter.post(
  "/new",
  [requireUser, processRequestBody(registerUserSchema.body)],
  signUpHandler
);

export default userRouter;
