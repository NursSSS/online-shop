import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { RatingEntity } from './entity/rating.entity';

@Injectable()
export class RatingService {
    constructor(
        @InjectRepository(RatingEntity)
        private RatingRepo: Repository<RatingEntity>,
        private UserService: UserService,
        private ProductService: ProductService
    ){}


    async findAll(){
        return await this.RatingRepo.find()
    }

    async findProductsById(id: number){
        const rating = await this.RatingRepo.findBy({product_id: id})

        if(!rating){
            throw new NotFoundException('Not found')
        }

        return rating
    }

    async create(dto: CreateRatingDto){
        const user = await this.UserService.findById(dto.user_id)
        const product = await this.ProductService.findById(dto.product_id)
        
        if(!product){
            throw new NotFoundException('Product is not found')
        }

        if(![1,2,3,4,5].includes(dto.rating)){
            throw new BadRequestException('Rating must less than 5 and more than 1')
        }

        const products = await this.findProductsById(dto.product_id)


        let rating = products.reduce((acc, curr) => acc + curr.rating, 0)

        rating /=  products.length

        rating = Math.floor(rating)

        product.rating = rating
        return await this.ProductService.update(product)
    }

    async userRatings(id: number){
        const user = await this.UserService.findById(id)

        return await this.RatingRepo.findBy({ user_id: id })
    }
}
