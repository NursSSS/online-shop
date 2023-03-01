import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, Max, Min } from "class-validator"

export class CreateRatingDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    user_id: number

    @ApiProperty({ example: 1 })
    @IsNumber()
    product_id: number

    @ApiProperty({ example: 'От 1 до 5'})
    @Min(1)
    @Max(5)
    rating: number
}