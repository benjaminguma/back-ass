import {
  BadGatewayException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common';

import { category } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor() {}

  @Get()
  async getAllCategories() {
    return 'get all categories';
  }

  @Post()
  async createCategory(@Body('title') title: string) {
    return 'create a category';
  }

  @Put()
  async updateCat(@Body() data: category) {
    return 'update a category';
  }
  @Delete()
  async deleteCategory(@Body('id') id: number) {
    return 'deletes a category';
  }
}
