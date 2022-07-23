import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class post {
  @PrimaryGeneratedColumn()
  p_id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: 1 })
  category: number;

  @Column()
  owner: number;
}
