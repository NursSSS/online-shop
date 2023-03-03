import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length, Max } from 'class-validator';
import { Status } from '../enum/status.enum';

export class UpdateUserDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Beks' })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({ example: 'Beksov' })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({ example: 'Кыргызстан' })
  @IsOptional()
  @IsString()
  country: string

  @ApiProperty({ example: 'Бишкек' })
  @IsOptional()
  @IsString()
  city: string

  @ApiProperty({ example: 'Исанова 79' })
  @IsOptional()
  @IsString()
  address: string

  @ApiProperty({ example: 'В ожидании' })
  @IsOptional()
  status: Status

  @IsOptional()
  code: number;
}
