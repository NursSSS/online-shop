import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateCartDto, DeleteCartDto, UpdateCartDto } from './dto';
import { CartEntity } from './entity/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private CartRepo: Repository<CartEntity>,
    private ProductService: ProductService,
    private UserService: UserService,
  ) {}

  async findAll() {
    return await this.CartRepo.find();
  }

  async findOne(user_id: number, product_id: number) {
    const basket = await this.CartRepo.findOne({
      where: {
        user: { id: user_id }, 
        product: { id: product_id }
      }
    })

    return basket;
  }

  async create(dto: CreateCartDto) {
    const user = await this.UserService.findById(dto.user_id);
    const product = await this.ProductService.findById(dto.product_id);
    if (!product) {
      throw new NotFoundException('Product is not found');
    }

    const basket = await this.findOne(dto.user_id, dto.product_id);
    if (basket) {
      throw new BadRequestException('Product already in basket');
    }

    dto.user = user
    dto.product = product
    delete dto.product_id
    delete dto.user_id

    await this.CartRepo.save(dto);

    return { message: 'Product successfully added to basket' };
  }

  async findByUser(id: number) {
    const user = await this.UserService.findById(id);
    const basket = await this.CartRepo.find({
      where: {
        user: { id: id }
      },
      relations: {
        product: true
      }
    });

    if (!basket.length) {
      throw new NotFoundException('Basket is clear')
    }

    const products = await this.ProductService.findProducts(basket)
    products.map((el) => {
      let product = basket.find((i) => i.product.id === el.id);
      el.color = product.color;
      el.quantityOfProduct = product.quantity;
    });

    return products;
  }

  async update(dto: UpdateCartDto){
    const basket = await this.findOne(dto.user_id, dto.product_id)

    if(!basket){
      throw new NotFoundException('Product in basket is not found')
    }

    Object.assign(basket, dto)
    
    await this.CartRepo.save(basket)
    return { message: 'Product successfully updated' }
  }

  async delete(dto: DeleteCartDto) {
    const product = await this.findOne(dto.user_id, dto.product_id);

    if (!product) {
      throw new NotFoundException('Product in basket is not found');
    }

    await this.CartRepo.remove(product);
    return { code: 200, message: 'Product successfully deleted' };
  }

  async clearUserBasket(id: number){
    const basket = await this.CartRepo.find({
      where: {
        user: { id: id }
      },
      relations: {
        product: true
      }
    });
    const arr = []

    for(let i = 0; i < basket.length; i++){
      arr.push(basket[i].id)
    }

    await this.CartRepo.delete(arr)
    return { message: 'Product successfully deleted from basket' }
  }
}
