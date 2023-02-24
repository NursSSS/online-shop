import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiFoundResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guard/role-guard';
import { Roles } from 'src/user/enum/role-decorator';
import { UserRole } from 'src/user/enum/role.enum';
import { CreateOrderDto } from './dto';
import { OrderEntity } from './entity/order.entity';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private OrderService: OrderService) {}

  @ApiOkResponse({ type: OrderEntity })
  @ApiUnauthorizedResponse({ description: 'User is not registered' })
  @ApiForbiddenResponse({ description: 'Access denied' })
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
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateOrderDto){
      return await this.OrderService.create(dto)
  }

  @ApiFoundResponse({ type: OrderEntity })
  @ApiNotFoundResponse({ description: 'Order is not found' })
  @ApiUnauthorizedResponse({ description: 'User is not registered' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @UseGuards(RoleGuard)
  @Get('byCode/:orderNumber')
  async findByCode(@Param('orderNumber') orderNumber: string){
      return await this.OrderService.findByCode(orderNumber)
  }

  @ApiOkResponse({ type: OrderEntity })
  @ApiNotFoundResponse({ description: 'Order is clear' })
  @ApiUnauthorizedResponse({ description: 'User is not registered' })
  @UseGuards(JwtAuthGuard)
  @Get('byUser/:id')
  async findById(@Param('id') id: number){
      return await this.OrderService.findByUser(id)
  }
}
