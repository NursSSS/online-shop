import { IsNotEmpty, IsNumber, IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @Length(3, 14)
  firstName: string;

  @IsNotEmpty()
  @Length(3, 14)
  lastName: string;

  @IsOptional()
  code: number;
}
