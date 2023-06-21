import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { RoomsController } from '../controllers/rooms.controller';

class RoomsRoutes {
  public router: Router;
  private roomsController = new RoomsController();
  constructor() {
    this.router = Router();
    this.getRoutes();
  }
  getRoutes() {
    this.router.post(
      '/',
      authMiddleware,
      this.roomsController.store.bind(this.roomsController),
    );
  }
}

export { RoomsRoutes };
