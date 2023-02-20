import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RoleGuard } from 'src/auth/guard/role-guard';
import { NewsEntity } from './entity/news.entity';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity]), AuthModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
