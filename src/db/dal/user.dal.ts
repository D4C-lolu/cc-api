import { User as userModel } from "../config";
import { UserInput, UserOutput } from "../models/user.model";

export const findUserByName = async (name: string): Promise<UserOutput> => {
  const user = await userModel.findOne({
    where: {
      name,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const createUser = async (user: UserInput): Promise<UserOutput> => {
  const createdUser = await userModel.create(user);
  return createdUser;
};
