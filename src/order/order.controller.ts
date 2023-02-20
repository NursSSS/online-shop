import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateOrderDto } from './dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private OrderService: OrderService) {}

  // @Get()
  // async findAll(){
  //     return await this.OrderService.findAll()
  // }

  // @Post()
  // async create(@Body() dto: CreateOrderDto){
  //     return await this.OrderService.create(dto)
  // }
}
