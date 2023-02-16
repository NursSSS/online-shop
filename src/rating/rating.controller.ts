import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
    constructor(
        private RatingService: RatingService
    ){}

    @Get()
    async findAll(){
        return await this.RatingService.findAll()
    }
    
    @Post()
    async createRating(@Body() dto: CreateRatingDto){
        return await this.RatingService.create(dto)
    }
}
