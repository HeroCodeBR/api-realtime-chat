import { NextFunction, Request, Response } from 'express';
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
}

export { UserController };
