import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class newPositionDto {
  @IsString()
  @IsNotEmpty()
  routeId: string;

  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsNotEmpty()
  position: number[];

  @ValidateNested()
  @IsNotEmpty()
  finished: boolean;
}
