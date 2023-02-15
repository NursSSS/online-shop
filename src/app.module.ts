import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DB_CONFIG } from './utils/db_config';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [TypeOrmModule.forRoot(DB_CONFIG), AuthModule, UserModule, ProductModule]
})
export class AppModule {}
