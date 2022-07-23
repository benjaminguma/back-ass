import { Module } from '@nestjs/common';
import AuthModule from './features/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './features/Post/post.module';
import { CategoryModule } from './features/postCategory/category.module';
import { user } from './features/auth/model/users.entity';
import { PostCategory } from './features/postCategory/models/postCategory.entity';

const Modules = [AuthModule, PostModule, CategoryModule];

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [PostCategory],
      synchronize: true,
      retryAttempts: 1,
    }),
    ...Modules,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
