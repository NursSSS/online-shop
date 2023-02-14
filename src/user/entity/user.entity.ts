import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../enum/role.enum";
import { IUser } from "../interface/user.interface";

@Entity()
export class UserEntity implements IUser{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({type: 'text'})
    phoneNumber: string

    @Column()
    code: number

    // @Column({ type: 'enum')
    // role: UserRole
}