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

/*
* @route GET /api/account
* @desc Get all accounts
* @access Public

*/
accountRouter.get("/", getAccountsHandler);

/**
 * @route GET /api/account/:id
 * @desc Get account by id
 * @access Public
 */
accountRouter.get("/:id", getAccountByIdHandler);

/**
 * @route PUT /api/accounts
 * @desc Update account balance via account number
 * @access Public
 */
accountRouter.patch(
  "/",
  processRequestBody(editAccountSchema.body),
  editAccountHandler
);

//Create Account

/**
 * @route POST /api/accounts
 * @desc Create account
 * @access Public
 */
accountRouter.post(
  "/",
  processRequestBody(createAccountSchema.body),
  createAccountHandler
);

/**
 * @route DELETE /api/accounts/:id
 * @desc Delete account by id
 * @access Public
 */
accountRouter.delete("/:id", deleteAccountHandler);

export default accountRouter;
