import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { post } from './models/single-post.entity';
import { singlePost } from './post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(post) private readonly postMg: Repository<post>,
  ) {}
  async createPost(data: singlePost) {
    const newPost = this.postMg.create({ ...data });
    return await this.postMg.save(newPost);
  }

  async deletePost(id: number) {
    const res = await this.postMg.delete({ p_id: id });
    return !!res.affected;
  }

  async updatePost({ p_id, ...rest }: singlePost) {
    const exists = await this.postMg.findOne({ where: { p_id } });
    if (!exists?.p_id) throw new Error('post does not exist');
    const res = await this.postMg.update({ p_id: p_id }, { ...rest });
    return !!res.affected;
  }

  async getPost(id: number) {
    const res = await this.postMg.findOne({ where: { p_id: id } });
    return res;
  }

  async getUserPosts(u_id: number): Promise<post[]> {
    const userPosts = await this.postMg.find({ where: { owner: u_id } });
    return userPosts;
  }
}
