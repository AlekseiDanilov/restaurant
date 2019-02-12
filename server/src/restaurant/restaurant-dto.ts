import {IsDate, IsString} from "class-validator";
import {Type} from "class-transformer";

export class RestaurantDto {
  id?: string;
  @IsString()
  name: string;

  @Type(() => Date)
  @IsDate()
  monFrom: Date;

  @Type(() => Date)
  @IsDate()
  monUntil: Date;

  @Type(() => Date)
  @IsDate()
  tueFrom: Date;

  @Type(() => Date)
  @IsDate()
  tueUntil: Date;

  @Type(() => Date)
  @IsDate()
  wedFrom: Date;

  @Type(() => Date)
  @IsDate()
  wedUntil: Date;

  @Type(() => Date)
  @IsDate()
  thuFrom: Date;

  @Type(() => Date)
  @IsDate()
  thuUntil: Date;

  @Type(() => Date)
  @IsDate()
  friFrom: Date;

  @Type(() => Date)
  @IsDate()
  friUntil: Date;

  @Type(() => Date)
  @IsDate()
  satFrom: Date;

  @Type(() => Date)
  @IsDate()
  satUntil: Date;

  @Type(() => Date)
  @IsDate()
  sunFrom: Date;

  @Type(() => Date)
  @IsDate()
  sunUntil: Date;
}