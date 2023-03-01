import { Controller, Get, Body, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ProductEntity } from 'src/product/entity/product.entity.dto';
import { CreateRatingDto } from './dto/create-rating.dto';
import { RatingService } from './rating.service';

@ApiTags('Rating')
@Controller('rating')
export class RatingController {
    constructor(
        private RatingService: RatingService
    ){}

    @Get()
    async findAll(){
        return await this.RatingService.findAll()
    }
    
    @ApiOkResponse({ type: ProductEntity })
    @ApiNotFoundResponse({ description: 'Not found' })
    @ApiBadRequestResponse({ description: 'User already gave vote || Validation error' })
    @ApiUnauthorizedResponse({ description: 'User is not registered' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post()
    async createRating(@Body() dto: CreateRatingDto){
        return await this.RatingService.create(dto)
    }
}
