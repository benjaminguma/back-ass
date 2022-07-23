import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostCategory {
  @PrimaryGeneratedColumn()
  c_id: number;

  @Column()
  title: string;
}
