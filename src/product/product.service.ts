import { Injectable, NotFoundException, UploadedFile } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ProductEntity } from './entity/product.entity.dto';
import { ProductCategory, ProductCollection } from './enum';
let EasyYandexS3 = require('easy-yandex-s3').default;

const s3API = new EasyYandexS3({
    auth: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
    Bucket: process.env.BUCKET_NAME,
})



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

    // async create(dto: CreateProductDto, file: Express.Multer.File){
    async create(dto: CreateProductDto){
        const product = await this.findByCode(dto.code)

        
        if(product){
            throw new BadRequestException('Product with this atricul already exist')
        }
        
        // let upload = await s3API.Upload({ buffer: file.buffer, name: file.originalname } , '/missdress')
        
        // dto.image = `http://yandex-s3/missdress/${file.originalname}`
        dto.image = `http://yandex-s3/missdress/asd`


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
        const product = await this.findById(dto.id)

        if(!product){
            throw new NotFoundException('Product is not found')
        }

        const code = await this.findByCode(dto.code)
        if(code){
            throw new BadRequestException('Product with this atricul already exist')
        }

        Object.assign(product, dto)
        return await this.ProductRepo.save(dto)
    }

    async delete(id: number){
        const product = await this.findById(id)

        if(!product){
            throw new NotFoundException('Product is not found')
        }

        await this.ProductRepo.delete(id)
        return { code: 200, message: 'User successfully deleted'}
    }

    // async rating(dto: UpdateRatingDto){
    //     const product = await this.findById(dto.product_id)

    //     if(!product){
    //         throw new NotFoundException('Product is not found')
    //     }

    //     product.rating_sum += dto.rating
    //     product.rating_count++

    //     return await this.ProductRepo.save(product)
    // }
}
