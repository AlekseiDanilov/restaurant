import {BadRequestException, Body, Controller, Get, NotFoundException, Post, Put, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {RestaurantService} from "../../dist/restaurant/restaurant.service";
import {RestaurantDto} from "./restaurant-dto";
import {CryptoHelper} from "../helper/cryptoHelper";
import {Restaurant} from "./restaurant";

@Controller('api/restaurant')
@UseGuards(new (AuthGuard('jwt')))
export class RestaurantController {

  constructor(private readonly restaurantService: RestaurantService) {
  }

  @Post()
  async create(@Body() dto: RestaurantDto): Promise<Restaurant> {
    return this.restaurantService.create({
      id: CryptoHelper.randomUuid(),
      ...dto
    });
  }

  @Put()
  async update(@Body() dto: RestaurantDto): Promise<Restaurant> {
    if (dto.id) {
      return this.restaurantService.update({
        id: dto.id,
        ...dto
      });
    }
    throw new BadRequestException();
  }

  @Get()
  async find(): Promise<Restaurant> {
    const restaurant = await this.restaurantService.findBy({});
    if (restaurant) {
      return restaurant;
    }
    throw new NotFoundException();
  }
}
