import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPhoneNumber, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Beks' })
  @Length(3, 14)
  firstName: string;

  @ApiProperty({ example: 'Beksvo' })
  @Length(3, 14)
  lastName: string;

  @ApiProperty({ example: '996700123456' })
  @IsPhoneNumber('KG')
  phoneNumber: string;

  @IsOptional()
  code: number;
}
