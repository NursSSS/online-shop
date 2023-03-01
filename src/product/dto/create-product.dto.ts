import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsEnum, IsNumber, IsString, Length } from "class-validator"
import { ProductCategory, ProductCollection, ProductColor } from "../enum"

export class CreateProductDto {
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
    @Length(1, 255)
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

    @ApiProperty({ example: 'Полиэстер' })
    @IsString()
    tkan: string

    @ApiProperty({ example: 'А-Силуэт' })
    @IsString()
    fason: string

    @ApiProperty({ example: 120 })
    @IsNumber()
    length: number
    
    @ApiProperty({ example: ['red', 'black', 'white'] })
    @IsArray()
    @IsEnum(ProductColor, { each: true })
    color: ProductColor[]
    
    @ApiProperty({ example: 'Зимний' })
    collection: ProductCollection
    
    @ApiProperty({ example: 'Платья' })
    category: ProductCategory
}