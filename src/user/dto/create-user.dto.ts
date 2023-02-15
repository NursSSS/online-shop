import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  @Length(3, 14)
  lastName: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsOptional()
  code: number;
}
