import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProductEntity } from './entity/product.entity.dto';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), AuthModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
