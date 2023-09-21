export interface IMessage {
  to_user_id: string;
  from_user_id: string;
  bodyMessage: string;
  room_id: string;
  createdAt?: Date;
}

export interface IMessageHistoric {
  email: string;
  user_id: string;
  pageNumber: number;
  pageSize: number;
}
