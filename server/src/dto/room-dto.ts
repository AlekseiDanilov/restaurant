import {Furniture} from "../room/furniture";

export class RoomDto {
  id: string;
  name?: string;
  width?: number;
  length?: number;
  numberOfTables?: number;
  numberOfSeats?: number;
  furniture?: Array<Furniture>
}