import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('news')
export class NewsEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'text' })
  title: string;

  @ApiProperty()
  @Column({ type: 'text' })
  description: string;

  @ApiProperty()
  @Column('text', { array: true })
  image: string[];

  @ApiProperty()
  @CreateDateColumn()
  create_date: Date;
}
