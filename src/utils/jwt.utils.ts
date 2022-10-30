import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants";

export function signJwt(payload: string | Buffer | object) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "90d",
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    return decoded;
  } catch (e) {
    return null;
  }
}
