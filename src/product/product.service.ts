import { Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { S3_CONFIG } from 'src/utils/es3.config';
import { In, Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ProductEntity } from './entity/product.entity.dto';
import { ProductCategory, ProductCollection } from './enum';
let EasyYandexS3 = require('easy-yandex-s3').default;
const s3 = new EasyYandexS3(S3_CONFIG)

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private ProductRepo: Repository<ProductEntity>
    ){}

    async findAll(){
        return await this.ProductRepo.find()
    }

    async findById(id: number){
        const product = await this.ProductRepo.findOne({
            where: {
                id: id
            }
        })
    
        return product
    }

    async findByCode(code: string){
        const product = await this.ProductRepo.findOne({
            where: {
                code: code
            }
        })

        return product
    }

    async create(dto: CreateProductDto){
        const product = await this.findByCode(dto.code)

        if(product){
            throw new BadRequestException('Product with this atricul already exist')
        }

        return await this.ProductRepo.save(dto)
    }

    async byCollection(collection: string){
        const products = await this.ProductRepo.findBy({ collection: ProductCollection[collection] })

        return products
    }

    async byCategory(category: string){
        const products = await this.ProductRepo.findBy({ category: ProductCategory[category]})

        return products
    }

    async update(dto: UpdateProductDto){
        if(dto.hasOwnProperty('code')){
            const code = await this.findByCode(dto.code)
            if(code){
                throw new BadRequestException('Product with this atricul already exist')
            }
        }

        const product = await this.findById(dto.id)

        if(!product){
            throw new NotFoundException('Product is not found')
        }

        Object.assign(product, dto)
        return await this.ProductRepo.save(product)
    }

    async updateImages(id: number, files: Array<Express.Multer.File>){
        const product = await this.findById(id)
        const arr = []
        const arrLink = []

        for(let i = 0; i < files.length; i++){
            arr.push({
                buffer: files[i].buffer
            })
        }

        const upload = await s3.Upload(arr , '/missdress')

        for(let i = 0; i < upload.length; i++){
            arrLink.push(upload[i].Location)
        }

        product.image = arrLink

        await this.ProductRepo.save(product)
        return product
    }

    async delete(id: number){
        const product = await this.findById(id)

        if(!product){
            throw new NotFoundException('Product is not found')
        }

        await this.ProductRepo.delete(id)
        return { code: 200, message: 'User successfully deleted'}
    }

    async updateRating(id: number, rating: number){
        const product = await this.findById(id)

        if(!product){
            throw new NotFoundException('Product is not found')
        }
        
        product.rating = rating

        await this.ProductRepo.save(product)
        return product
    }

    async findProducts(products){
        const arr = []

        for(let i = 0; i < products.length; i++){
            arr.push(products[i].product.id)
        }

        const product = await this.ProductRepo.findBy({
            id: In(arr)
        })
        return product
    }

    async updateStatistic(products: ProductEntity[]){
        const stats = {
            user_id: 0,
            revenue: 0,
            shopped: 0
        }

        for(let i = 0; i < products.length; i++){
            const product = await this.findById(products[i].id)
            const revenue = product.discount * products[i].quantityOfProduct
            const quantity = products[i].quantityOfProduct
            
            product.sales += quantity
            product.revenue += revenue
            
            stats.revenue += revenue
            stats.shopped += quantity
            
            await this.ProductRepo.save(product)
        }

        return stats
    }
}
