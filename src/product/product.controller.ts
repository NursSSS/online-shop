import { Controller, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Delete, Get, Post, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body, Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
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
    @UseInterceptors(FilesInterceptor('files'))
    async create(@Body() dto: CreateProductDto, @UploadedFiles() files: Array<Express.Multer.File>){
        return await this.ProductService.create(dto, files)
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
    
    @Put('/images/:id')
    @UseInterceptors(FilesInterceptor('files'))
    async updateImages(@Param('id') id: number, @UploadedFiles() files: Array<Express.Multer.File>){
        return await this.ProductService.updateImages(id, files)
    }
    
    @Delete(':id')
    async delete(@Param('id') id: number){
        return await this.ProductService.delete(id)
    }

}
