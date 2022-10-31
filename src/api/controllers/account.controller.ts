import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateAccountInput } from "../schemas/createAccount.schema";
import { EditAccountInput } from "../schemas/editAccount.schema";
import {
  getAllAccounts,
  getAccountById,
  updateAccount,
  createAccount,
  deleteAccount,
} from "../services/account.service";

//GET ALL ACCOUNTS
export async function getAccountsHandler(req: Request, res: Response) {
  const accounts = await getAllAccounts();
  return res.status(StatusCodes.OK).json(accounts);
}

//GET ACCOUNT BY ID
export async function getAccountByIdHandler(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const account = await getAccountById(parseInt(id));
    return res.status(StatusCodes.OK).json(account);
  } catch (e: any) {
    return res.status(StatusCodes.NOT_FOUND).send(e.message);
  }
}

//EDIT ACCOUNT
export async function editAccountHandler(
  req: Request<{}, {}, EditAccountInput>,
  res: Response
) {
  const { account_number, balance } = req.body;

  try {
    const updatedAccount = await updateAccount(account_number, { balance });
    return res.status(StatusCodes.OK).json(updatedAccount);
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).json(e);
  }
}

//CREATE ACCOUNT
export async function createAccountHandler(
  req: Request<{}, {}, CreateAccountInput>,
  res: Response
) {
  const { user_name, balance } = req.body;
  try {
    const newAccount = await createAccount({ user_name, balance });
    console.log("Done");
    return res.status(StatusCodes.CREATED).json(newAccount);
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).json(e);
  }
}

//DELETE ACCOUNT
export async function deleteAccountHandler(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await deleteAccount(parseInt(id));
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e: any) {
    return res.status(StatusCodes.NOT_FOUND).send(e.message);
  }
}
