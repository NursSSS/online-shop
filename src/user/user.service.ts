import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UpdateUserStatsDto } from './dto/update-user-stats.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.userRepo.find();
  }

  async findByNumber(phoneNumber: string) {
    const user = await this.userRepo.findOne({
      where: {
          phoneNumber
      }
    });

    return user;
  }

  async create(dto: CreateUserDto) {
    return await this.userRepo.save(dto);
  }

  async findById(id: number) {
    const user = await this.userRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    return user;
  }

  async update(dto: UpdateUserDto) {
    const user = await this.findById(dto.id);

    Object.assign(user, dto);
    return await this.userRepo.save(user);
  }

  async updateStats(dto: UpdateUserStatsDto){
    const user = await this.findById(dto.user_id);

    user.revenue += dto.revenue
    user.shopped += dto.shopped
    return await this.userRepo.save(user)
  }
}
