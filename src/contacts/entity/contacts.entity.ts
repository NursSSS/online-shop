import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IContacts } from "../interface/contacts.interface";

@Entity()
export class ContactsEnity implements IContacts {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column()
    social: string

    @ApiProperty()
    @Column()
    source: string
}