import { Router } from 'express';
import { RoomsController } from '../controllers/rooms.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

class RoomsRoutes {
  public router: Router;
  private roomsController = new RoomsController();
  constructor() {
    this.router = Router();
    this.getRoutes();
  }
  getRoutes() {
    this.router.get(
      '/',
      authMiddleware,
      this.roomsController.index.bind(this.roomsController),
    );
    this.router.post(
      '/',
      authMiddleware,
      this.roomsController.store.bind(this.roomsController),
    );
    this.router.get(
      '/:email',
      authMiddleware,
      this.roomsController.show.bind(this.roomsController),
    );
  }
}

export { RoomsRoutes };
