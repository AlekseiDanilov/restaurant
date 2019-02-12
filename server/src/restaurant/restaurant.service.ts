import {Injectable} from '@nestjs/common';
import {BaseService} from "../base/base.service";
import {Restaurant} from "./restaurant";

@Injectable()
export class RestaurantService extends BaseService<Restaurant> {
  tableName(): string {
    return "restaurant";
  }
}