import { NextFunction, Request, Response } from 'express';

import { Message } from '../useCases/message.useCase';

class MessageController {
  private messageUseCase: Message;
  constructor() {
    this.messageUseCase = new Message();
  }
  async store(request: Request, response: Response, next: NextFunction) {
    const { message } = request.body;
    const { user_id } = request;
    try {
      const email_from_user = message.email;
      const message_from_user = message.bodyMessage;

      const result = await this.messageUseCase.create(
        user_id,
        email_from_user,
        message_from_user,
      );
      return response.status(200).json({ ok: true });
    } catch (error) {
      next(error);
    }
  }
}

export { MessageController };
