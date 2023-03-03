import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, Length } from "class-validator"
import { ProductCategory, ProductCollection, ProductColor } from "../enum"

export class UpdateProductDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    id: number

    @ApiProperty({ 
        example: 'Choper Shoulder Frill Vent Dress' 
    })
    @IsOptional()
    @IsString()
    title: string

    @ApiProperty({ example: 7500 })
    @IsOptional()
    @IsNumber()
    price: number

    @ApiProperty({ example: 5990 })
    @IsOptional()
    @IsNumber()
    discount: number

    @ApiProperty({ example: 'Описание товара' })
    @IsOptional()
    @IsString()
    description: string

    @ApiProperty({ description: 'Кол-во товаров в линейке' })
    @IsOptional()
    @IsNumber()
    quantity: number

    @ApiProperty({ example: 'Артикул' })
    @IsOptional()
    @IsString()
    code: string

    @ApiProperty({ example: '29-49' })
    @IsOptional()
    @IsString()
    size: string

    @ApiProperty({ example: ['red', 'black', 'white'] })
    @IsOptional()
    @IsArray()
    @IsEnum(ProductColor, { each: true })
    color: ProductColor[]

    @ApiProperty({ example: 'Зимний' })
    @IsOptional()
    @IsEnum(ProductCollection)
    collection: ProductCollection

    @ApiProperty({ example: 'Платья' })
    @IsOptional()
    @IsEnum(ProductCategory)
    category: ProductCategory
}