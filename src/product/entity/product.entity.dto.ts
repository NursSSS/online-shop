import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ProductCategory, ProductCollection, ProductColor } from "../enum";
import { IProduct } from "../interface/product-interface.dto";

@Entity()
export class ProductEntity implements IProduct {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number

    @Column()
    discount: number

    @Column()
    description: string
    
    @Column()
    quantity: number
    
    @Column()
    code: string
    
    @Column()
    size: string

    @Column()
    image: string

    @Column({ default: 0 })
    rating_sum: number

    @Column({ default: 0 })
    rating_count: number

    @Column({ type: 'enum', enum: ProductColor, array: true })
    color: ProductColor[]

    @Column({ type: 'enum', enum: ProductCollection })
    collection: ProductCollection

    @Column({ type: 'enum', enum: ProductCategory })
    category: ProductCategory
}