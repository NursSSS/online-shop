import { Controller, Get, Post } from '@nestjs/common';
import { Body, Delete, Param, Put } from '@nestjs/common/decorators';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { DeleteCartDto } from './dto/delete-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private CartService: CartService) {}

  // @Get()
  // async findAll(){
  //     return await this.CartService.findAll()
  // }

  @Post()
  async create(@Body() dto: CreateCartDto) {
    return await this.CartService.create(dto);
  }

  @Get(':id')
  async findByUser(@Param('id') id: number) {
    return await this.CartService.findByUser(id);
  }

  // @Put()
  // async update(@Body() dto: CreateCartDto){
  //     return await this.CartService.update(dto)
  // }

  // @Delete()
  // async delete(@Body() dto: DeleteCartDto){
  //     return await this.CartService.delete(dto)
  // }
}
