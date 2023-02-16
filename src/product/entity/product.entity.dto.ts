import { CartEntity } from 'src/cart/entity/cart.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCategory, ProductCollection, ProductColor } from '../enum';
import { IProduct } from '../interface/product-interface.dto';

@Entity()
export class ProductEntity implements IProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  discount: number;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  code: string;

  @Column()
  size: string;

  @Column('text', { array: true })
  image: string[];

  @Column()
  rating: number;

  @Column({ type: 'enum', enum: ProductColor, array: true })
  color: ProductColor[];

  @Column({ type: 'enum', enum: ProductCollection })
  collection: ProductCollection;

  @Column({ type: 'enum', enum: ProductCategory })
  category: ProductCategory;

}
