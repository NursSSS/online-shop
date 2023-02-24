import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ProductEntity } from 'src/product/entity/product.entity.dto';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FavoriteService } from './favorite.service';

@ApiTags('Favorite')
@Controller('favorite')
export class FavoriteController {
    constructor(
        private FavoriteService: FavoriteService
    ){}

    @Get()
    async findAll(){
        return await this.FavoriteService.findAll()
    }

    @ApiOkResponse({ description: 'Favorite successfully added' })
    @ApiNotFoundResponse({ description: 'Product is not found || User is not found' })
    @ApiBadRequestResponse({ description: 'Product already in favorite || Validation error' })
    @ApiUnauthorizedResponse({ description: 'User is not registered' })
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() dto: CreateFavoriteDto){
        return await this.FavoriteService.create(dto)
    }

    @ApiOkResponse({ type: ProductEntity })
    @ApiNotFoundResponse({ description: 'User is not found || Basket is clear' })
    @ApiUnauthorizedResponse({ description: 'User is not registered' })
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findByUser(@Param('id') id: number){
        return await this.FavoriteService.findByUser(id)
    }
    
    @ApiOkResponse({ description: 'Favorite successfully deleted' })
    @ApiNotFoundResponse({ description: 'Favorite is not found' })
    @ApiUnauthorizedResponse({ description: 'User is not registered' })
    @ApiBadRequestResponse({ description: 'Validation error' })
    @UseGuards(JwtAuthGuard)
    @Delete()
    async delete(@Body() dto: CreateFavoriteDto){
        return await this.FavoriteService.delete(dto)
    }
}
