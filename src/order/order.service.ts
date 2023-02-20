import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto';
import { OrderEntity } from './entity/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private OrderRepo: Repository<OrderEntity>,
    private CartService: CartService,
    private UserService: UserService,
  ) {}

  // async findAll(){
  //     return await this.OrderRepo.find()
  // }

  // async create(dto: CreateOrderDto){
  //     const user = await this.UserService.findById(dto.user_id)
  //     dto.phoneNumber = user.phoneNumber
  //     dto.user_name = user.lastName + ' ' + user.firstName
  //     const randomstring = require("randomstring");
  //     dto.orderNumber = await randomstring.generate({
  //         length: 9,
  //         capitalization: 'lowercase'
  //     })

  //     dto.products = await this.CartService.findByUser(dto.user_id)

  //     return await this.OrderRepo.save(dto)
  // }
}
