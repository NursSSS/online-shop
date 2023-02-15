import { Controller, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Delete, Get, Post, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body, Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(
        private ProductService: ProductService
    ){}

    @Get()
    async findAll(){
        return await this.ProductService.findAll()
    }

    @Get('/byid/:id')
    async findById(@Param('id') id: number){
        return await this.ProductService.findById(id)
    }

    @Get('/byart/:code')
    async findByCode(@Param('code') code: string){
        return await this.ProductService.findByCode(code)
    }

    @Post()
    // @UseInterceptors(FileInterceptor('file'))
    // async create(@Body() dto: CreateProductDto, @UploadedFile() file: Express.Multer.File){
    async create(@Body() dto: CreateProductDto){
        // return await this.ProductService.create(dto, file)
        return await this.ProductService.create(dto)
    }

    @Get('/bycollection/:collection')
    async byCollection(@Param('collection') collection: string){
        return await this.ProductService.byCollection(collection)
    }

    @Get('/bycategory/:category')
    async byCategory(@Param() category: string){
        return await this.ProductService.byCategory(category)
    }

    @Put()
    async update(@Body() dto: UpdateProductDto){
        return await this.ProductService.update(dto)
    }

    @Delete(':id')
    async delete(@Param('id') id: number){
        return await this.ProductService.delete(id)
    }

    // @Post('/rating')
    // async rating(@Body() dto: UpdateRatingDto){
    //     return await this.ProductService.rating(dto)
    // }
}
