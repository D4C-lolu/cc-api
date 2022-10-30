import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { LoginBody } from "../schemas/login.schema";
import { createUser, findUserByName } from "../services/user.service";
import { omit } from "lodash";
import { signJwt } from "../../utils/jwt.utils";
import { RegisterUserBody } from "../schemas/registerUser.schema";

export async function loginHandler(
  req: Request<{}, {}, LoginBody>,
  res: Response
) {
  //  Grab fields from request body
  const { name, password } = req.body;

  //  Find user in database
  const user = await findUserByName(name);

  //Check if user exists and if password is correct
  if (!user || !user.comparePassword(password)) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("Invalid email or password");
  }

  //remove password from user object
  const payload = omit(user, "password");

  //  Create JWT
  const jwt = signJwt(payload);

  //  Send JWT back to user
  res.cookie("accessToken", jwt, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,
  });

  return res.status(StatusCodes.OK).send(jwt);
}

export async function signUpHandler(
  req: Request<{}, {}, RegisterUserBody>,
  res: Response
) {
  const { name, password } = req.body;

  try {
    await createUser({ name, password });

    return res.status(StatusCodes.CREATED).send("user created successfully");
  } catch (e: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
