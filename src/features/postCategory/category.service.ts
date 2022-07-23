import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { postCategory } from './interfaces';
import { PostCategory } from './models/postCategory.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(PostCategory)
    private readonly CategoryManager: Repository<PostCategory>,
  ) {}
  async createCategory(title: string): Promise<PostCategory> {
    const newCategory = this.CategoryManager.create({ title });
    return await this.CategoryManager.save(newCategory);
  }

  async updateCategory(data: postCategory): Promise<boolean> | never {
    const exists = await this.CategoryManager.findOne({
      where: { c_id: data.c_id },
    });

    if (!exists?.c_id) throw new Error('category does not exist');
    const res = await this.CategoryManager.update(
      { c_id: exists.c_id },
      { title: data.title },
    );
    return !!res.affected;
  }

  async deleteCategory(id: number): Promise<boolean> {
    const res = await this.CategoryManager.delete({ c_id: id });
    return !!res.affected;
  }

  async getAllCategories(): Promise<PostCategory[]> {
    return await this.CategoryManager.find();
  }
}
