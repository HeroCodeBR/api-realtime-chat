import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../interfaces/HttpException';
import { verify } from 'jsonwebtoken';
interface IPayload {
  name: string;
  email: string;
  user_id: string;
}
export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers;
  if (!authorization) {
    throw new HttpException(401, 'Token Missing');
  }
  try {
    //auth[0] = Bearer
    //auth[1] = kjsfghhjdfdfg => token
    const [, token] = authorization.split(' ');
    let secretKey = process.env.TOKEN_SECRET;
    if (!process.env.TOKEN_SECRET) {
      throw new HttpException(498, 'TOKEN_SECRET not found');
    }

    const { name, user_id, email } = verify(
      token,
      process.env.TOKEN_SECRET,
    ) as IPayload;

    request.user_id = user_id;
    request.name = name;
    request.email = email;

    next();
  } catch (error) {
    throw new HttpException(401, 'Token expired');
  }
}
