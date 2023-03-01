import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, Length } from "class-validator"

export class ValidateDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    user_id: number

    @ApiProperty({ example: 123456 })
    @IsNumber()
    @Length(6,6)
    code: number
}