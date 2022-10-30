import * as accountDAL from "../../db/dal/account.dal";
import { AccountInput, AccountOutput } from "../../db/models/account.model";

export const createAccount = (
  payload: AccountInput
): Promise<AccountOutput> => {
  return accountDAL.create(payload);
};
export const updateAccount = (
  id: number,
  payload: Partial<AccountInput>
): Promise<AccountOutput> => {
  return accountDAL.update(id, payload);
};
export const getAccountById = (id: number): Promise<AccountOutput> => {
  return accountDAL.getById(id);
};

export const getAllAccounts = (): Promise<AccountOutput[]> => {
  return accountDAL.getAll();
};

export const deleteAccount = (id: number) => {
  accountDAL.deleteAccount(id);
};
