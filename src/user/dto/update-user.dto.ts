import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length, Max } from 'class-validator';
import { Status } from '../enum/status.enum';

export class UpdateUserDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Beks' })
  @Length(3, 14)
  firstName: string;

  @ApiProperty({ example: 'Beksov' })
  @Length(3, 14)
  lastName: string;

  @ApiProperty({ example: 'Кыргызстан' })
  @IsString()
  @Max(15)
  country: string

  @ApiProperty({ example: 'Бишкек' })
  @IsString()
  @Max(15)
  city: string

  @ApiProperty({ example: 'Исанова 79' })
  @IsString()
  address: string

  @ApiProperty({ example: 'В ожидании' })
  status: Status

  @IsOptional()
  code: number;
}
