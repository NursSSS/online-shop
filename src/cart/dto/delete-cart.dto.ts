import { ApiProperty } from "@nestjs/swagger"
import { IsNumber } from "class-validator"

export class DeleteCartDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    user_id: number

    @ApiProperty({ example: 1 })
    @IsNumber()
    product_id: number
}