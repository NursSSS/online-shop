import { Controller, Get, Post } from '@nestjs/common';
import { Body, Delete, Param, UseGuards } from '@nestjs/common/decorators';
import { Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ProductEntity } from 'src/product/entity/product.entity.dto';
import { CartService } from './cart.service';
import { CreateCartDto, DeleteCartDto, UpdateCartDto } from './dto';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private CartService: CartService) {}

  @Get()
  async findAll(){
      return await this.CartService.findAll()
  }
  

  @ApiOkResponse({ description: 'Product successfully added to basket' })
  @ApiBadRequestResponse({ description: 'Validation error || Product already in basket' })
  @ApiNotFoundResponse({ description: 'Product is not found || User is not found' })
  @ApiUnauthorizedResponse({ description: 'User is not registered' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateCartDto): Promise<{ message: string; }> {
    return await this.CartService.create(dto)
  }

  @ApiOkResponse({ type: ProductEntity })
  @ApiNotFoundResponse({ description: 'User is not found || Basket is clear' })
  @ApiUnauthorizedResponse({ description: 'User is not registered' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findByUser(@Param('id') id: number) {
    return await this.CartService.findByUser(id)
  }

  @ApiOkResponse({ description: 'Product successfully updated' })
  @ApiNotFoundResponse({ description: 'Product in basket is not found' })
  @ApiUnauthorizedResponse({ description: 'User is not registered' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() dto: UpdateCartDto){
    return await this.CartService.update(dto)
  }
  
  @ApiOkResponse({ description: 'Product successfully deleted' })
  @ApiNotFoundResponse({ description: 'Product in basket is not found' })
  @ApiUnauthorizedResponse({ description: 'User is not registered' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Body() dto: DeleteCartDto){
      return await this.CartService.delete(dto)
  }
}
