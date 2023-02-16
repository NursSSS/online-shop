import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DB_CONFIG } from './utils/db_config';
import { UserModule } from './user/user.module';
import { NewsModule } from './news/news.module';
import { ProductModule } from './product/product.module';
import { RatingModule } from './rating/rating.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [TypeOrmModule.forRoot(DB_CONFIG), AuthModule, UserModule, NewsModule, ProductModule, RatingModule, FavoriteModule]
})
export class AppModule {}
