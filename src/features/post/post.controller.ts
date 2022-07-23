import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { PostService } from './post.service';
import { singlePost } from './post.dto';
import { AuthGuard } from '@nestjs/passport';
import { user } from '../auth/model/users.entity';

const base = 'post';

interface userInReq extends Request {
  user;
}

@Controller()
@UseGuards(AuthGuard('jwt'))
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post(`${base}`)
  async createPost(@Body() newPostData, @Req() req: userInReq) {
    try {
      const userData = req.user as user;

      const result = await this.postService.createPost({
        ...newPostData,
        category: 1,
        owner: userData.u_id,
      });
      return result;
    } catch (error) {
      return new InternalServerErrorException({
        message: 'internal server error',
        success: false,
      });
    }
  }

  @Delete(base)
  async deletePost(@Body('id') id) {
    try {
      const result = await this.postService.deletePost(Number(id));

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return new BadRequestException({
        message: 'an error occured while deleting post please try again',
        success: false,
      });
    }
  }

  @Put(base)
  async updatePost(@Body() newData: singlePost) {
    try {
      await this.postService.updatePost(newData);
      return {
        message: 'post successfully updated',
        success: true,
      };
    } catch (error) {
      throw new NotFoundException({
        message: error.message,
        success: false,
      });
    }
  }

  @Get(`user/${base}`)
  async getUserPosts(@Req() req: userInReq) {
    try {
      const user = req.user as user;
      const posts = this.postService.getUserPosts(user.u_id);
      return posts;
    } catch (error) {
      return new NotFoundException({
        message: 'oopsie! no posts for this user',
        success: false,
      });
    }
  }

  @Get(`${base}/:postId`)
  async getPost(@Param('postId') id: number, @Req() req: userInReq) {
    return await this.postService.getPost(id);
  }
}
