import { Account as accountModel } from "../config";
import { AccountInput, AccountOutput } from "../models/account.model";

export const create = async (payload: AccountInput): Promise<AccountOutput> => {
  const account = await accountModel.create(payload);
  return account;
};

export const update = async (
  id: number,
  payload: Partial<AccountInput>
): Promise<AccountOutput> => {
  const account = await accountModel.findByPk(id);
  if (!account) {
    // @todo throw custom error
    throw new Error("not found");
  }
  const updatedAccount = await account.update(payload);
  return updatedAccount;
};

export const getById = async (id: number): Promise<AccountOutput> => {
  const account = await accountModel.findByPk(id);
  if (!account) {
    // @todo throw custom error
    throw new Error("not found");
  }
  return account;
};

export const getAll = async (): Promise<AccountOutput[]> => {
  return accountModel.findAll();
};

export const deleteAccount = async (id: number) => {
  const account = await accountModel.findByPk(id);
  if (!account) {
    // @todo throw custom error
    throw new Error("not found");
  }
  await account.destroy();
};
