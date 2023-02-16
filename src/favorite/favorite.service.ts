import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FavoriteEntity } from './entity/favorite.entity';

@Injectable()
export class FavoriteService {
    constructor(
        @InjectRepository(FavoriteEntity)
        private FavoriteRepo: Repository<FavoriteEntity>,
        private UserService: UserService,
        private ProductService: ProductService
    ){}

    async findAll(){
        return await this.FavoriteRepo.find()
    }

    async create(dto: CreateFavoriteDto){
        const user = await this.UserService.findById(dto.user_id)
        const product = await this.ProductService.findById(dto.product_id)

        if(!product){
            throw new NotFoundException('User is not found')
        }

        dto.created_date = new Date()
        dto.end_date = new Date(dto.created_date)
        dto.end_date.setDate(dto.created_date.getDate() + 3)
        console.log(dto)

        return await this.FavoriteRepo.save(dto)
    }

    async findByUser(id: number){
        const user = await this.UserService.findById(id)
        const favorites = await this.FavoriteRepo.findBy({ user_id: id })
        const today = new Date()

        favorites.filter(i => i.end_date < today)

        return await this.ProductService.findFavorites(favorites)
    }

    async delete(dto: CreateFavoriteDto){
        const favorite = await this.FavoriteRepo.findOne({
            where: {
                user_id: dto.user_id,
                product_id: dto.product_id
            }
        })

        if(!favorite){
            throw new NotFoundException('Favorite is not found')
        }

        await this.FavoriteRepo.delete(favorite)
        return { message: 'Favorite successfully deleted' }
    }
}
