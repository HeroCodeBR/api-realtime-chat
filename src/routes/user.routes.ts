import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

class UserRoutes {
  public router: Router;
  private userController = new UserController();
  constructor() {
    this.router = Router();
    this.getRoutes();
  }
  getRoutes() {
    this.router.post('/', this.userController.store.bind(this.userController));
    this.router.post(
      '/auth',
      this.userController.auth.bind(this.userController),
    );
    this.router.get(
      '/',
      authMiddleware,
      this.userController.getAllUsers.bind(this.userController),
    );
  }
}

export { UserRoutes };
