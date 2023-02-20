import { forwardRef, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RoleGuard } from 'src/auth/guard/role-guard';
import { ProductModule } from 'src/product/product.module';
import { NewsEntity } from './entity/news.entity';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity]), ProductModule, AuthModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
