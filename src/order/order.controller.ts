import { Controller, Get, Post, Body, Param, UseGuards, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse, ApiFoundResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guard/role-guard';
import { Roles } from 'src/user/enum/role-decorator';
import { UserRole } from 'src/user/enum/role.enum';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { OrderEntity } from './entity/order.entity';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private OrderService: OrderService) {}

  @ApiOkResponse({ type: OrderEntity })
  @ApiUnauthorizedResponse({ description: 'User is not registered' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiBearerAuth()
  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async findAll(){
      return await this.OrderService.findAll()
  }

  @ApiOkResponse({ type: OrderEntity })
  @ApiNotFoundResponse({ description: 'User is not found || Product is not found  || Basket is clear' })
  @ApiUnauthorizedResponse({ description: 'User is not registered' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateOrderDto){
      return await this.OrderService.create(dto)
  }

  @ApiFoundResponse({ type: OrderEntity })
  @ApiNotFoundResponse({ description: 'Order is not found' })
  @ApiUnauthorizedResponse({ description: 'User is not registered' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiBearerAuth()
  @UseGuards(RoleGuard)
  @Get('byCode/:orderNumber')
  async findByCode(@Param('orderNumber') orderNumber: string){
      return await this.OrderService.findByCode(orderNumber)
  }

  @ApiOkResponse({ type: OrderEntity })
  @ApiNotFoundResponse({ description: 'Order is clear' })
  @ApiUnauthorizedResponse({ description: 'User is not registered' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('byUser/:id')
  async findById(@Param('id') id: number){
      return await this.OrderService.findByUser(id)
  }

  @ApiOkResponse({ type: OrderEntity })
  @ApiNotFoundResponse({ description: 'Oder is not found' })
  @Put()
  async update(@Body() dto: UpdateOrderDto){
    return await this.OrderService.update(dto)
  }
}
