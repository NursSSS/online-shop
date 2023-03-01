import { ApiProperty } from "@nestjs/swagger"
import { IsNumber } from "class-validator"
import { ProductEntity } from "src/product/entity/product.entity.dto"
import { UserEntity } from "src/user/entity/user.entity"

export class CreateOrderDto {
    @ApiProperty({ example: 2 })
    @IsNumber()
    user_id: number

    @ApiProperty({ example: 17970 })
    @IsNumber()
    totalSum: number
    products?: ProductEntity[]
    user?: UserEntity
    orderNumber?: string
}