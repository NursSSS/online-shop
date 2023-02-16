import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FavoriteService } from './favorite.service';

@Controller('favorite')
export class FavoriteController {
    constructor(
        private FavoriteService: FavoriteService
    ){}

    @Get()
    async findAll(){
        return await this.FavoriteService.findAll()
    }

    @Post()
    async create(@Body() dto: CreateFavoriteDto){
        return await this.FavoriteService.create(dto)
    }

    @Get(':id')
    async findByUser(@Param('id') id: number){
        return await this.FavoriteService.findByUser(id)
    }
    
    @Delete()
    async delete(@Body() dto: CreateFavoriteDto){
        return await this.FavoriteService.delete(dto)
    }
}
