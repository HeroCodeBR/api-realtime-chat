import { Router } from 'express';

import { MessageController } from '../controllers/message.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

class MessageRoutes {
  public router: Router;
  private messageController = new MessageController();
  constructor() {
    this.router = Router();
    this.getRoutes();
  }
  getRoutes() {
    this.router.post(
      '/',
      authMiddleware,
      this.messageController.store.bind(this.messageController),
    );
    this.router.put(
      '/',
      authMiddleware,
      this.messageController.updateView.bind(this.messageController),
    );
  }
}

export { MessageRoutes };
