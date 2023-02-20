import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { DeleteCartDto } from './dto/delete-cart.dto';
import { CartEntity } from './entity/cart.entity';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(CartEntity)
        private CartRepo: Repository<CartEntity>,
        private ProductService: ProductService,
        private UserService: UserService
    ){}

    async findAll(){
        return await this.CartRepo.find()
    }

    async findOne(user_id: number, product_id: number){
        const basket = await this.CartRepo.findOne({
            where: {
                user_id: user_id,
                product_id: product_id
            }
        })

        return basket
    }

    async create(dto: CreateCartDto){
        const user = await this.UserService.findById(dto.user_id)
        const product = await this.ProductService.findById(dto.product_id)

        if(!product){
            throw new NotFoundException('Product is not found')
        }

        const basket = await this.findOne(dto.user_id, dto.product_id)
        if(basket){
            throw new BadRequestException('Product already in basket')
        }
        dto.user_id = user

        const test = await this.CartRepo.save(dto)
        console.log(test)
        return { message: 'Product successfully added to basket' }
    }

    async findByUser(id: number){
        const user = await this.UserService.findById(id)

        const basket = await this.CartRepo.findBy({ user_id: id })

        if(!basket){
            return { message: 'Basket is clear' }
        }

        const products: any = await this.ProductService.findProducts(basket)
        products.map((el) => {
            let product = basket.find(i => i.product_id === el.id)
            el.color = product.color
            el.quantityOfProduct = product.quantity
        })
        return products
    }

    async update(dto: CreateCartDto){
        const basket = await this.findOne(dto.user_num, dto.product_id)

        if(!basket){
            throw new NotFoundException('Product in basket is not found')
        }

        Object.assign(basket, dto)
        await this.CartRepo.save(basket)
        return { message: `Quantity of product: ${basket.quantity}` }
    }

    async delete(dto: DeleteCartDto){
        const product = await this.findOne(dto.user_id, dto.product_id)

        if(!product){
            throw new NotFoundException('Product in basket is not found')
        }

        await this.CartRepo.delete(product.id)
        return { code: 200, message: 'Product successfully deleted'}
    }
}
