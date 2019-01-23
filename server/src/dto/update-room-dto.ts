import {Furniture} from "../room/furniture";

export class UpdateRoomDto {
  id: string;
  name?: string;
  width?: number;
  length?: number;
  furniture: Array<Furniture>
}