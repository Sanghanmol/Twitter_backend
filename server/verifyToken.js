import jwt from "jsonwebtoken";
import { handleError } from "./error.js";

export const verifyToken = (req, resp, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(handleError(401, "You are not authenticated"));

  jwt.verify(token, process.env.JWT, (error, user) => {
    if (error) return next(createError(403, "Token is invalid"));
    req.user = user;
    next();
  });
};
