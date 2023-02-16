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

        if(![1,2,3,4,5].includes(dto.rating)){
            throw new BadRequestException('Rating must less than 5 and more than 1')
        }

        const products = await this.findProductsById(dto.product_id)
        const rate = await this.RatingRepo.findOne({
            where: {
                user_id: dto.user_id,
                product_id: dto.product_id
            }
        })

        if(rate){
            throw new BadRequestException('User already gave vote')
        }

        let count = products.length + 1

        let rating = products.reduce((acc, curr) => acc + curr.rating, 0)
        rating += dto.rating
        rating = rating / count

        rating = Math.floor(rating)

        const product = this.ProductService.updateRating(dto.product_id, rating)
        await this.RatingRepo.save(dto)
        return product
    }
}
