export interface ICreate {
  user_id_joined_room: string;
  user_id_created_room: string;
}
export interface IRoom {
  user_id_joined_room: string[];
  user_id_created_room: string[];
  _id: string;
}
