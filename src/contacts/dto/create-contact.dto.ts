import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length } from "class-validator"

export class CreateContactDto {
    @ApiProperty({ example: 'instagram' })
    @IsString()
    @Length(3, 20)
    social: string

    @ApiProperty({ example: '@missdess' })
    @IsString()
    @IsNotEmpty()
    source: string
}