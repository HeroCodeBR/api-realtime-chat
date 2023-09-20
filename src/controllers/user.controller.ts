import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../interfaces/HttpException';
import { Users } from '../useCases/user.useCase';

class UserController {
  private usersUserCase: Users;
  constructor() {
    this.usersUserCase = new Users();
  }
  async store(request: Request, response: Response, next: NextFunction) {
    const { name, email, password } = request.body;
    try {
      const result = await this.usersUserCase.create({ name, email, password });
      return response.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
  async upload(request: Request, response: Response, next: NextFunction) {
    const file = request.file;
    const { user_id } = request;

    try {
      if (!file?.filename) {
        throw new HttpException(400, 'Filename doenst exists');
      }
      const result = await this.usersUserCase.upload(file.filename, user_id);
      return response.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
  async auth(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body;
    console.log(
      '🚀 ~ file: user.controller.ts:35 ~ UserController ~ auth ~ email:',
      email,
      password,
    );
    try {
      const result = await this.usersUserCase.auth({ email, password });
      console.log(
        '🚀 ~ file: user.controller.ts:37 ~ UserController ~ auth ~ result:',
        result,
      );

      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  async getAllUsers(request: Request, response: Response, next: NextFunction) {
    const { pageSize, pageNumber } = request.query;
    const DEFAULT_PAGE_SIZE = 2;
    const DEFAULT_PAGE_NUMBER = 1;

    const number = pageNumber ? Number(pageNumber) : DEFAULT_PAGE_NUMBER;
    console.log(
      '🚀 ~ file: user.controller.ts:34 ~ UserController ~ getAllUsers ~ number:',
      number,
    );
    const size = pageSize ? Number(pageSize) : DEFAULT_PAGE_SIZE;
    console.log(
      '🚀 ~ file: user.controller.ts:36 ~ UserController ~ getAllUsers ~ size:',
      size,
    );

    try {
      const result = await this.usersUserCase.findAllUsers({
        pageSize: size,
        pageNumber: number,
      });

      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  async getFilterUserByEmail(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { email } = request.params;
    console.log(
      '🚀 ~ file: user.controller.ts:76 ~ UserController ~ email:',
      email,
    );

    try {
      const result = await this.usersUserCase.findUserByEmailRegex({
        email,
      });

      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export { UserController };
