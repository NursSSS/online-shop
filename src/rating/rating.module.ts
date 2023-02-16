import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { RatingEntity } from './entity/rating.entity';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';

@Module({
  imports: [TypeOrmModule.forFeature([RatingEntity]), UserModule, ProductModule],
  controllers: [RatingController],
  providers: [RatingService],
  exports: [RatingService]
})
export class RatingModule {}
