import { Controller, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { Delete, Get, Post, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body, Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/guard/role-guard';
import { Roles } from 'src/user/enum/role-decorator';
import { UserRole } from 'src/user/enum/role.enum';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ProductEntity } from './entity/product.entity.dto';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(
        private ProductService: ProductService
    ){}

    @ApiOkResponse({ type: [ProductEntity] })
    @Get()
    async findAll(){
        return await this.ProductService.findAll()
    }

    @ApiOkResponse({ type: ProductEntity })
    @ApiNotFoundResponse({ description: 'Product is not found' })
    @Get('/byid/:id')
    async findById(@Param('id') id: number){
        return await this.ProductService.findById(id)
    }

    @ApiOkResponse({ type: ProductEntity })
    @ApiNotFoundResponse({ description: 'Product is not found' })
    @Get('/byart/:code')
    async findByCode(@Param('code') code: string){
        return await this.ProductService.findByCode(code)
    }

    @ApiOkResponse({ type: ProductEntity })
    @ApiForbiddenResponse({ description: 'No access' })
    @ApiBadRequestResponse({ description: 'Validation error || Product with this atricul already exist' })
    @ApiUnauthorizedResponse({ description: 'User is not registered' })
    @UseGuards(RoleGuard)
    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    async create(@Body('dto') dto, @UploadedFiles() files: Array<Express.Multer.File>){
        dto = JSON.parse(dto)
        return await this.ProductService.create(dto, files)
    }

    @ApiOkResponse({ type: [ProductEntity] })
    @Get('/bycollection/:collection')
    async byCollection(@Param('collection') collection: string){
        return await this.ProductService.byCollection(collection)
    }

    @ApiOkResponse({ type: [ProductEntity] })
    @Get('/bycategory/:category')
    async byCategory(@Param() category: string){
        return await this.ProductService.byCategory(category)
    }

    @ApiOkResponse({ type: ProductEntity })
    @ApiNotFoundResponse({ description: 'Product is not found' })
    @ApiForbiddenResponse({ description: 'No access' })
    @ApiBadRequestResponse({ description: 'Validation error || Product with this atricul already exist' })
    @Put()
    @UseInterceptors(FilesInterceptor('files'))
    async update(@Body() dto: UpdateProductDto, @UploadedFiles() files: Array<Express.Multer.File>){
        return await this.ProductService.update(dto, files)
    }
    
    @ApiOkResponse({ description: 'User successfully deleted' })
    @ApiNotFoundResponse({ description: 'Product is not found' })
    @Delete(':id')
    async delete(@Param('id') id: number){
        return await this.ProductService.delete(id)
    }
}
