import * as userDAL from "../../db/dal/user.dal";
import { UserInput, UserOutput } from "../../db/models/user.model";

export const findUserByName = (name: string): Promise<UserOutput> => {
  return userDAL.findUserByName(name);
};

export const createUser = (user: UserInput): Promise<UserOutput> => {
  return userDAL.createUser(user);
};
