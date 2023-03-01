import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { LessThan, Repository } from 'typeorm';
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

    async findOne(user_id: number, product_id: number){
        const favorite = await this.FavoriteRepo.findOne({
            where: {
                user: { id: user_id }, 
                product: { id: product_id }
            }
        })
        console.log(favorite)

        return favorite
    }

    async create(dto: CreateFavoriteDto){
        const user = await this.UserService.findById(dto.user_id)
        const product = await this.ProductService.findById(dto.product_id)

        if(!product){
            throw new NotFoundException('Product is not found')
        }

        const favorite = await this.findOne(dto.user_id, dto.product_id)

        if(favorite){
            throw new BadRequestException('Product already in favorite')
        }

        dto.created_date = new Date()
        dto.end_date = new Date(dto.created_date)
        dto.end_date.setDate(dto.created_date.getDate() + 3)

        dto.user = user
        dto.product = product

        await this.FavoriteRepo.save(dto)
        return { message: 'Favorite successfully added' }
    }

    async findByUser(user_id: number){
        const user = await this.UserService.findById(user_id)
        const favorites = await this.FavoriteRepo.find({
            where: {
              user: { id: user_id }
            },
            relations: {
              product: true
            }
        })

        const today = new Date()
        favorites.filter(i => i.end_date < today)
        const del = await this.clearOldFavorites(user.id)
        if (!favorites.length) {
            throw  new NotFoundException('Favorites is clear')
        }
        
        return await this.ProductService.findProducts(favorites)
    }

    async delete(dto: CreateFavoriteDto){
        const favorite = await this.findOne(dto.user_id, dto.product_id)

        if(!favorite){
            throw new NotFoundException('Favorite is not found')
        }

        await this.FavoriteRepo.delete(favorite.id)
        return { message: 'Favorite successfully deleted' }
    }

    async clearOldFavorites(id: number){
        const favorites = await this.FavoriteRepo.findBy({
            user: {id: id},
            end_date: LessThan(new Date())
        })

        return await this.FavoriteRepo.remove(favorites)
    }
}
