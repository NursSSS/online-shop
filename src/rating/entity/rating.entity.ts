import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IRating } from "../interface/rating.interface";

@Entity()
export class RatingEntity implements IRating {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @Column()
    product_id: number

    @Column()
    rating: number
}