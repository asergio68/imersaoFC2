import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class PositionDto {
  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @IsNumber()
  @IsNotEmpty()
  lng: number;
}
export class CreateRouteDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => PositionDto)
  startPosition: PositionDto;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => PositionDto)
  endPosition: PositionDto;
}
