import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IFavorite } from "../interface/favorite.interface";

@Entity('favorite')
export class FavoriteEntity implements IFavorite{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @Column()
    product_id: number

    @Column({ type: 'date'})
    created_date: Date

    @Column({ type: 'date'})
    end_date: Date
}