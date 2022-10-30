import { Router } from "express";
import { processRequestBody } from "zod-express-middleware";
import {
  getAccountsHandler,
  getAccountByIdHandler,
  editAccountHandler,
  createAccountHandler,
  deleteAccountHandler,
} from "../controllers/account.controller";
import { createAccountSchema } from "../schemas/createAccount.schema";
import { editAccountSchema } from "../schemas/editAccount.schema";

const accountRouter = Router();

//GET ALL ACCOUNTS
accountRouter.get("/", getAccountsHandler);

//GET Single Account by ID
accountRouter.get("/:id", getAccountByIdHandler);

//Update Account
accountRouter.patch(
  "/",
  processRequestBody(editAccountSchema.body),
  editAccountHandler
);

//Create Account
accountRouter.post(
  "/",
  processRequestBody(createAccountSchema.body),
  createAccountHandler
);

//Delete Account
accountRouter.delete("/:id", deleteAccountHandler);

export default accountRouter;
