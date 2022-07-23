import { Module } from '@nestjs/common';
import { AuthModule } from './features/auth/auth.module';
import { PostModule } from './features/post/post.module';
import { PostCategoryModule } from './features/post-category/post-category.module';
const Modules = [AuthModule];

@Module({
  imports: [...Modules, AuthModule, PostModule, PostCategoryModule],
})
export class AppModule {
  constructor() {}
}
