import { ApiProperty } from "@nestjs/swagger"
import { IsNumber } from "class-validator"

export class UpdateCartDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    user_id: number

    @ApiProperty({ example: 2 })
    @IsNumber()
    product_id: number

    @ApiProperty({ example: 4 })
    @IsNumber()
    quantity: number
}