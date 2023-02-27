import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator"

export class UpdateContactDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    id: number

    @ApiProperty({ example: 'instagram' })
    @IsString()
    @Length(1, 20)
    social: string

    @ApiProperty({ example: '@missdess' })
    @IsString()
    @IsNotEmpty()
    source: string
}