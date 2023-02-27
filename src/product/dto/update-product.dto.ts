import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsEnum, IsNumber, IsString, Length } from "class-validator"
import { ProductCategory, ProductCollection, ProductColor } from "../enum"

export class UpdateProductDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    id: number

    @ApiProperty({ 
        example: 'Choper Shoulder Frill Vent Dress' 
    })
    @IsString()
    title: string

    @ApiProperty({ example: 7500 })
    @IsNumber()
    price: number

    @ApiProperty({ example: 5990 })
    @IsNumber()
    discount: number

    @ApiProperty({ example: 'Описание товара' })
    @IsString()
    @Length(255)
    description: string

    @ApiProperty({ description: 'Кол-во товаров в линейке' })
    @IsNumber()
    quantity: number

    @ApiProperty({ example: 'Артикул' })
    @IsString()
    code: string

    @ApiProperty({ example: '29-49' })
    @IsString()
    size: string

    @ApiProperty({ example: ['red', 'black', 'white'] })
    @IsArray()
    @IsEnum(ProductColor, { each: true })
    color: ProductColor[]

    @ApiProperty({ example: 'Зимний' })
    collection: ProductCollection

    @ApiProperty({ example: 'Платья' })
    category: ProductCategory
}