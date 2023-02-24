import { ApiProperty } from "@nestjs/swagger"
import { IsNumber } from "class-validator"
import { ProductEntity } from "src/product/entity/product.entity.dto"
import { UserEntity } from "src/user/entity/user.entity"

export class CreateFavoriteDto {
    @ApiProperty({ example: 8 })
    @IsNumber()
    user_id: number

    @ApiProperty({ example: 5 })
    @IsNumber()
    product_id: number
    created_date?: Date
    end_date?: Date
    user?: UserEntity
    product?: ProductEntity
}