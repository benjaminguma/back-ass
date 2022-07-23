import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { baseServerError } from 'src/utils/baseError';
import { CategoryService } from './category.service';
import { category } from './dto/category.dto';
import { postCategory } from './interfaces';

@Controller('category')
@UseGuards(AuthGuard('jwt'))
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories() {
    try {
      const categories = await this.categoryService.getAllCategories();
      return categories;
    } catch (error) {
      return baseServerError('an error while fetching categories');
    }
  }

  @Post()
  async createCategory(@Body('title') title: string) {
    try {
      return this.categoryService.createCategory(title);
    } catch (error) {
      return baseServerError('an error occured while creating category');
    }
  }

  @Put()
  async updateCat(@Body() data: category) {
    try {
      const updateData = data as postCategory;
      await this.categoryService.updateCategory(updateData);

      return {
        message: 'category successfully updated',
        success: true,
      };
    } catch (error) {
      return baseServerError();
    }
  }
  @Delete()
  async deleteCategory(@Body('id') id: number) {
    id = Number(id);

    try {
      const affected = await this.categoryService.deleteCategory(id);
      if (!affected)
        return new BadGatewayException({
          message: 'incomplete data to delete',
          success: false,
        });
      return {
        message: 'category successfully deleted',
        success: true,
      };
    } catch (error) {
      return baseServerError();
    }
  }
}
