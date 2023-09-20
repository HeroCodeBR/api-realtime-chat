import { NextFunction, Request, Response } from 'express';
import { Rooms } from '../useCases/rooms.useCase';

class RoomsController {
  private roomsUseCase: Rooms;
  constructor() {
    this.roomsUseCase = new Rooms();
  }
  async store(request: Request, response: Response, next: NextFunction) {
    const { email } = request.body;
    const { user_id } = request;
    try {
      const result = await this.roomsUseCase.create(email, user_id);

      return response.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
  async show(request: Request, response: Response, next: NextFunction) {
    const { email } = request.params;
    const { user_id } = request;
    try {
      const result = await this.roomsUseCase.find(email, user_id);
      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  async index(request: Request, response: Response, next: NextFunction) {
    const { pageSize, pageNumber } = request.query;
    const { user_id } = request;
    const DEFAULT_PAGE_SIZE = 10;
    const DEFAULT_PAGE_NUMBER = 1;
    const number = pageNumber ? Number(pageNumber) : DEFAULT_PAGE_NUMBER;
    const size = pageSize ? Number(pageSize) : DEFAULT_PAGE_SIZE;
    try {
      const result = await this.roomsUseCase.getRooms(user_id, number, size);
      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export { RoomsController };
