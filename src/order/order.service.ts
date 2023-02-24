import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { OrderEntity } from './entity/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private OrderRepo: Repository<OrderEntity>,
    private CartService: CartService,
    private UserService: UserService,
    private ProductService: ProductService
  ) {}

  async findAll(){
      return await this.OrderRepo.find()
  }

  async create(dto: CreateOrderDto){
      const user = await this.UserService.findById(dto.user_id)
      const randomstring = require("randomstring");
      dto.orderNumber = await randomstring.generate({
          length: 9,
          capitalization: 'lowercase'
      })

      const products = await this.CartService.findByUser(dto.user_id)
      
      dto.user = user
      dto.products = products
      delete dto.user_id
      
      const order = await this.OrderRepo.save(dto)
      const stats = await this.ProductService.updateStatistic(products)
      stats.user_id = user.id
      await this.UserService.updateStats(stats)
      await this.CartService.clearUserBasket(user.id)
      return order
  }

  async findByCode(orderNumber: string){
    const order = await this.OrderRepo.findOne({
      where: {
        orderNumber: orderNumber
      },
      relations: {
        user: true,
        products: true
      }
    })

    if(!order){
      throw new NotFoundException('Oder is not found')
    }

    return order
  }

  async findByUser(id: number){
    const order = await this.OrderRepo.find({
      where: {
        user: { id: id }
      },
      relations: {
        user: true,
        products: true
      }
    })

    if(!order.length){
      throw new NotFoundException('Order is clear')
    }

    return order
  }

  async findOne(id: number){
    const order = await this.OrderRepo.findOne({
      where: {
        id: id
      }
    })

    if(!order){
      throw new NotFoundException('Order is not found')
    }

    return order
  }

  async update(dto: UpdateOrderDto){
    const order = await this.findByCode(dto.code)

    Object.assign(order, dto)
    return await this.OrderRepo.save(order)
  }
}
