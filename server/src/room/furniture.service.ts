import { Injectable } from '@nestjs/common';
import {Furniture} from "./furniture";
import {BaseService} from "../base/base.service";

@Injectable()
export class FurnitureService extends BaseService<Furniture> {

  tableName(): string {
    return "furniture";
  }
}