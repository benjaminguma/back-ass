import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PostCategory } from './models/postCategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostCategory])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
