import { ProductEntity } from "src/product/entity/product.entity.dto";
import { UserEntity } from "src/user/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IFavorite } from "../interface/favorite.interface";

@Entity('favorite')
export class FavoriteEntity implements IFavorite{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => UserEntity, (user) => user.favorite, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: UserEntity

    @ManyToOne(() => ProductEntity, (product) => product.favorite, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
    product: ProductEntity

    @Column({ type: 'date'})
    created_date: Date

    @Column({ type: 'date'})
    end_date: Date
}