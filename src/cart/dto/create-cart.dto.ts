import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber } from 'class-validator';
import { ProductEntity } from 'src/product/entity/product.entity.dto';
import { ProductColor } from 'src/product/enum';
import { UserEntity } from 'src/user/entity/user.entity';

export class CreateCartDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  product_id: number;

  @ApiProperty({ example: 3 })
  @IsNumber()
  quantity: number;
  
  @ApiProperty({ example: ['black'] })
  @IsArray()
  @IsEnum(ProductColor, { each: true })
  color: ProductColor[];

  product?: ProductEntity
  user?: UserEntity
}
