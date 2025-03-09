import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRequestDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}